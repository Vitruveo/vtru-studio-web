import { AssetMetadata } from '@/app/home/consignArtwork/assetMetadata/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { APIResponse } from '../common/types';
import { SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';

export type AssetStatus = 'draft' | 'published' | 'archived';

export type FileType = File | string;

interface Format {
    file?: FileType;
    name?: string;
    customFile?: FileType;
    transactionId?: string;
}

export interface RequestAssetUpload {
    transactionId: string;
    url: string;
    path: string;
    status: string;
    uploadProgress: number;
}
export interface Asset {
    _id: string;
    mediaAuxiliary: {
        formats: {
            arImage: Format;
            arVideo: Format;
            btsImage: Format;
            btsVideo: Format;
            codeZip: Format;
        };
    };
    formats: {
        original: Format;
        display: Format;
        exhibition: Format;
        preview: Format;
        print: Format;
    };
    isOriginal: boolean;
    generatedArtworkAI: boolean;
    notMintedOtherBlockchain: boolean;
    contract: boolean;
    assetMetadata?: SectionsFormData;
    requestAssetUpload: { [key: string]: RequestAssetUpload };
    // creatorMetadata: {
    //     creatorMetadataDefinitions: MetadataDefinitionTypes[];
    // };
    licenses?: LicensesFormValues;
    status: AssetStatus;
    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
}

export interface AssetSendRequestUploadReq {
    mimetype: string;
    originalName: string;
    transactionId: string;
}

export interface AssetSliceState extends Asset {
    error: string;
}

export interface AssetStorageReq {
    transactionId: string;
    url: string;
    file: File;
    dispatch: any;
}

export interface RequestDeleteURLReq {
    path: string;
    transactionId: string;
}

export interface UpdateAssetStepReq {}

export type UpdateAssetStepApiRes = APIResponse<string>;
export type GetAssetApiRes = APIResponse<Asset>;
export type AssetSendRequestUploadApiRes = APIResponse<string>;
