import axios from 'axios';
import FormDataUpload from 'form-data';
import {
    Asset,
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStorageReq,
    GetAssetApiRes,
    UpdateAssetStepApiRes,
    UpdateAssetStepReq,
} from './types';
import { apiService } from '@/services/api';
import { assetActionsCreators } from './slice';

export async function assetStorage({ file, url, dispatch, transactionId }: AssetStorageReq): Promise<any> {
    const res = await axios.put(url, file, {
        onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 0));
            dispatch(assetActionsCreators.requestAssetUpload({ transactionId, uploadProgress: percentCompleted }));
        },
    });

    return res;
}

export async function updateAssetStep(data: UpdateAssetStepReq): Promise<UpdateAssetStepApiRes> {
    const res = await apiService.put<string>('/assets', data);
    return res;
}

export async function getAsset(): Promise<GetAssetApiRes> {
    const res = await apiService.get<Asset>('/assets/creatorMy');
    return res;
}

export async function sendRequestUpload(data: AssetSendRequestUploadReq): Promise<AssetSendRequestUploadApiRes> {
    const res = apiService.post<string>('/assets/request/upload', data);
    return res;
}
