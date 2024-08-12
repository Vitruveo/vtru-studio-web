import { fetchEventSource } from '@microsoft/fetch-event-source';
import { AxiosError, AxiosResponse } from 'axios';
import {
    assetStorage,
    updateAssetStep,
    getAsset,
    sendRequestUpload,
    requestDeleteFiles,
    signingMediaC2PA,
    validationConsign,
    consign,
    eventsByTransaction,
    requestConsign,
    deleteRequestConsign,
    getAssetById,
    createNewAsset,
    deleteAsset,
    getRequestConsignComments,
} from './requests';
import {
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStatus,
    AssetStorageReq,
    ConsignArtworkSteps,
    CreateContractApiRes,
    CreateContractByAssetIdReq,
    HistoryItems,
    RequestDeleteFilesReq,
    SigningMediaC2PAReq,
    UploadIPFSByAssetIdApiRes,
    UploadIPFSByAssetIdReq,
} from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { FormatMediaSave, FormatsMedia } from '@/app/home/consignArtwork/assetMedia/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { TermsOfUseFormValues } from '@/app/home/consignArtwork/termsOfUse/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';
import { FormatsAuxiliayMedia } from '@/app/home/consignArtwork/auxiliaryMedia/types';

import { BASE_URL_API } from '@/constants/api';
import { userActionsCreators } from '../user/slice';
import { checkStepProgress, maxPrice, minPrice } from '@/app/home/consignArtwork/licenses/nft';

export function requestDeleteURLThunk(payload: RequestDeleteFilesReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await requestDeleteFiles(payload);
        return response;
    };
}

export function assetStorageThunk(payload: Omit<AssetStorageReq, 'dispatch'>): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
            transactionId: payload.transactionId,
            dispatch,
        });
        return response;
    };
}

export function createNewAssetThunk(cloneId?: string): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const response = await createNewAsset(cloneId);

        dispatch(userActionsCreators.setSelectedAsset(response.data?.insertedId || ''));
    };
}

export function deleteAssetThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        await deleteAsset(id);
        dispatch(userActionsCreators.removeAsset(id));
    };
}

