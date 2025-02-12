import axios, { AxiosResponse } from 'axios';
import { store } from '@/store/index';
import { APIResponse } from '@/features/common/types';
import { BASE_URL_API3 } from '@/constants/api';

const api3 = axios.create({
    baseURL: BASE_URL_API3,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api3.interceptors.request.use(
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

export const api3Service = {
    get: async <T = unknown>(url: string): Promise<APIResponse<T>> => {
        const response = await api3.get(url);
        return response.data;
    },
    post: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api3.post(url, data);
        return response.data;
    },
    put: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api3.put(url, data);
        return response.data;
    },
    patch: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api3.patch(url, data);
        return response.data;
    },
    delete: async <T = unknown, E = any>(url: string, data?: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api3.delete(url, { data });
        return response.data;
    },
};
