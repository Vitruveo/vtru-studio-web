import { APIResponse } from '../common/types';

export interface FeatureType {
    name: string;
    released: boolean;
    onlyForAllowList: boolean;
}

export interface FeaturesState {
    isEmailAllowed: boolean;
    list: FeatureType[];
}

export type GetFeaturesApiRes = APIResponse<FeatureType[]>;
