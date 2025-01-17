import { apiService } from '@/services/api';
import { CheckFeaturesEmailApiRes, FeatureType, GetFeaturesApiRes } from './types';

export async function getFeatures(): Promise<GetFeaturesApiRes> {
    const response = await apiService.get<FeatureType[]>('/features');

    return response;
}

export async function checkFeaturesEmail({ email }: { email: string }): Promise<CheckFeaturesEmailApiRes> {
    const response = await apiService.get<string[]>(`/features/check/${email}`);

    return response;
}
