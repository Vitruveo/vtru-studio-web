import { Licenses, MetadataDefinitionTypes, Option } from '@/app/home/components/wizard/types';
import { APIResponse } from '../common/types';

export interface Asset {
    _id: string;
    contract: boolean;
    assetMetadata: {
        assetMetadataDefinitions: MetadataDefinitionTypes[];
        assetMetadataDomains: Option[];
    };
    creatorMetadata: {
        creatorMetadataDefinitions: MetadataDefinitionTypes[];
    };
    licenses: Licenses;
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
}

export interface UpdateAssetStepReq {}

export type UpdateAssetStepApiRes = APIResponse<string>;
export type GetAssetApiRes = APIResponse<Asset>;
