import { StepsFormValues } from '@/app/home/consignArtwork/types';
import { APIResponse, Framework } from '../common/types';
import { AccountSettingsFormValues } from '@/app/home/myProfile/types';
import { LicensesFormValues } from '@/app/home/consignArtwork/licenses/types';
import { ContractExplorer } from '../asset/types';

export interface Email {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

export interface Wallet {
    address: string;
    archived: boolean;
}

export interface Link {
    name: string;
    url: string;
}

export interface PersonalDetails {
    bio: string;
    ethnicity: string;
    gender: string;
    nationality: string;
    residence: string;
    plusCode: string;
}

export interface ArtworkType {
    type: 'assetRef' | 'upload';
    value: string;
    title: string;
}

export interface ArtworkRecognition {
    exhibitions: {
        name: string;
        url: string;
        artwork: ArtworkType;
    }[];
    awards: {
        name: string;
        url: string;
        artwork: ArtworkType;
    }[];
}

export interface Assets {
    _id: string;
    title: string;
    image: string;
    status: string;
    collections: string[];
    licenses: LicensesFormValues;
    mintExplorer?: MintExplorer;
    contractExplorer?: ContractExplorer;
    countComments: number;
}

export interface RequestUpload {
    transactionId: string;
    url?: string;
    path?: string;
    status: string;
    uploadProgress?: number;
}

export type SynapsStatus = 'SUBMISSION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'PENDING_VERIFICATION';
export interface SynapsStep {
    id: string;
    name: string;
    status: SynapsStatus;
}

export interface LevelItem {
    label: string;
    points: number;
    completed: boolean;
}

export interface LevelType {
    id: string;
    items: LevelItem[];
}

export interface TruLevel {
    currentLevel: number;
    totalPoints: number;
    extraPoints: number;
    levels: LevelType[];
}

export interface User {
    _id: string;
    name: string;
    notify: string;
    username: string;
    displayName?: string;
    login: {
        email: string;
    };
    synaps?: {
        sessionId: string;
        steps: SynapsStep[];
    };
    walletDefault: string;
    emailDefault: string;
    wallets: Wallet[];
    emails: Email[];
    requestsUpload?: { [key: string]: RequestUpload };
    personalDetails?: PersonalDetails;
    artworkRecognition?: ArtworkRecognition;
    links: Link[];
    myWebsite?: string;
    profile: {
        avatar: string | null;
        phone: string | null;
        language: string | null;
        location: string | null;
    };
    truLevel?: TruLevel;
    roles: Array<string>;
    framework: Framework;
    canConsignArtwork: boolean;
    vault: {
        isBlocked: boolean;
        transactionHash: string | null;
        createdAt: string | null;
        isLoading: boolean;
    };
    generalVault?: {
        isBlocked: boolean;
        transactionHash: string | null;
        createdAt: string | null;
        isLoading: boolean;
    };
    socials: {
        x: {
            name: string;
            avatar: string;
        };
        facebook: {
            name: string;
            avatar: string;
        };
        google: {
            name: string;
            avatar: string;
        };
    };
    assets: {
        data: Assets[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
        collection: string;
        licenseArtCards: number;
    };
    collections: { collection: string }[];
    currentPage: number;
    sort: string;
    autoStake: boolean;
    selectedAsset: string;
    licenses?: {
        artCards: number;
    };
}

export interface VaultProps {
    transactionHash: string;
    createdAt: string;
}

export interface UserSliceState extends User {
    requestAvatarUpload: RequestUpload;
    token: string;
    status: string;
    error: string;
}

export interface UserLoginReq {
    email: string;
}
export interface UserAddReq {
    name: string;
    email: string;
}

export interface UserAddRes {
    name: string;
    email: string;
}

export interface CreatorUsernameExistReq {
    username: string;
}

export interface CreatorEmailExistReq {
    email: string;
}

export interface AddCreatorEmailReq {
    email: string;
}

export interface CreatorSendRequestUploadReq {
    mimetype: string;
    requestsUpload?: boolean;
    originalName: string;
    transactionId?: string;
    origin?: string;
}

export interface GeneralStorageAvatarReq {
    transactionId?: string;
    url: string;
    file: File;
    path: string;
}

export interface GeneralStorageReq {
    transactionId: string;
    url: string;
    path: string;
}

export interface UserOTPConfirmReq {
    email: string;
    code: string;
}

export interface UserOTPConfirmRes {
    creator: User;
    token: string;
}

export interface SaveStepWizardReq {
    step: number;
    resetAvatar?: boolean;
    values: AccountSettingsFormValues;
}

export interface CreatorSchemaType {
    name: string;
    username?: string | undefined;
    displayName?: string | undefined;
    emailDefault: string;
    walletDefault: string;
    login: {
        loginHistory: Array<{
            ip: string;
            createdAt: Date;
        }>;
    };
    emails: Array<{
        email: string;
        codeHash: string | null;
        checkedAt: Date | null;
    }>;
    links: Link[];
    myWebsite: string;
    personalDetails: PersonalDetails;
    artworkRecognition: ArtworkRecognition;
    wallets: Array<{
        address: string;
    }>;
    profile: {
        avatar: string | null;
        phone: string | null;
        language: string | null;
        location: string | null;
    };
    roles: string[];
    framework: Framework;
}

export interface SendEmailCodeReq {
    email: string;
}

export interface VerifyCodeReq {
    email: string;
    code: string;
}

export interface ChangeAvatarReq {
    fileId: string;
    transactionId?: string;
}

export interface RequestDeleteAvatarReq {
    deleteKeys: string[];
    transactionId: string;
    origin?: string;
}

export type ChangeAvatarRes = string;

export interface ResquestConnectWalletReq {
    wallet: `0x${string}`;
}

export interface RemoveSocialReq {
    social: string;
}

export interface RequestMyAssetThunkReq {
    limit?: number;
    page: number;
    status: string;
    collection: string;
    sort: string;
}

export interface ResquestConnectWalletRes {
    nonce: string;
}

export interface VerifyConnectWalletReq {
    signature: string;
    wallet: string;
}

export interface RequestConnectWalletRes {
    signature: string;
}

export interface GeneralStorageReq {
    transactionId: string;
    url: string;
    file: File;
    dispatch?: any;
}
export interface SessionInitRes {
    session_id: string;
}

export interface StepRes {
    id: string;
    type: 'LIVENESS' | 'ID_DOCUMENT' | 'PROOF_OF_ADDRESS' | 'PHONE';
    status: SynapsStatus;
}

export interface SynapsIndividualSessionRes {
    app: {
        name: string;
        id: string;
    };
    session: {
        id: string;
        alias: string;
        status: SynapsStatus;
        sandbox: boolean;
        steps: StepRes[];
    };
}

export type RemoveSocialApiRes = APIResponse;
export type SocialsXApiRes = APIResponse<string>;
export type SocialsFacebookApiRes = APIResponse<string>;
export type SocialsGoogleApiRes = APIResponse<string>;
export type UserAddApiRes = APIResponse<UserAddRes>;
export type UserLoginApiRes = APIResponse<string>;
export type UserOTPConfirmApiRes = APIResponse<UserOTPConfirmRes>;
export type CreatorUsernameExistApiRes = APIResponse<boolean>;
export type CreatorEmailExistApiRes = APIResponse<boolean>;
export type AddCreatorEmailApiRes = APIResponse<boolean>;
export type CreatorSendRequestUploadApiRes = APIResponse<string>;
export type SendEmailCodeApiRes = APIResponse<string>;
export type VerifyCodeApiRes = APIResponse<User>;
export type ChangeAvatarApiRes = APIResponse<ChangeAvatarRes>;
export type RequestConnectWalletApiRes = APIResponse<ResquestConnectWalletRes>;
export type VerifyConnectWalletApiRes = APIResponse;
export type SynapsSessionInitApiRes = APIResponse<SessionInitRes>;
export type SynapsIndividualSessionApiRes = APIResponse<SynapsIndividualSessionRes>;
export type GetTruLevelApiRes = APIResponse<TruLevel>;

export interface MintExplorer {
    transactionHash: string;
    explorerUrl: string | null;
    address: string | null;
    createdAt: string | null;
}
