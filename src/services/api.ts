import axios, { AxiosResponse } from 'axios';
import { store } from '@/store/index';
import { APIResponse } from '@/features/common/types';
import { BASE_URL_API } from '@/constants/api';
import cookie from 'cookiejs';

const api = axios.create({
    baseURL: BASE_URL_API,
    timeout: 1_000 * 60 * 5, // 5 minutes
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.token;
        const auth = cookie.get('auth');

        if (token || auth) {
            config.headers.Authorization = `Bearer ${token || auth}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    get: async <T = unknown, E = any>(url: string): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.get(url);
        return response.data;
    },
    post: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.post(url, data);
        return response.data;
    },
    put: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.put(url, data);
        return response.data;
    },
    delete: async <T = unknown, E = any>(url: string, data?: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.delete(url, { data });
        return response.data;
    },
    patch: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.patch(url, data);
        return response.data;
    },
};
