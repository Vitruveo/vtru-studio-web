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
