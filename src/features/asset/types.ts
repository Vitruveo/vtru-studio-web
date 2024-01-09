import { Licenses, MetadataDefinitionTypes, Option } from '@/app/home/components/wizard/types';
import { APIResponse } from '../common/types';

export interface Asset {
    _id: string;
    asset: {
        file: File | undefined;
        formats: {
            display: { file?: File; customFile?: File; transactionId?: string };
            exhibition: { file?: File; customFile?: File; transactionId?: string };
            preview: { file?: File; customFile?: File; transactionId?: string };
            print: { file?: File; customFile?: File; transactionId?: string };
        };
    };
    contract: boolean;
    assetMetadata: {
        assetMetadataDefinitions: MetadataDefinitionTypes[];
        assetMetadataDomains: Option[];
    };
    creatorMetadata: {
        creatorMetadataDefinitions: MetadataDefinitionTypes[];
    };
    licenses: Licenses;
    status: 'draft' | 'published' | 'archived';
    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
}

export interface AssetSliceState extends Asset {
    error: string;
}

export interface AssetStorageReq {
    url: string;
    file: File;
}

export interface UpdateAssetStepReq {}

export type UpdateAssetStepApiRes = APIResponse<string>;
export type GetAssetApiRes = APIResponse<Asset>;
