import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { APIResponse } from '../common/types';
import { SectionsFormData } from '@/app/home/consignArtwork/assetMetadata/page';
import { OriginalFormatMedia } from '@/app/home/consignArtwork/assetMedia/types';
import { ConsignArtworkAssetStatus } from '../consignArtwork/types';

export type AssetStatus = 'draft' | 'published' | 'archived' | 'preview' | '';

export type FileType = File | string;

interface Format {
    size?: number;
    load?: boolean;
    path?: string;
    file?: FileType;
    name?: string;
    customFile?: FileType;
    transactionId?: string;
    validation?: {
        isValid: boolean;
        message: string;
    };
}

export interface RequestAssetUpload {
    transactionId: string;
    url: string;
    path: string;
    status: string;
    uploadProgress: number;
}

export interface ContractExplorer {
    finishedAt: Date | null;
    assetId: number;
    assetRefId: number;
    creatorRefId: number;
    explorer: string;
    tx: string;
}

export interface Ipfs {
    original: string;
    display: string;
    exhibition: string;
    preview: string;
    print: string;
    arImage: string;
    arVideo: string;
    btsImage: string;
    btsVideo: string;
    codeZip: string;
    finishedAt: Date;
}

export interface c2pa {
    finishedAt: Date;
}

export type ConsignArtworkSteps = 'c2pa' | 'ipfs' | 'contractExplorer';

export interface Asset {
    _id: string;
    tempColors: number[][];
    isLoading: boolean;
    mediaAuxiliary: {
        description: string;
        formats: {
            arImage: Format;
            arVideo: Format;
            btsImage: Format;
            btsVideo: Format;
            codeZip: Format;
        };
    };
    formats: {
        original: OriginalFormatMedia;
        display: Format;
        exhibition: Format;
        preview: Format;
        print?: Format;
    };
    terms: {
        isOriginal: boolean;
        generatedArtworkAI: boolean;
        notMintedOtherBlockchain: boolean;
        contract: boolean;
    };
    assetMetadata?: {
        isCompleted?: boolean;
    } & SectionsFormData;
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
    consignArtwork?: AssetConsignArtwork;
    c2pa?: c2pa;
    contractExplorer?: ContractExplorer;
    ipfs?: Ipfs;
    comments?: Comments[];
}

export interface Comments {
    id: string;
    comment: string;
    when: string;
    isPublic: boolean;
}

export interface AssetConsignArtwork {
    artworkListing?: string;
    creatorWallet?: string;
    creatorCredits?: number;
    creatorContract?: string;
    status: ConsignArtworkAssetStatus;
}

export interface HistoryItems {
    status: string;
    message: string;
    when: string;
}

export interface AssetSendRequestUploadReq {
    id: string;
    mimetype: string;
    originalName: string;
    transactionId: string;
    metadata: {
        [key: string]: string | undefined;
    };
}

export interface Consign {
    transaction: string;
    status: string;
    message: string;
    when: string;
    steps: {
        check: string | null;
        c2pa: string | null;
        ipfs: string | null;
        contractExplorer: string | null;
    };
}

export interface AssetSliceState extends Asset {
    error: string;
    validateConsign: {
        status: 'success' | 'error' | 'loading' | '';
        message?: string;
    };
    consign: Consign;
}

export interface AssetStorageReq {
    transactionId: string;
    url: string;
    file: File;
    dispatch: any;
}

export interface RequestDeleteFilesReq {
    deleteKeys: string[];
    transactionId: string;
    assetId: string;
}

export interface UpdateAssetStepReq {
    id: string;
    [key: string]: any;
}

export interface SigningMediaC2PAReq {
    filename: string;
    creator: string;
    token: string;
}

export interface UploadIPFSByAssetIdReq {
    id: string;
}

export interface UploadIPFSByAssetIdRes {
    [key: string]: string;
}

export interface CreateContractByAssetIdReq {
    id: string;
}

export interface ValidateUploadedMediaReq {
    media: string;
    path: string;
    orientation: string;
}

export type UpdateAssetStepApiRes = APIResponse<string>;
export type UploadIPFSByAssetIdApiRes = void;
export type CreateContractApiRes = void;
export type GetAssetApiRes = APIResponse<Asset>;
export type CreateAssetApiRes = APIResponse<{
    insertedId: string;
}>;
export type GetAssetsApiRes = APIResponse<Asset[]>;
export type AssetSendRequestUploadApiRes = APIResponse<string>;