export function getAssetThunk(id: string): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        try {
            dispatch(assetActionsCreators.resetAsset());
            const response = await getAssetById(id);

            if (response.data) {
                if (response.data.consignArtwork) {
                    dispatch(assetActionsCreators.change({ consignArtwork: response.data.consignArtwork }));
                    dispatch(consignArtworkActionsCreators.changeConsignArtwork(response.data.consignArtwork));
                    dispatch(
                        consignArtworkActionsCreators.changePreviewAndConsign({
                            artworkListing: { checked: true },
                        })
                    );
                } else {
                    dispatch(
                        consignArtworkActionsCreators.changePreviewAndConsign({
                            artworkListing: { checked: false },
                        })
                    );
                }

                if (response.data.assetMetadata && Object.values(response.data.assetMetadata)?.length) {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'assetMetadata',
                            status: response.data.assetMetadata.isCompleted ? 'completed' : 'inProgress',
                        })
                    );
                }

                if (response.data.licenses) {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'licenses',
                            status: checkStepProgress({ values: response.data.licenses }),
                        })
                    );
                }

                if (response.data.contractExplorer) {
                    dispatch(assetActionsCreators.changeContractExplorer(response.data.contractExplorer));
                }

                if (response.data.ipfs) {
                    dispatch(assetActionsCreators.change({ ipfs: response.data.ipfs }));
                }

                if (response.data.c2pa) {
                    dispatch(assetActionsCreators.change({ c2pa: response.data.c2pa }));
                }

                if (response.data.terms) {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'termsOfUse',
                            status:
                                response.data.terms.contract &&
                                response.data.terms.isOriginal &&
                                response.data.terms.generatedArtworkAI &&
                                response.data.terms.notMintedOtherBlockchain
                                    ? 'completed'
                                    : response.data.terms.contract ||
                                        response.data.terms.isOriginal ||
                                        response.data.terms.generatedArtworkAI ||
                                        response.data.terms.notMintedOtherBlockchain
                                      ? 'inProgress'
                                      : 'notStarted',
                        })
                    );
                }

                dispatch(
                    assetActionsCreators.change({
                        _id: response.data._id,
                        status: response.data?.status,
                    })
                );

                if (response.data.assetMetadata) {
                    dispatch(
                        assetActionsCreators.change({
                            assetMetadata: response.data.assetMetadata,
                        })
                    );
                }

                if (response.data.licenses) {
                    dispatch(
                        assetActionsCreators.change({
                            licenses: response.data.licenses,
                        })
                    );
                }

                if (response.data.terms) {
                    dispatch(
                        assetActionsCreators.change({
                            terms: {
                                isOriginal: response.data.terms.isOriginal,
                                generatedArtworkAI: response.data.terms.generatedArtworkAI,
                                notMintedOtherBlockchain: response.data.terms.notMintedOtherBlockchain,
                                contract: response.data.terms.contract,
                            },
                        })
                    );
                }

                if (response.data.formats && Object.values(response.data.formats).find((v) => v !== null)) {
                    const formatAssetsFormats = Object.entries(
                        response.data.formats as unknown as FormatMediaSave
                    ).reduce((acc, [key, value]) => {
                        if (value === null) return acc;
                        return {
                            ...acc,
                            [key]: {
                                ...value,
                                name: value.name,
                                file: `${ASSET_STORAGE_URL}/${value.path}`,
                                customFile: undefined,
                                transactionId: undefined,
                            },
                        };
                    }, {} as FormatsMedia);

                    const status =
                        Object.entries(formatAssetsFormats).length < 4
                            ? 'inProgress'
                            : Object.entries(formatAssetsFormats)
                                    .filter(([key]) => key !== 'print')
                                    .every(([key, value]) => value.file)
                              ? 'completed'
                              : Object.values(formatAssetsFormats).some((format) => format.file) ||
                                  formatAssetsFormats.original.file
                                ? 'inProgress'
                                : 'notStarted';

                    dispatch(assetActionsCreators.changeFormats(formatAssetsFormats));
                    dispatch(consignArtworkActionsCreators.changeStatusStep({ stepId: 'assetMedia', status }));
                } else {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'assetMedia',
                            status: 'notStarted',
                        })
                    );
                    // clear assetMedia
                    dispatch(assetActionsCreators.changeFormats({}));
                }

                if (
                    Object.values(response.data.mediaAuxiliary.formats || {}).find((v) => v) ||
                    response.data.mediaAuxiliary?.description?.length
                ) {
                    const formatAssetsFormats = Object.entries(
                        response.data.mediaAuxiliary.formats as unknown as FormatMediaSave
                    ).reduce((acc, [key, value]) => {
                        if (value === null) return acc;
                        return {
                            ...acc,
                            [key]: {
                                ...value,
                                name: value.name,
                                file: `${ASSET_STORAGE_URL}/${value.path}`,
                                customFile: undefined,
                                transactionId: undefined,
                            },
                        };
                    }, {} as FormatsAuxiliayMedia);

                    dispatch(
                        assetActionsCreators.changeFormatsMediaAuxiliary({
                            description: response.data.mediaAuxiliary?.description,
                            formats: formatAssetsFormats,
                        })
                    );

                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'auxiliaryMedia',
                            status: 'completed',
                        })
                    );
                } else {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'auxiliaryMedia',
                            status: 'notStarted',
                        })
                    );
                }
            }

            return response;
        } catch (_) {
            // TODO: implement error handling.
        }
    };
}

export function auxiliaryMediaThunk(payload: {
    formats?: FormatMediaSave;
    description?: string;
    deleteFormats?: string[];
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatsState = getState().asset.mediaAuxiliary.formats;

        const formatsPersist = Object.entries(formatsState)
            .filter(([key, value]) => value.file)
            .filter(([key, value]) => !payload.deleteFormats?.includes(key))
            .reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: {
                        ...value,
                        path: (value.file as string)?.replace(new RegExp(`${ASSET_STORAGE_URL}/`, 'g'), ''),
                        name: value.name,
                    },
                };
            }, {});

        await updateAssetStep({
            id: getState().user.selectedAsset,
            mediaAuxiliary: {
                description: payload.description,
                formats: { ...formatsPersist, ...payload.formats },
            },
            stepName: 'auxiliaryMedia',
        });

        const formatAssetsFormats = Object.entries(payload.formats || {}).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: {
                    ...value,
                    file: `${ASSET_STORAGE_URL}/${value.path}`,
                    name: value.name,
                    customFile: undefined,
                    transactionId: undefined,
                },
            };
        }, {} as FormatsAuxiliayMedia);

        dispatch(
            assetActionsCreators.changeFormatsMediaAuxiliary({
                formats: formatAssetsFormats,
                description: payload.description,
            })
        );
        if (payload.deleteFormats?.length)
            dispatch(assetActionsCreators.removeFormatsMediaAuxiliary(payload.deleteFormats));
    };
}

