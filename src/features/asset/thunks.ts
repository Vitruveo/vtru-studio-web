import { StepsFormValues } from '@/app/home/components/wizard/types';
import { userActionsCreators } from '../user/slice';
import { assetStorage } from './requests';
import { AssetStorageReq } from './types';
import { ReduxThunkAction } from '@/store';

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
