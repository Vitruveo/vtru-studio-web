import { StepsFormValues } from '@/app/home/components/wizard/types';
import { APIResponse } from '../common/types';

interface Email {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

interface User {
    _id: string;
    name: string;
    username: string;
    login: {
        email: string;
    };
    wallets: {
        address: string;
        network: {
            name: string;
            chainId: number;
        };
    }[];
    emails: Email[];
    profile: {
        avatar: string | null;
        phone: string | null;
        language: string | null;
        location: string | null;
    };
    roles: Array<string>;
    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
}

interface RequestAssetUpload {
    transactionId: string;
    url: string;
}
export interface UserSliceState extends User {
    requestAssetUpload: RequestAssetUpload[];
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
    id: string;
    email: string;
}

export interface CreatorSendRequestUploadReq {
    mimetype: string;
    originalName: string;
}

export interface AssetStorageReq {
    url: string;
    file: File;
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
    values: StepsFormValues;
}

export interface CreatorSchemaType {
    name: string;
    username?: string | undefined;
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
    wallets: Array<{
        address: string;
        network: {
            name: string;
            chainId: number;
        };
    }>;
    profile: {
        avatar: string | null;
        phone: string | null;
        language: string | null;
        location: string | null;
    };
    roles: string[];
    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
}

interface CreatorUsernameExistRes {
    code: string;
    message: string;
    data: boolean;
}

export type UserAddApiRes = APIResponse<UserAddRes>;
export type UserLoginApiRes = APIResponse<string>;
export type UserOTPConfirmApiRes = APIResponse<UserOTPConfirmRes>;
export type CreatorUsernameExistApiRes = APIResponse<boolean>;
export type CreatorEmailExistApiRes = APIResponse<boolean>;
export type AddCreatorEmailApiRes = APIResponse<boolean>;
export type CreatorSendRequestUploadApiRes = APIResponse<string>;