export function assetMediaThunk(payload: {
    formats?: FormatMediaSave;
    deleteFormats?: string[];
    load?: boolean;
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatsState = getState().asset.formats;
        const assetMetadata = getState().asset.assetMetadata as SectionsFormData;

        if (payload.formats && payload.formats.original && assetMetadata) {
            const { width, height } = payload.formats.original;

            let orientation = 'square';

            if (width && height) {
                if (width > height) {
                    orientation = 'horizontal';
                } else if (width < height) {
                    orientation = 'vertical';
                }
            }

            dispatch(
                assetMetadataThunk({
                    ...assetMetadata,
                    context: {
                        ...assetMetadata?.context,
                        formData: {
                            ...assetMetadata?.context?.formData,
                            orientation,
                        },
                    },
                })
            );
        }

        const formatsPersist = Object.entries(formatsState)
            .filter(([key, value]) => value.file)
            .filter(([key, value]) => !payload.deleteFormats?.includes(key))
            .reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: {
                        ...value,
                        path: (value.file as string)?.replace(new RegExp(`${ASSET_STORAGE_URL}/`, 'g'), ''),
                        name: value.name,
                    },
                };
            }, {});

        await updateAssetStep({
            id: getState().user.selectedAsset,
            formats: { ...formatsPersist, ...payload.formats },
            stepName: 'assetUpload',
        });

        // Check if asset exists
        const hasAsset = getState().asset._id;
        if (!hasAsset) {
            const asset = await getAsset();
            if (asset.data?._id) {
                dispatch(assetActionsCreators.change({ _id: asset.data._id }));
            }
        }

        if (payload?.formats?.original) {
            // Extract colors from most recent uploaded asset
            dispatch(extractAssetColorsThunk({ id: getState().asset._id }));
        }

        const formatAssetsFormats = Object.entries(payload.formats || {}).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: {
                    ...value,
                    load: payload.load,
                    file: `${ASSET_STORAGE_URL}/${value.path}`,
                    customFile: undefined,
                    transactionId: undefined,
                },
            };
        }, {} as FormatsMedia);

        dispatch(assetActionsCreators.changeFormats(formatAssetsFormats));
        if (payload.deleteFormats?.length) dispatch(assetActionsCreators.removeFormats(payload.deleteFormats));
    };
}

export function assetMetadataThunk(
    payload: SectionsFormData & {
        isCompleted?: boolean;
        context: {
            formData: {
                orientation?: string;
            };
        };
    }
): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        await updateAssetStep({
            id: getState().user.selectedAsset,
            assetMetadata: {
                ...payload,
            },
            stepName: 'assetMetadata',
        });

        dispatch(
            assetActionsCreators.change({
                assetMetadata: {
                    ...payload,
                },
            })
        );
    };
}

// export function creatorMetadataThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
//     return async function (dispatch, getState) {};
// }

export function licenseThunk(payload: LicensesFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            ...payload,
            licenses: payload,
            stepName: 'license',
            id: getState().user.selectedAsset,
        });

        dispatch(
            assetActionsCreators.change({
                licenses: payload,
            })
        );
    };
}

export function contractThunk(payload: TermsOfUseFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            ...payload,
            stepName: 'contract',
            id: getState().user.selectedAsset,
        });

        dispatch(
            assetActionsCreators.change({
                terms: {
                    isOriginal: payload.isOriginal,
                    generatedArtworkAI: payload.generatedArtworkAI,
                    notMintedOtherBlockchain: payload.notMintedOtherBlockchain,
                    contract: payload.contract,
                },
            })
        );
    };
}

