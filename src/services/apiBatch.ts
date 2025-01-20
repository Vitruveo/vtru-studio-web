import axios, { AxiosResponse } from 'axios';
import { store } from '@/store/index';
import { APIResponse } from '@/features/common/types';
import { BASE_URL_BATCH } from '@/constants/api';

const apiBatch = axios.create({
    baseURL: BASE_URL_BATCH,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiBatch.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiServiceBatch = {
    get: async <T = unknown>(url: string): Promise<APIResponse<T>> => {
        const response = await apiBatch.get(url);
        return response.data;
    },
    post: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await apiBatch.post(url, data);
        return response.data;
    },
    put: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await apiBatch.put(url, data);
        return response.data;
    },
    delete: async <T = unknown, E = any>(url: string, data?: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await apiBatch.delete(url, { data });
        return response.data;
    },
};
