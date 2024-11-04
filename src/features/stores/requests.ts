import { APIResponse } from '../common/types';
import { StoresItem } from './types';

import Image1 from '../../../public/images/temp/1729105555923.png';
import Image2 from '../../../public/images/temp/1729105587915.png';
import { NO_IMAGE_ASSET } from '@/constants/asset';

let data = [
    {
        id: '1',
        name: 'Horizon Gallery',
        status: 'Active',
        image: Image1 as unknown as string,
    },
    {
        id: '2',
        name: 'Red Gallery',
        status: 'Draft',
        image: Image2 as unknown as string,
    },
];

export async function getStores(): Promise<APIResponse<StoresItem[]>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 'api',
                message: 'Success',
                transaction: '123',
                data,
            });
        }, 1000);
    });
}

export async function getStoreById(id: string): Promise<APIResponse<StoresItem>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 'api',
                message: 'Success',
                transaction: '123',
                data: data.find((item) => item.id === id),
            });
        }, 1000);
    });
}

export async function createNewStore(id?: string): Promise<APIResponse<{ insertedId: string }>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newStore = {
                id: String(data.length + 1),
                name: data.find((item) => item.id === id)?.name || 'Untitled',
                status: 'Draft',
                image: data.find((item) => item.id === id)?.image || NO_IMAGE_ASSET,
            };
            data = [...data, newStore];
            resolve({
                code: 'api',
                message: 'Success',
                transaction: '123',
                data: {
                    insertedId: newStore.id,
                },
            });
        }, 1000);
    });
}

export async function deleteStore(id: string): Promise<APIResponse<void>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            data = data.filter((item) => item.id !== id);
            resolve({
                code: 'api',
                message: 'Success',
                transaction: '123',
            });
        }, 1000);
    });
}