export function publishThunk(payload: { status: AssetStatus }): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            ...payload,
            stepName: 'publish',
            id: getState().user.selectedAsset,
        });

        dispatch(
            assetActionsCreators.change({
                status: payload.status,
            })
        );
    };
}

export function sendRequestUploadThunk(
    payload: AssetSendRequestUploadReq
): ReduxThunkAction<Promise<AssetSendRequestUploadApiRes>> {
    return async function (dispatch, getState) {
        const assetSelected = getState().user.selectedAsset;
        const response = await sendRequestUpload({
            id: assetSelected,
            mimetype: payload.mimetype,
            originalName: payload.originalName,
            transactionId: payload.transactionId,
            metadata: payload.metadata,
        });

        return response;
    };
}

export function signingMediaC2PAThunk(data: SigningMediaC2PAReq): ReduxThunkAction<Promise<AxiosResponse>> {
    return async function () {
        return signingMediaC2PA(data);
    };
}

export function uploadIPFSByAssetIdThunk(
    data: UploadIPFSByAssetIdReq
): ReduxThunkAction<Promise<UploadIPFSByAssetIdApiRes>> {
    return async function (dispatch, getState) {
        const state = getState();
        const token = state.user.token;

        const ctrl = new AbortController();

        const url = `${BASE_URL_API}/assets/ipfs/${data.id}`;
        const headers = {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${token}`,
        };

        return new Promise((resolve, reject) => {
            try {
                fetchEventSource(url, {
                    method: 'POST',
                    headers,
                    signal: ctrl.signal,
                    onmessage(message) {
                        if (message.event === 'ipfs_success') {
                            ctrl.abort();
                            resolve();
                        }

                        if (message.event === 'ipfs_error') {
                            ctrl.abort();
                            reject();
                        }
                    },
                }).catch(reject);
            } catch (error) {
                reject();
            }
        });
    };
}

export function createContractThunk(data: CreateContractByAssetIdReq): ReduxThunkAction<Promise<CreateContractApiRes>> {
    return async function (dispatch, getState) {
        const state = getState();
        const token = state.user.token;

        const ctrl = new AbortController();

        const url = `${BASE_URL_API}/assets/consign`;
        const headers = {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${token}`,
        };

        return new Promise((resolve, reject) => {
            try {
                fetchEventSource(url, {
                    method: 'POST',
                    headers,
                    signal: ctrl.signal,
                    onmessage(message) {
                        if (message.event === 'consign_success') {
                            ctrl.abort();
                            resolve();
                        }

                        if (message.event === 'consign_error') {
                            ctrl.abort();
                            reject();
                        }
                    },
                }).catch(reject);
            } catch (error) {
                reject();
            }
        });
    };
}

export function updateConsignArtworkStepThunk(payload: {
    stepName: ConsignArtworkSteps;
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        let reqBodyStep = { finishedAt: new Date() };
        const asset = getState().asset;

        if (['c2pa', 'ipfs', 'contractExplorer'].includes(payload.stepName) && asset[payload.stepName]) {
            reqBodyStep = { ...asset[payload.stepName], ...reqBodyStep };
        }

        await updateAssetStep({
            stepName: payload.stepName,
            [payload.stepName]: reqBodyStep,
            id: getState().user.selectedAsset,
        });

        dispatch(assetActionsCreators.change({ [payload.stepName]: reqBodyStep }));
    };
}

