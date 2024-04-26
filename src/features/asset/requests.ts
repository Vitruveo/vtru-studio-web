import axios, { AxiosResponse } from 'axios';
import {
    Asset,
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStorageReq,
    GetAssetApiRes,
    RequestDeleteFilesReq,
    SigningMediaC2PAReq,
    UpdateAssetStepApiRes,
    UpdateAssetStepReq,
} from './types';
import { apiService } from '@/services/api';
import { assetActionsCreators } from './slice';
import { ASSET_STORAGE_BUCKET } from '@/constants/asset';

export async function requestDeleteFiles(data: RequestDeleteFilesReq): Promise<any> {
    const res = await apiService.delete('/assets/request/deleteFile', data);
    return res;
}

export async function deleteAssetStorage(url: string): Promise<any> {
    const res = await fetch(url, {
        method: 'DELETE',
    });
    return res;
}

export async function assetStorage({ file, url, dispatch, transactionId }: AssetStorageReq): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                dispatch(assetActionsCreators.requestAssetUpload({ transactionId, uploadProgress: percentCompleted }));
            }
        };

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        xhr.send(file);
    });
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
    const res = await apiService.post<string>('/assets/request/upload', data);
    return res;
}

export async function signingMediaC2PA(data: SigningMediaC2PAReq): Promise<AxiosResponse> {
    return axios.post('https://ef2k3d6407.execute-api.us-east-1.amazonaws.com/qa/postprocess', {
        bucket: ASSET_STORAGE_BUCKET,
        region: 'us-east-1',
        token: data.token,
        creator: data.creator,
        filename: data.filename,
    });
}

export async function extractAssetColors(id: string) {
    const res = await apiService.get<string[]>(`/assets/${id}/colors`)
    return res;
}
