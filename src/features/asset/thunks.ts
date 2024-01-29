import { assetStorage, updateAssetStep, getAsset } from './requests';
import { AssetStatus, AssetStorageReq } from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { FormatMediaSave, FormatsMedia } from '@/app/home/consignArtwork/assetMedia/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { TermsOfUseFormValues } from '@/app/home/consignArtwork/termsOfUse/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { SectionFormatType, SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';

export function assetStorageThunk(payload: AssetStorageReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
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
            }

            return response;
        } catch (_) {
            // TODO: implement error handling
        }
    };
}

export function assetMediaThunk(payload: {
    formats?: FormatMediaSave;
    deleteFormats?: string[];
}): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatsState = getState().asset.formats;

        const formatsPersist = Object.entries(formatsState)
            .filter(([key, value]) => value.file)
            .filter(([key, value]) => !payload.deleteFormats?.includes(key))
            .reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: {
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
                    file: `${ASSET_STORAGE_URL}/${value.path}`,
                    name: value.name,
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
