import { APIResponse } from '../common/types';

export interface FeatureType {
    name: string;
    released?: boolean;
    isOnlyFor?: boolean;
    isEmailInList?: boolean;
    onlyFor?: 'allowList' | 'specificUsers';
}

export interface FeaturesState {
    isEmailAllowed: boolean;
    list: FeatureType[];
}

export interface GetFeatures extends FeatureType {
    emails?: string[];
}

export type GetFeaturesApiRes = APIResponse<GetFeatures[]>;
