import { apiService } from '@/services/api';
import { FeatureType, GetFeaturesApiRes } from './types';

export async function getFeatures(): Promise<GetFeaturesApiRes> {
    const response = await apiService.get<FeatureType[]>('/features');

    return response;
}
