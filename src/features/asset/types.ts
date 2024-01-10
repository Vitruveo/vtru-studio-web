import { AssetMetadata } from '@/app/home/consignArtwork/assetMetadata/types';
import { License } from '@/app/home/consignArtwork/licenses/types';
import { APIResponse } from '../common/types';

export type AssetStatus = 'draft' | 'published' | 'archived';
export interface Asset {
    _id: string;
    asset: {
        formats: {
            original: { file?: File; customFile?: File; transactionId?: string };
            display: { file?: File; customFile?: File; transactionId?: string };
            exhibition: { file?: File; customFile?: File; transactionId?: string };
            preview: { file?: File; customFile?: File; transactionId?: string };
            print: { file?: File; customFile?: File; transactionId?: string };
        };
    };
    contract: boolean;
    assetMetadata: AssetMetadata;
    // creatorMetadata: {
    //     creatorMetadataDefinitions: MetadataDefinitionTypes[];
    // };
    licenses: License[];
    status: AssetStatus;
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
