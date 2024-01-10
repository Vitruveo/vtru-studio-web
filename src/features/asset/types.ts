import { AssetMetadata } from '@/app/home/consignArtwork/assetMetadata/types';
import { License } from '@/app/home/consignArtwork/licenses/types';
import { APIResponse } from '../common/types';

export type AssetStatus = 'draft' | 'published' | 'archived';

export type FileType = File | string;

interface Format {
    file?: FileType;
    name?: string;
    customFile?: FileType;
    transactionId?: string;
}
export interface Asset {
    _id: string;

    formats: {
        original: Format;
        display: Format;
        exhibition: Format;
        preview: Format;
        print: Format;
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
