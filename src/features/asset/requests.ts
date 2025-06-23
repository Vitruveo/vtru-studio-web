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
    SignUpdateLicensePriceReq,
    SignUpdateAssetHeaderReq,
    SignUpdateAssetStatusReq,
    UpdateAssetStatusReq,
    UpdateAssetHeaderReq,
    UpdatePrintLicensePriceReq,
    UpdatePrintLicenseAddedReq,
    SignMessageReq,
} from './types';
import { apiService } from '@/services/api';
import { assetActionsCreators } from './slice';
import { ASSET_STORAGE_BUCKET } from '@/constants/asset';
import { BASE_URL_API3 } from '@/constants/api';
import { api3Service } from '@/services/api3';
import { UpdatedAssetStoresVisibilityReq } from '../common/types';

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
    return axios.post(`${BASE_URL_API3}/consign/${id}`);
}

export async function eventsByTransaction(transaction: string) {
    return axios.get(`${BASE_URL_API3}/events/${transaction}`);
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
    return axios.post(`${BASE_URL_API3}/assets/validate/${data.assetId}`);
}

export async function updatePrice({ assetId, price }: UpdatePriceReq) {
    return api3Service.patch(`/assets/licenses/updatePrice/${assetId}`, { editionPrice: price });
}

export async function checkLicenseEditable({ assetId }: CheckLicenseEditableReq): Promise<CheckLicenseEditableRes> {
    return api3Service.get(`/assets/licenses/checkEditable/${assetId}`);
}

export async function signUpdateLicensePrice({ signer, domain, types, tx, signedMessage }: SignUpdateLicensePriceReq) {
    return axios.post(`${BASE_URL_API3}/assets/verify/updateLicensePrice`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}

export async function signUpdateAssetHeader({ signer, domain, types, tx, signedMessage }: SignUpdateAssetHeaderReq) {
    return axios.post(`${BASE_URL_API3}/assets/verify/updateAssetHeader`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}

export async function signAddedPrintLicense({ signer, domain, types, tx, signedMessage }: SignMessageReq) {
    return axios.post(`${BASE_URL_API3}/assets/verify/print/added`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}

export async function signUpdatePrintLicensePrice({ signer, domain, types, tx, signedMessage }: SignMessageReq) {
    return axios.post(`${BASE_URL_API3}/assets/verify/print/updatePrice`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}

export async function updateAssetHeader({ assetKey, header }: UpdateAssetHeaderReq) {
    return api3Service.patch(`/assets/updateAssetHeader/${assetKey}`, header);
}

export async function changeAutoStakeInAllAssets(autoStake: boolean) {
    return apiService.put(`/assets/changeAutoStakeInAllAssets`, { autoStake });
}

export async function updatedAssetStoresVisibility({ assetId, stores }: UpdatedAssetStoresVisibilityReq) {
    return apiService.put(`/assets/${assetId}/storesVisibility`, stores);
}

export async function signUpdateAssetStatus({ signer, domain, signedMessage, tx, types }: SignUpdateAssetStatusReq) {
    return axios.post(`${BASE_URL_API3}/assets/verify/updateAssetStatus`, {
        signer,
        domain,
        types,
        tx,
        signedMessage,
    });
}

export async function updateAssetStatus({ assetKey, status }: UpdateAssetStatusReq) {
    return api3Service.patch(`/assets/updateAssetStatus/${assetKey}`, { status });
}

export async function updatePrintLicensePrice({
    assetKey,
    merchandisePrice,
    displayPrice,
    multiplier,
}: UpdatePrintLicensePriceReq) {
    return api3Service.patch(`/assets/licenses/print/updatePrice/${assetKey}`, {
        merchandisePrice,
        displayPrice,
        multiplier,
    });
}

export async function addedPrintLicense({ assetKey, added }: UpdatePrintLicenseAddedReq) {
    return api3Service.patch(`/assets/licenses/print/added/${assetKey}`, { added });
}
