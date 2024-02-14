import { assetStorage, updateAssetStep, getAsset, sendRequestUpload, requestDeleteFiles } from './requests';
import {
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStatus,
    AssetStorageReq,
    RequestDeleteFilesReq,
} from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { FormatMediaSave, FormatsMedia, OriginalFormatMedia } from '@/app/home/consignArtwork/assetMedia/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { TermsOfUseFormValues } from '@/app/home/consignArtwork/termsOfUse/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { SectionFormatType, SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';
import { FormatsAuxiliayMedia } from '@/app/home/consignArtwork/auxiliaryMedia/types';
import { nanoid } from '@reduxjs/toolkit';
import { getMediaDefinition } from '@/app/home/consignArtwork/assetMedia/helpers';

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
                if (response.data.assetMetadata && Object.values(response.data.assetMetadata)?.length) {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'assetMetadata', status: 'completed' })
                    );
                }

                if (response.data.licenses && Object.values(response.data.licenses).filter((v) => v.added)?.length)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'licenses', status: 'completed' })
                    );

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

                    if (formatAssetsFormats.original.file && !formatAssetsFormats.original.definition) {
                        const { definition, width, height } = await getMediaDefinition({
                            fileOrUrl: formatAssetsFormats.original.file!,
                        });

                        formatAssetsFormats.original.definition = definition;
                        formatAssetsFormats.original.width = width;
                        formatAssetsFormats.original.height = height;
                    }

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

                if (response.data.mediaAuxiliary?.formats) {
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

                    dispatch(assetActionsCreators.changeFormatsMediaAuxiliary({ formats: formatAssetsFormats }));
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
            // TODO: implement error handling
        }
    };
}

export function auxiliaryMediaThunk(payload: {
    formats?: FormatMediaSave;
    deleteFormats?: string[];
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatsState = getState().asset.mediaAuxiliary.formats;

        if (payload.deleteFormats && payload.deleteFormats.length) {
            const deleteKeys = payload.deleteFormats.reduce((acc, cur) => {
                const format = formatsState[cur as keyof typeof formatsState];
                if (format.file) {
                    return [...acc, (format.file as string).replace(`${ASSET_STORAGE_URL}/`, '')];
                }
                return acc;
            }, [] as string[]);

            await requestDeleteFiles({
                deleteKeys,
                transactionId: nanoid(),
            });
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
            mediaAuxiliary: {
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

        dispatch(assetActionsCreators.changeFormatsMediaAuxiliary({ formats: formatAssetsFormats }));
        if (payload.deleteFormats?.length)
            dispatch(assetActionsCreators.removeFormatsMediaAuxiliary(payload.deleteFormats));
    };
}

export function assetMediaThunk(payload: {
    formats?: FormatMediaSave;
    deleteFormats?: string[];
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatsState = getState().asset.formats;

        if (payload.deleteFormats && payload.deleteFormats.length) {
            const deleteKeys = payload.deleteFormats.reduce((acc, cur) => {
                const format = formatsState[cur as keyof typeof formatsState];
                if (format.file) {
                    return [...acc, (format.file as string).replace(`${ASSET_STORAGE_URL}/`, '')];
                }
                return acc;
            }, [] as string[]);

            if (deleteKeys.length)
                await requestDeleteFiles({
                    deleteKeys,
                    transactionId: nanoid(),
                });
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

        const formatAssetsFormats = Object.entries(payload.formats || {}).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: {
                    ...value,
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

export function assetMetadataThunk(payload: SectionsFormData): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            assetMetadata: {
                ...payload,
            },
            stepName: 'assetMetadata',
        });

        dispatch(
            assetActionsCreators.change({
                assetMetadata: payload,
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
        });

        return response;
    };
}
