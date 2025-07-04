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
    validateUploadedMedia,
    updatePrice,
    checkLicenseEditable,
    signUpdateLicensePrice,
    sendRequestUploadStores,
    updatedAssetStoresVisibility,
    signUpdateAssetHeader,
    signUpdateAssetStatus,
    updateAssetStatus,
    updateAssetHeader,
    updatePrintLicensePrice,
    addedPrintLicense,
    signAddedPrintLicense,
} from './requests';
import {
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStatus,
    AssetStorageReq,
    CheckLicenseEditableReq,
    ConsignArtworkSteps,
    CreateContractApiRes,
    CreateContractByAssetIdReq,
    HistoryItems,
    RequestDeleteFilesReq,
    StoresSendRequestUploadReq,
    SigningMediaC2PAReq,
    StoresSendRequestUploadApiRes,
    UpdatePriceReq,
    UploadIPFSByAssetIdApiRes,
    UploadIPFSByAssetIdReq,
    ValidateUploadedMediaReq,
    SignerParams,
    SignerUpdateAssetParams,
    SignerUpdateAssetStatusParams,
    UpdateAssetStatusReq,
    UpdateAssetHeaderReq,
    UpdatePrintLicensePriceReq,
    UpdatePrintLicenseAddedReq,
    SignerAddedPrintLicenseParams,
    SignerUpdatePricePrintLicenseParams,
} from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { FormatMediaSave, FormatsMedia } from '@/app/(main)/consign/assetMedia/types';
import { LicensesFormValues } from '@/app/(main)/consign/licenses/types';
import { TermsOfUseFormValues } from '@/app/(main)/consign/terms/types';
import { consignArtworkActionsCreators } from '../consign/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { SectionsFormData } from '@/app/(main)/consign/assetMetadata/page';
import { FormatsAuxiliayMedia } from '@/app/(main)/consign/auxiliaryMedia/types';

import { BASE_URL_API } from '@/constants/api';
import { userActionsCreators } from '../user/slice';
import { clientToSigner, network, provider } from '@/services/web3';
import schema from '@/services/web3/contracts.json';
import { UpdatedAssetStoresVisibilityReq } from '../common/types';
import { maxPrice, minPrice } from '@/app/(main)/components/stores/filters/licenseItem';
import { StepStatus } from '../consign/types';

export const checkStepProgress = ({ values }: { values: LicensesFormValues }): StepStatus => {
    return Object.values(values).filter((v) => v?.added).length &&
        values.nft.single.editionPrice >= minPrice &&
        values.nft.single.editionPrice <= maxPrice
        ? 'completed'
        : 'inProgress';
};

export function requestDeleteURLThunk(payload: RequestDeleteFilesReq): ReduxThunkAction<Promise<any>> {
    return async function () {
        const response = await requestDeleteFiles(payload);
        return response;
    };
}

export function assetStorageThunk(payload: Omit<AssetStorageReq, 'dispatch'>): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, _getState) {
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
    return async function (dispatch, _getState) {
        const response = await createNewAsset(cloneId);

        dispatch(userActionsCreators.setSelectedAsset(response.data?.insertedId || ''));
    };
}

export function deleteAssetThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, _getState) {
        await deleteAsset(id);
        dispatch(userActionsCreators.removeAsset(id));
    };
}

