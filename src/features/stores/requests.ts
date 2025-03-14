import { APIResponse } from '../common/types';
import { storesActionsCreators } from './slice';
import {
    GetStoresParams,
    StorePaginated,
    Stores,
    StoreStorageParams,
    UpdateStatusParams,
    UpdateStepNameStoresParams,
    UpdateStoreVisibilityParams,
    ValidateUrlParams,
} from './types';

import { apiService } from '@/services/api';

export function getStores(data?: GetStoresParams): Promise<APIResponse<StorePaginated>> {
    return apiService.get('/stores/me', {
        params: {
            status: data?.status,
            page: data?.page,
            limit: data?.limit,
            sort: data?.sort,
        },
    });
}

export function getAllStores(data?: GetStoresParams): Promise<APIResponse<StorePaginated>> {
    return apiService.get('/stores/public', {
        params: {
            page: data?.page,
            limit: data?.limit,
            sort: data?.sort,
        },
    });
}

export async function getStoreById(id: string): Promise<APIResponse<Stores>> {
    return apiService.get(`/stores/${id}`);
}

export async function createNewStore(id?: string): Promise<APIResponse<{ insertedId: string }>> {
    if (id) {
        return apiService.post(`/stores/clone/${id}`, {});
    }
    return apiService.post('/stores', {});
}

export async function deleteStore(id: string): Promise<APIResponse<void>> {
    return apiService.delete(`/stores/${id}`);
}

export async function updateStepNameStore({
    id,
    stepName,
    data,
}: UpdateStepNameStoresParams): Promise<APIResponse<void>> {
    return apiService.patch(`/stores/${id}`, {
        stepName,
        data,
    });
}

export async function updateStatusStore({ id, status }: UpdateStatusParams): Promise<APIResponse<void>> {
    return apiService.patch(`/stores/status/${id}`, { status });
}

export async function updateStoreVisibility({ id, status }: UpdateStoreVisibilityParams): Promise<APIResponse<void>> {
    return apiService.patch(`/stores/status/${id}/creator`, { status });
}

export async function validateUrl({ storeId, url }: ValidateUrlParams): Promise<APIResponse<boolean>> {
    return apiService.post(`/stores/validateUrl/${storeId}`, { url });
}

export async function storeStorage({ file, url, dispatch, transactionId }: StoreStorageParams): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!file) reject('No file provided');

        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                dispatch(storesActionsCreators.requestStoreUpload({ transactionId, uploadProgress: percentCompleted }));
            }
        };

        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        xhr.send(file);
    });
}
