import { StoresVisibilityStatus } from '../asset/types';

export interface APIResponse<T = unknown, E = unknown> {
    code: string;
    transaction: string;
    message: string;
    data?: T;
    args?: E;
}

export interface Framework {
    createdAt: Date | null;
    updatedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
}

export interface StoresVisibility {
    visibility: StoresVisibilityStatus;
    list: string[];
}
export interface UpdatedAssetStoresVisibilityReq {
    assetId: string;
    stores: StoresVisibility;
}
