import { apiService } from '@/services/api';
import { ResponseAssets, Tags } from './types';

export async function getArtworkTags(): Promise<Tags[]> {
    const URL_ASSETS_SEARCH = '/assets/public/search';
    const response = await apiService.post<ResponseAssets>(URL_ASSETS_SEARCH, {});
    return response.data?.tags || [];
}
