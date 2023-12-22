import { APIResponse } from '../common/types';

interface Asset {
    _id: string;

    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
}

export interface AssetSliceState extends Asset {
    status: string;
    error: string;
}

export interface AssetStorageReq {
    url: string;
    file: File;
    transactionId: string;
}

export interface UpdateAssetStepReq {}

export type UpdateAssetStepApiRes = APIResponse<string>;