export function getAssetThunk(id: string): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, _getState) {
        try {
            dispatch(assetActionsCreators.resetAsset());
            const response = await getAssetById(id);

            const isAllValid = response.data?.formats
                ? Object.entries(response.data?.formats)
                      .filter(([key]) => key !== 'print')
                      .every(([_, item]) => (item?.validation ? item.validation.isValid : item.path))
                : false;

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
                            status: checkStepProgress({
                                values: response.data.licenses,
                            }),
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
                            stepId: 'terms',
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

                if (response.data.mintExplorer) {
                    dispatch(assetActionsCreators.change({ mintExplorer: response.data.mintExplorer }));
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
                        Object.entries(formatAssetsFormats).length < 4 || !isAllValid
                            ? 'inProgress'
                            : Object.entries(formatAssetsFormats)
                                    .filter(([key]) => key !== 'print')
                                    .every(([_key, value]) => value.file)
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
            .filter(([_key, value]) => value.file)
            .filter(([key, _value]) => !payload.deleteFormats?.includes(key))
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
    formatsFields?: FormatsMedia;
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        dispatch(assetActionsCreators.changeLoadingMediaData('running'));
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
            .filter(([_key, value]) => value.file)
            .filter(([key, _value]) => !payload.deleteFormats?.includes(key))
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
        dispatch(assetActionsCreators.changeLoadingMediaData('finished'));

        const currentFormats = Object.entries(getState().asset.formats || {}).filter(
            ([key, _value]) => key !== 'print'
        );
        const hasFiles = currentFormats.every(([_key, value]) => value.path);

        const currentFormatsFields = Object.entries(payload?.formatsFields || {}).filter(
            ([key, _value]) => key !== 'print'
        );

        const hasFilesFormatFields = currentFormatsFields.every(([_key, value]) => value.file);

        if (hasFiles && hasFilesFormatFields && !payload.deleteFormats?.length) {
            dispatch(
                validateUploadedMediaThunk({
                    assetId: getState().asset._id,
                })
            );
        }

        // Print
        // const hasPrintFile = getState().asset.formats?.print?.path;
        // const hasPrintFileFields = payload?.formatsFields?.print?.file;
        // if (hasPrintFile && hasPrintFileFields && !payload.deleteFormats?.length) {
        //     dispatch(
        //         validateUploadedMediaThunk({
        //             assetId: getState().asset._id,
        //         })
        //     );
        // }
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
        await updateAssetStep({
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

export function updatedAssetStoresVisibilityThunk(
    payload: UpdatedAssetStoresVisibilityReq
): ReduxThunkAction<Promise<any>> {
    return async function (dispatch) {
        try {
            updatedAssetStoresVisibility(payload);
            dispatch(userActionsCreators.changeAssetStoresVisibility(payload));
        } catch (err) {
            console.error(err);
        }
    };
}

export function contractThunk(payload: TermsOfUseFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        await updateAssetStep({
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
        await updateAssetStep({
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
    return async function (_dispatch, getState) {
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

export function sendRequestUploadStoresThunk(
    payload: StoresSendRequestUploadReq
): ReduxThunkAction<Promise<StoresSendRequestUploadApiRes>> {
    return async function () {
        const response = await sendRequestUploadStores({
            id: payload.id,
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
    return async function (_dispatch, getState) {
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

export function createContractThunk(
    _data: CreateContractByAssetIdReq
): ReduxThunkAction<Promise<CreateContractApiRes>> {
    return async function (_dispatch, getState) {
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
    return async function (dispatch, getState) {
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
    return async function (dispatch) {
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
    return async function (dispatch, getState) {
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
        const consignArtworkStatus = getState().asset.consignArtwork?.status;

        if (consignArtworkStatus === 'pending') {
            deleteRequestConsign(getState().asset._id);
            dispatch(assetActionsCreators.setRequestConsignStatusDraft());
        }
    };
}

export function getRequestConsignCommentsThunk({ id }: { id: string }): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, _getState) {
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

export function validateUploadedMediaThunk(payload: ValidateUploadedMediaReq): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, _getState) {
        dispatch(assetActionsCreators.changeLoading(true));
        return validateUploadedMedia(payload)
            .then(() => {
                dispatch(assetActionsCreators.setFormatValidationConfirmed());
            })
            .catch((error) => {
                if (error instanceof AxiosError && error.response?.status === 400) {
                    const data = error.response.data;

                    data.data.forEach((item: any) => {
                        dispatch(
                            assetActionsCreators.setFormatValidationError({
                                format: item.media,
                                message: item.message,
                            })
                        );
                    });

                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'assetMedia',
                            status: 'inProgress',
                        })
                    );
                }
            })
            .finally(() => {
                dispatch(assetActionsCreators.changeLoading(false));
            });
    };
}

export function updatePriceThuk(payload: UpdatePriceReq): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        return updatePrice(payload)
            .then(() => true)
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}

export function checkLicenseEditableThunk(payload: CheckLicenseEditableReq): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        return checkLicenseEditable(payload)
            .then((response) => response.data as boolean)
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}

export function signerUpdatePricePrintLicenseThunk(
    payload: SignerUpdatePricePrintLicenseParams
): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        try {
            const { client, assetKey, displayPrice, merchandisePrice, multiplier } = payload;

            return true;
        } catch (error) {
            return false;
        }
    };
}

export function signerAddedPrintLicenseThunk(
    payload: SignerAddedPrintLicenseParams
): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        try {
            const { client, assetKey, added } = payload;
            const signer = clientToSigner(client);

            const contractAddress = schema[network].AssetRegistry;

            const domain = {
                name: 'Vitruveo Studio',
                version: '1',
                chainId: Number((await provider.getNetwork()).chainId),
            };

            const types = {
                Transaction: [
                    { name: 'name', type: 'string' },
                    { name: 'action', type: 'string' },
                    { name: 'method', type: 'string' },
                    { name: 'assetKey', type: 'string' },
                    { name: 'added', type: 'bool' },
                    { name: 'licenseTypeId', type: 'uint' },
                    { name: 'contract', type: 'address' },
                    { name: 'timestamp', type: 'uint' },
                ],
            };

            const tx = {
                name: 'Asset Registry',
                action: 'Added Print License',
                method: 'addedPrintLicense',
                assetKey: assetKey,
                added,
                licenseTypeId: 4,
                contract: contractAddress,
                timestamp: Math.floor(Date.now() / 1000),
            };

            // Sign the message
            const signedMessage = await signer.signTypedData(domain, types, tx);

            const response = await signAddedPrintLicense({
                tx,
                signedMessage,
                signer: signer.address,
                types,
                domain,
            });

            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    };
}

export function signerUpdateLicensePriceThunk(payload: SignerParams): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        try {
            const { client, assetKey, price } = payload;

            const signer = clientToSigner(client);

            const contractAddress = schema[network].AssetRegistry;

            const domain = {
                name: 'Vitruveo Studio',
                version: '1',
                chainId: Number((await provider.getNetwork()).chainId),
            };

            const types = {
                Transaction: [
                    { name: 'name', type: 'string' },
                    { name: 'action', type: 'string' },
                    { name: 'method', type: 'string' },
                    { name: 'assetKey', type: 'string' },
                    { name: 'price', type: 'uint' },
                    { name: 'licenseTypeId', type: 'uint' },
                    { name: 'quantity', type: 'uint' },
                    { name: 'contract', type: 'address' },
                    { name: 'timestamp', type: 'uint' },
                ],
            };

            const tx = {
                name: 'Asset Registry',
                action: 'Update price',
                method: 'updateLicensePrice',
                assetKey: assetKey,
                price,
                licenseTypeId: 1,
                quantity: 1,
                contract: contractAddress,
                timestamp: Math.floor(Date.now() / 1000),
            };

            // Sign the message
            const signedMessage = await signer.signTypedData(domain, types, tx);

            const response = await signUpdateLicensePrice({
                tx,
                signedMessage,
                signer: signer.address,
                types,
                domain,
            });

            if (response.status !== 200) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    };
}

export function signerUpdateAssetHeaderThunk(payload: SignerUpdateAssetParams): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        try {
            const { client, assetKey, title, description } = payload;

            const signer = clientToSigner(client);

            const contractAddress = schema[network].AssetRegistry;

            const domain = {
                name: 'Vitruveo Studio',
                version: '1',
                chainId: Number((await provider.getNetwork()).chainId),
            };

            const types = {
                Transaction: [
                    { name: 'name', type: 'string' },
                    { name: 'action', type: 'string' },
                    { name: 'method', type: 'string' },
                    { name: 'assetKey', type: 'string' },
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'contract', type: 'address' },
                    { name: 'timestamp', type: 'uint' },
                ],
            };

            const tx = {
                name: 'Asset Registry',
                action: 'Update Asset Header',
                method: 'updateAssetHeader',
                assetKey: assetKey,
                title,
                description,
                contract: contractAddress,
                timestamp: Math.floor(Date.now() / 1000),
            };

            // Sign the message
            const signedMessage = await signer.signTypedData(domain, types, tx);

            const response = await signUpdateAssetHeader({
                tx,
                signedMessage,
                signer: signer.address,
                types,
                domain,
            });

            if (response.status !== 200) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    };
}

export function signerUpdateAssetStatusThunk(
    payload: SignerUpdateAssetStatusParams
): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        try {
            const { client, status, assetKey } = payload;

            const signer = clientToSigner(client);

            const contractAddress = schema[network].AssetRegistry;

            const domain = {
                name: 'Vitruveo Studio',
                version: '1',
                chainId: Number((await provider.getNetwork()).chainId),
            };

            const types = {
                Transaction: [
                    { name: 'name', type: 'string' },
                    { name: 'action', type: 'string' },
                    { name: 'method', type: 'string' },
                    { name: 'assetKey', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'contract', type: 'address' },
                    { name: 'timestamp', type: 'uint' },
                ],
            };

            const tx = {
                name: 'Asset Registry',
                action: 'Update Asset Status',
                method: 'updateAssetStatus',
                assetKey,
                status,
                quantity: 1,
                contract: contractAddress,
                timestamp: Math.floor(Date.now() / 1000),
            };

            // Sign the message
            const signedMessage = await signer.signTypedData(domain, types, tx);

            const response = await signUpdateAssetStatus({
                signer: signer.address,
                tx,
                signedMessage,
                types,
                domain,
            });

            if (response.status !== 200) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    };
}

export function updateAssetHeaderThunk(payload: UpdateAssetHeaderReq): ReduxThunkAction<Promise<void>> {
    const { assetKey, header } = payload;
    return async function () {
        await updateAssetHeader({
            assetKey,
            header,
        });
    };
}

export function updateAssetStatusThunk(payload: UpdateAssetStatusReq): ReduxThunkAction<Promise<void>> {
    const { assetKey, status } = payload;
    return async function () {
        await updateAssetStatus({
            assetKey,
            status,
        });
    };
}

export function updatePrintLicensePriceThunk(payload: UpdatePrintLicensePriceReq): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        return updatePrintLicensePrice(payload)
            .then(() => true)
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}

export function addedPrintLicenseThunk(payload: UpdatePrintLicenseAddedReq): ReduxThunkAction<Promise<boolean>> {
    return async function () {
        return addedPrintLicense(payload)
            .then(() => true)
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}
