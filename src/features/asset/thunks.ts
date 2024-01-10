import { assetStorage, updateAssetStep, getAsset } from './requests';
import { AssetStatus, AssetStorageReq } from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { licenses } from '@/app/home/consignArtwork/mock';
import { FormatMediaSave, FormatsMedia } from '@/app/home/consignArtwork/assetMedia/types';
import { AssetMetadataFormValues } from '@/app/home/consignArtwork/assetMetadata/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { TermsOfUseFormValues } from '@/app/home/consignArtwork/termsOfUse/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';
import { ASSET_STORAGE_URL } from '@/constants/asset';

export function assetStorageThunk(payload: AssetStorageReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
        });

        // if (response) dispatch(userActionsCreators.requestAssetUploadUsed({ transactionId: payload.transactionId }));

        return response;
    };
}

export function getAssetThunk(): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        try {
            const response = await getAsset();
            if (response.data) {
                if (response.data.assetMetadata && response.data.assetMetadata.assetMetadataDefinitions?.length)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'assetMetadata', status: 'completed' })
                    );
                if (response.data.licenses && response.data.licenses.length)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'licenses', status: 'completed' })
                    );
                if (response.data.contract)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({ stepId: 'termsOfUse', status: 'completed' })
                    );

                dispatch(
                    assetActionsCreators.change({
                        assetMetadata: response.data.assetMetadata,
                        licenses: response.data.licenses,
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

export function assetMediaThunk(payload: { formats?: FormatMediaSave }): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const formatAssetsFormats = Object.entries(payload.formats || {}).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: { file: `${ASSET_STORAGE_URL}/${value.path}`, customFile: undefined, transactionId: undefined },
            };
        }, {} as FormatsMedia);

        const response = await updateAssetStep({
            formats: payload.formats,
            stepName: 'assetUpload',
        });

        dispatch(assetActionsCreators.changeFormats(formatAssetsFormats));
    };
}

export function assetMetadataThunk(payload: AssetMetadataFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            ...payload,
            stepName: 'assetMetadata',
        });

        dispatch(
            assetActionsCreators.change({
                assetMetadata: payload.assetMetadata,
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
            licenses: payload.licenses.map((v) =>
                !v.added
                    ? {
                          ...v,
                          licenseMetadataDefinitions: licenses?.find((license) => license.domain === v.domain)
                              ?.licenseMetadataDefinitions,
                      }
                    : v
            ),
            stepName: 'license',
        });

        dispatch(
            assetActionsCreators.change({
                licenses: payload.licenses,
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
