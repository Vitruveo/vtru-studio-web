import { apiService } from '@/services/api';
import { Collections, Names, ResponseAssets, Subject, Tags } from './types';

export async function getArtworkTags(): Promise<Tags[]> {
    const URL_ASSETS_SEARCH = '/assets/public/search';
    const response = await apiService.post<ResponseAssets>(URL_ASSETS_SEARCH, {});
    return response.data?.tags || [];
}

export async function getArtworkCollections(collection: string): Promise<Collections[]> {
    const URL_ASSETS_COLLECTION = `/assets/public/collections?name=${collection}`;
    const response = await apiService.get<Collections[]>(URL_ASSETS_COLLECTION);
    return response.data || [];
}

export async function getArtworkSubject(subject: string): Promise<Subject[]> {
    const URL_ASSETS_SUBJECT = `/assets/public/subjects?name=${subject}`;
    const response = await apiService.get<Subject[]>(URL_ASSETS_SUBJECT);
    return response.data || [];
}

export async function getArtworkCreatorName(name: string): Promise<Names[]> {
    const URL_ASSETS_NAME = `/assets/public/creators?name=${name}`;
    const response = await apiService.get<Names[]>(URL_ASSETS_NAME);
    return response.data || [];
}
