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

export async function assetStorage({ file, url }: AssetStorageReq): Promise<any> {
    const res = await fetch(url, {
        method: 'PUT',
        body: file,
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
