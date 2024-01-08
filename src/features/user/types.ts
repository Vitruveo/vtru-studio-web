import { StepsFormValues } from '@/app/home/components/wizard/types';
import { APIResponse, Framework } from '../common/types';
import { AccountSettingsFormValues } from '@/app/home/myProfile/types';

export interface Email {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

export interface Wallet {
    address: string;
}

export interface User {
    _id: string;
    name: string;
    username: string;
    login: {
        email: string;
    };
    wallets: Wallet[];
    emails: Email[];
    profile: {
        avatar: string | null;
        phone: string | null;
        language: string | null;
        location: string | null;
    };
    roles: Array<string>;
    framework: Framework;
}

interface RequestAssetUpload {
    transactionId: string;
    url: string;
    path: string;
    status: string;
}
export interface UserSliceState extends User {
    requestAssetUpload: { [key: string]: RequestAssetUpload };
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
    originalName: string;
    transactionId: string;
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
    values: StepsFormValues | AccountSettingsFormValues;
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

export type UserAddApiRes = APIResponse<UserAddRes>;
export type UserLoginApiRes = APIResponse<string>;
export type UserOTPConfirmApiRes = APIResponse<UserOTPConfirmRes>;
export type CreatorUsernameExistApiRes = APIResponse<boolean>;
export type CreatorEmailExistApiRes = APIResponse<boolean>;
export type AddCreatorEmailApiRes = APIResponse<boolean>;
export type CreatorSendRequestUploadApiRes = APIResponse<string>;
export type SendEmailCodeApiRes = APIResponse<string>;
export type VerifyCodeApiRes = APIResponse<User>;