export function extractAssetColorsThunk({ id }: { id: string }): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const state = getState();
        const token = state.user.token;

        const ctrl = new AbortController();

        const url = `${BASE_URL_API}/assets/${id}/colors`;
        const headers = {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${token}`,
        };

        return new Promise((resolve, reject) => {
            try {
                fetchEventSource(url, {
                    method: 'GET',
                    headers,
                    signal: ctrl.signal,
                    onmessage(message) {
                        try {
                            if (message.event === 'extract_color_success') {
                                const parsed = JSON.parse(message.data) as number[][];

                                // Update asset metadata colors
                                dispatch(assetActionsCreators.setTempColors(parsed));

                                ctrl.abort();
                                resolve(parsed);
                            }

                            if (message.event === 'extract_color_error') {
                                ctrl.abort();
                                reject();
                            }
                        } catch (error) {
                            ctrl.abort();
                            reject();
                        }
                    },
                });
            } catch (error) {
                reject();
            }
        });
    };
}

export function validationConsignThunk(): ReduxThunkAction<Promise<void>> {
    return function (dispatch, getState) {
        dispatch(assetActionsCreators.setValidationConsign({ status: 'loading', message: '' }));

        return validationConsign(getState().user.selectedAsset)
            .then((response) => {
                if (response.data) {
                    dispatch(assetActionsCreators.setValidationConsign({ status: 'success', message: '' }));
                }
            })
            .catch((error) => {
                dispatch(
                    assetActionsCreators.setValidationConsign({
                        status: 'error',
                        message: error instanceof AxiosError ? error.response?.data?.args : 'Unknown error',
                    })
                );
            });
    };
}

export function consignThunk(id: string): ReduxThunkAction<Promise<void>> {
    return function (dispatch) {
        return consign(id).then((response) => {
            dispatch(assetActionsCreators.resetConsign());

            dispatch(assetActionsCreators.setConeignTransaction(response.data.transaction));
            dispatch(eventTransactionThunk());
        });
    };
}

export const CONSIGN_STATUS_MAP = {
    pending: 'pending',
    running: 'running',
    finished: 'finished',
    failed: 'failed',
};

export const CONSIGN_MESSAGE_MAP = {
    check: 'Checked all media files',
    c2pa: 'Signed asset',
    ipfs: 'IPFS hashes checked',
};

export function eventTransactionThunk(): ReduxThunkAction<Promise<void>> {
    return function (dispatch, getState) {
        const transaction = getState().asset.consign.transaction;
        if (!transaction) return Promise.resolve();

        return eventsByTransaction(transaction).then((response) => {
            dispatch(
                assetActionsCreators.setConsignInfo({
                    message: response.data.data.current.message,
                    status: response.data.data.current.status,
                    when: response.data.data.current.when,
                })
            );

            if (
                !getState().asset.consign.steps.check &&
                response.data.data.history.some((item: HistoryItems) => item.message === CONSIGN_MESSAGE_MAP.check)
            ) {
                dispatch(assetActionsCreators.setConsignStep({ step: 'check' }));
            }

            if (
                !getState().asset.consign.steps.c2pa &&
                response.data.data.history.some((item: HistoryItems) => item.message === CONSIGN_MESSAGE_MAP.c2pa)
            ) {
                dispatch(assetActionsCreators.setConsignStep({ step: 'c2pa' }));
            }

            if (
                !getState().asset.consign.steps.ipfs &&
                response.data.data.history.some((item: HistoryItems) => item.message === CONSIGN_MESSAGE_MAP.ipfs)
            ) {
                dispatch(assetActionsCreators.setConsignStep({ step: 'ipfs' }));
            }

            if (
                !getState().asset.consign.steps.contractExplorer &&
                response.data.data.current.status === CONSIGN_STATUS_MAP.finished
            ) {
                dispatch(assetActionsCreators.setConsignStep({ step: 'contractExplorer' }));
            }

            if (
                response.data.data.current.status === CONSIGN_STATUS_MAP.pending ||
                response.data.data.current.status === CONSIGN_STATUS_MAP.running
            ) {
                setTimeout(() => {
                    dispatch(eventTransactionThunk());
                }, 1_000);
            }
        });
    };
}

export function requestConsignThunk(): ReduxThunkAction<void> {
    return function (dispatch, getState) {
        dispatch(assetActionsCreators.setRequestConsignStatusPending());
        requestConsign(getState().user.selectedAsset);
    };
}

export function deleteRequestConsignThunk(): ReduxThunkAction<void> {
    return function (dispatch, getState) {
        const consignArtworkStatus = getState().consignArtwork.status;
        if (consignArtworkStatus === 'pending') {
            deleteRequestConsign(getState().user.selectedAsset);
            dispatch(assetActionsCreators.setRequestConsignStatusDraft());
        }
    };
}

export function getRequestConsignCommentsThunk({ id }: { id: string }): ReduxThunkAction<Promise<any>> {
    return function (dispatch, getState) {
        return getRequestConsignComments(id)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    dispatch(assetActionsCreators.setRequestConsignComments(response.data[0].comments));
                }
            })
            .catch((error) => {
                // do nothing
            });
    };
}
