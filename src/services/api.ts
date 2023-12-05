import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../features/common/types';
import { store } from '../store';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
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

const apiService = {
    get: async <T = unknown, E = unknown>(
        url: string
    ): Promise<APIResponse<T, E>> => {
        try {
            const response: AxiosResponse = await api.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    post: async <T = unknown, E = unknown>(
        url: string,
        data: unknown
    ): Promise<APIResponse<T, E>> => {
        try {
            const response: AxiosResponse = await api.post(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    put: async <T = unknown, E = unknown>(
        url: string,
        data: unknown
    ): Promise<APIResponse<T, E>> => {
        try {
            const response: AxiosResponse = await api.put(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    delete: async <T = unknown, E = unknown>(
        url: string
    ): Promise<APIResponse<T, E>> => {
        try {
            const response: AxiosResponse = await api.delete(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default apiService;
