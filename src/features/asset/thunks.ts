import { StepsFormValues, Formats } from '@/app/home/components/wizard/types';
import { assetStorage, updateAssetStep, getAsset } from './requests';
import { AssetStatus, AssetStorageReq } from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';
import { licenses } from '@/app/home/consignArtwork/mock';
import { AssetMediaFormValues, FormatMediaSave } from '@/app/home/consignArtwork/assetMedia/types';
import { AssetMetadataFormValues } from '@/app/home/consignArtwork/assetMetadata/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { TermsOfUseFormValues } from '@/app/home/consignArtwork/termsOfUse/types';
import { StepStatus } from '../consignArtwork/types';

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
                dispatch(
                    assetActionsCreators.change({
                        assetMetadata: response.data.assetMetadata,
                        // creatorMetadata: response.data.creatorMetadata,
                        licenses: response.data.licenses,
                        contract: response.data.contract,
                        status: response.data.status,
                    })
                );
            }

            return response;
        } catch (_) {
            // TODO: implement error handling
        }
    };
}

export function assetMediaThunk(
    payload: AssetMediaFormValues & { formats?: FormatMediaSave }
): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await updateAssetStep({
            formats: payload.formats,
            stepName: 'assetUpload',
        });

        dispatch(
            assetActionsCreators.change({
                asset: {
                    formats: payload.asset.formats,
                },
            })
        );
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
