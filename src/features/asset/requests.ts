import axios from 'axios';

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
    const res = apiService.post<string>('/assets/request/upload', data);
    return res;
}
