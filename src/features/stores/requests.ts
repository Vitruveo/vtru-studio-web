import { APIResponse } from '../common/types';
import { CreateStoresParams, Stores, UpdateStepNameStoresParams } from './types';

import { apiService } from '@/services/api';

export function getStores(): Promise<APIResponse<Stores[]>> {
    return apiService.get('/stores/me');
}

export async function getStoreById(id: string): Promise<APIResponse<Stores>> {
    return apiService.get(`/stores/${id}`);
}

export async function createNewStore(): Promise<APIResponse<{ insertedId: string }>> {
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
