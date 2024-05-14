import { fetchEventSource } from '@microsoft/fetch-event-source';

import {
    assetStorage,
    updateAssetStep,
    getAsset,
    sendRequestUpload,
    requestDeleteFiles,
    signingMediaC2PA,
    extractAssetColors,
} from './requests';
import {
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStatus,
    AssetStorageReq,
    ConsignArtworkSteps,
    CreateContractApiRes,
    CreateContractByAssetIdReq,
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
import { consignArtworkActionsCreators, stepsNames } from '../consignArtwork/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';
import { FormatsAuxiliayMedia } from '@/app/home/consignArtwork/auxiliaryMedia/types';
import { AxiosResponse } from 'axios';
import { BASE_URL_API } from '@/constants/api';
import { toastrActionsCreators } from '../toastr/slice';

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

export function getAssetThunk(): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        try {
            const response = await getAsset();

            if (response.data) {
                if (response.data.consignArtwork) {
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

                if (response.data.licenses && Object.values(response.data.licenses).filter((v) => v.added)?.length)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'licenses', status: 'completed' })
                    );

                if (response.data.contractExplorer) {
                    dispatch(assetActionsCreators.changeContractExplorer(response.data.contractExplorer));
                }

                if (response.data.ipfs) {
                    dispatch(assetActionsCreators.change({ ipfs: response.data.ipfs }));
                }

                if (response.data.c2pa) {
                    dispatch(assetActionsCreators.change({ c2pa: response.data.c2pa }));
                }

                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'termsOfUse',
                        status:
                            response.data.contract &&
                            response.data.isOriginal &&
                            response.data.generatedArtworkAI &&
                            response.data.notMintedOtherBlockchain
                                ? 'completed'
                                : response.data.contract ||
                                    response.data.isOriginal ||
                                    response.data.generatedArtworkAI ||
                                    response.data.notMintedOtherBlockchain
                                  ? 'inProgress'
                                  : 'notStarted',
                    })
                );

                dispatch(
                    assetActionsCreators.change({
                        _id: response.data._id,
                        assetMetadata: response.data.assetMetadata,
                        licenses: response.data.licenses,
                        isOriginal: response.data.isOriginal,
                        generatedArtworkAI: response.data.generatedArtworkAI,
                        notMintedOtherBlockchain: response.data.notMintedOtherBlockchain,
                        contract: response.data.contract,
                        status: response.data.status,
                    })
                );

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
        });

        dispatch(
            assetActionsCreators.change({
                isOriginal: payload.isOriginal,
                generatedArtworkAI: payload.generatedArtworkAI,
                notMintedOtherBlockchain: payload.notMintedOtherBlockchain,
                contract: payload.contract,
            })
        );
    };
}

export function publishThunk(payload: { status: AssetStatus }): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            ...payload,
            stepName: 'publish',
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
        const response = await sendRequestUpload({
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

export function consignThunk(): ReduxThunkAction<Promise<CreateContractApiRes>> {
    return async function (dispatch, getState) {
        const state = getState();
        const token = state.user.token;

        const ctrl = new AbortController();

        const url = `${BASE_URL_API}/assets/consign`;
        const headers = {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${token}`,
        };

        const dispatchFinished = (type: 'c2pa' | 'ipfs' | 'consign') =>
            dispatch(
                assetActionsCreators.changeWeb3({
                    type,
                    value: { finishedAt: new Date(), error: null },
                })
            );

        const dispatchError = (message: string | undefined = undefined) => {
            const web3 = getState().asset.web3;

            const item = Object.entries(web3).find(([_, value]) => !value.finishedAt);
            if (item) {
                const [key] = item;
                dispatch(
                    assetActionsCreators.changeWeb3({
                        type: key as 'c2pa' | 'ipfs' | 'consign',
                        value: { finishedAt: null, error: message || 'Connection error' },
                    })
                );
            }
        };

        return new Promise((resolve, reject) =>
            fetchEventSource(url, {
                method: 'POST',
                headers,
                signal: ctrl.signal,
                onmessage(message) {
                    if (message.event === 'c2pa_success') {
                        dispatchFinished('c2pa');
                    }
                    if (message.event === 'ipfs_success') {
                        dispatchFinished('ipfs');
                    }

                    if (message.event === 'consign_success') {
                        dispatchFinished('consign');
                        dispatch(getAssetThunk());

                        ctrl.abort();
                        resolve();
                    }

                    if (message.event === 'consign_error') {
                        dispatchError(message.data);

                        ctrl.abort();
                        reject();
                    }
                },
                onerror() {
                    dispatchError();

                    ctrl.abort();
                    reject();
                },
                onclose() {
                    ctrl.abort();
                },
            }).catch(() => {
                ctrl.abort();
                reject();
            })
        );
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
                                const parsed = JSON.parse(message.data);

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
