import { Licenses, StepsFormValues } from '@/app/home/components/wizard/types';
import { userActionsCreators } from '../user/slice';
import { assetStorage, updateAssetStep, getAsset } from './requests';
import { AssetStorageReq } from './types';
import { ReduxThunkAction } from '@/store';
import { assetActionsCreators } from './slice';

export function assetStorageThunk(payload: AssetStorageReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
            transactionId: payload.transactionId,
        });

        if (response) dispatch(userActionsCreators.requestAssetUploadUsed({ transactionId: payload.transactionId }));

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
                        creatorMetadata: response.data.creatorMetadata,
                        licenses: response.data.licenses.map((v) => ({ ...v, added: true })) as Licenses,
                        contract: response.data.contract,
                    })
                );
            }

            return response;
        } catch (_) {
            // TODO: implement error handling
        }
    };
}

export function assetUpdateStepThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const licenses = payload.licenses.filter((item) => item.added);

        const response = await updateAssetStep({
            ...payload,
            licenses,
        });

        dispatch(
            assetActionsCreators.change({
                assetMetadata: payload.assetMetadata,
                creatorMetadata: payload.creatorMetadata,
                licenses: payload.licenses,
                contract: payload.contract,
            })
        );
    };
}

export function assetMetadataThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {};
}

export function creatorMetadataThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {};
}

export function licenseThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {};
}

export function contractThunk(payload: StepsFormValues): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {};
}
