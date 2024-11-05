import axios, { AxiosResponse } from 'axios';
import {
    Asset,
    AssetPaginated,
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStorageReq,
    CheckLicenseEditableReq,
    CheckLicenseEditableRes,
    CreateAssetApiRes,
    GetAssetApiRes,
    GetAssetsApiRes,
    GetMyAssetsReq,
    RequestDeleteFilesReq,
    SigningMediaC2PAReq,
    StoresSendRequestUploadApiRes,
    StoresSendRequestUploadReq,
    UpdateAssetStepApiRes,
    UpdateAssetStepReq,
    UpdatePriceReq,
    ValidateUploadedMediaReq,
    signMessageReq,
} from './types';
import { apiService } from '@/services/api';
import { assetActionsCreators } from './slice';
import { ASSET_STORAGE_BUCKET } from '@/constants/asset';
import { BASE_URL_BATCH } from '@/constants/api';

export async function requestDeleteFiles(data: RequestDeleteFilesReq): Promise<any> {
    if (!data.deleteKeys.length) return;

    const res = await apiService.delete(`/assets/request/deleteFile/${data.assetId}`, data);
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
    const res = await apiService.put<string>(`/assets/${data.id}/form`, data);
    return res;
}

export async function getAsset(): Promise<GetAssetApiRes> {
    const res = await apiService.get<Asset>('/assets/creatorMy');
    return res;
}

export async function getMyAssets({ page, status, collection = '', sort }: GetMyAssetsReq): Promise<GetAssetsApiRes> {
    const res = await apiService.get<AssetPaginated>(
        `/assets?page=${page}&status=${status?.toLowerCase()}&collection=${encodeURIComponent(collection)}&sort=${sort}`
    );
    return res;
}

export async function getAssetById(id: string): Promise<GetAssetApiRes> {
    const res = await apiService.get<Asset>(`/assets/${id}`);
    return res;
}

export async function createNewAsset(cloneId?: string): Promise<CreateAssetApiRes> {
    const res = await apiService.post<{
        insertedId: string;
    }>('/assets', {
        ...(cloneId && { cloneId }),
    });
    return res;
}

export async function deleteAsset(id: string): Promise<any> {
    const res = await apiService.delete(`/assets/${id}/form`);
    return res;
}

export async function sendRequestUpload(data: AssetSendRequestUploadReq): Promise<AssetSendRequestUploadApiRes> {
    const res = await apiService.post<string>(`/assets/request/upload/${data.id}`, data);
    return res;
}

export async function sendRequestUploadStores(
    data: StoresSendRequestUploadReq
): Promise<StoresSendRequestUploadApiRes> {
    const res = await apiService.post<string>(`/stores/upload/request/${data.id}`, data);
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
    const res = await apiService.get<number[][]>(`/assets/${id}/colors`);
    return res;
}

export async function validationConsign(id: string) {
    return apiService.get(`/assets/consign/validation/${id}`);
}

export async function consign(id: string) {
    return axios.post(`${BASE_URL_BATCH}/consign/${id}`);
}

export async function eventsByTransaction(transaction: string) {
    return axios.get(`${BASE_URL_BATCH}/events/${transaction}`);
}

export async function requestConsign(id: string) {
    return apiService.post(`/requestConsign/${id}`, {});
}

export async function deleteRequestConsign(id: string) {
    return apiService.delete(`/requestConsign/${id}`);
}

export async function getRequestConsignComments(id: string) {
    return apiService.get(`/requestConsign/comments/${id}`);
}

export async function validateUploadedMedia(data: ValidateUploadedMediaReq) {
    return axios.post(`${BASE_URL_BATCH}/assets/validate/${data.assetId}`);
}

export async function updatePrice({ assetId, price }: UpdatePriceReq) {
    return apiService.patch(`/assets/${assetId}/price`, { price });
}

export async function checkLicenseEditable({ assetId }: CheckLicenseEditableReq): Promise<CheckLicenseEditableRes> {
    return apiService.get(`/assets/${assetId}/isLicenseEditable`);
}

export async function signMessage({ signer, domain, types, tx, signedMessage }: signMessageReq) {
    return axios.post(`${BASE_URL_BATCH}/assets/verify`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}
