import axios, { AxiosResponse } from 'axios';
import { apiService } from '@/services/api';
import {
    AddCreatorEmailApiRes,
    GeneralStorageAvatarReq,
    ChangeAvatarApiRes,
    ChangeAvatarReq,
    ChangeAvatarRes,
    CreatorEmailExistApiRes,
    CreatorEmailExistReq,
    CreatorSchemaType,
    CreatorSendRequestUploadApiRes,
    CreatorSendRequestUploadReq,
    CreatorUsernameExistApiRes,
    CreatorUsernameExistReq,
    SendEmailCodeApiRes,
    SendEmailCodeReq,
    User,
    UserAddApiRes,
    UserAddReq,
    UserAddRes,
    UserLoginApiRes,
    UserLoginReq,
    UserOTPConfirmApiRes,
    UserOTPConfirmReq,
    UserOTPConfirmRes,
    VerifyCodeApiRes,
    VerifyCodeReq,
    RequestDeleteAvatarReq,
    ResquestConnectWalletReq,
    VerifyConnectWalletReq,
    RequestConnectWalletApiRes,
    VerifyConnectWalletApiRes,
    SocialsXApiRes,
    SocialsGoogleApiRes,
    SocialsFacebookApiRes,
    RemoveSocialApiRes,
    RemoveSocialReq,
} from './types';
import { Framework } from '../common/types';
import { BASE_URL_BATCH } from '@/constants/api';

export async function userLoginReq(data: UserLoginReq): Promise<UserLoginApiRes> {
    const res = await apiService.post<string>(`/creators/login`, data);
    return res;
}

export async function userAddReq(data: UserAddReq): Promise<UserAddApiRes> {
    const response = await apiService.put<UserAddRes>(`/users`, data);
    return response;
}

export async function userOTPConfimReq(data: UserOTPConfirmReq): Promise<UserOTPConfirmApiRes> {
    const res = apiService.post<UserOTPConfirmRes>(`/creators/login/otpConfirm`, data);
    return res;
}

export async function checkCreatorUsernameExist(data: CreatorUsernameExistReq): Promise<CreatorUsernameExistApiRes> {
    const res = apiService.get<boolean>(`/creators/${data.username}/username`);
    return res;
}

export async function checkCreatorEmailExist(data: CreatorEmailExistReq): Promise<CreatorEmailExistApiRes> {
    const res = apiService.get<boolean>(`/creators/${data.email}/email`);
    return res;
}

export async function addCreatorEmailExist(data: {
    email: string;
    id: string;
    framework: Framework;
}): Promise<AddCreatorEmailApiRes> {
    const res = apiService.post<boolean>(`/creators/${data.id}/email`, {
        email: data.email,
        framework: data.framework,
    });
    return res;
}

export async function sendEmailCode(data: SendEmailCodeReq): Promise<SendEmailCodeApiRes> {
    const res = apiService.post<string>(`/creators/${data.email}/email/sendCode`, {});
    return res;
}

export async function verifyCode(data: VerifyCodeReq): Promise<VerifyCodeApiRes> {
    const res = apiService.post<User>(`/creators/${data.email}/email/verifyCode`, { code: data.code });
    return res;
}

export async function changeCreator({
    data,
    userId,
}: {
    data: Partial<CreatorSchemaType>;
    userId: string;
}): Promise<AddCreatorEmailApiRes> {
    const res = apiService.put<boolean>(`/creators/${userId}`, data);
    return res;
}

export async function sendRequestUpload(data: CreatorSendRequestUploadReq): Promise<CreatorSendRequestUploadApiRes> {
    const res = apiService.post<string>('/creators/request/upload', data);
    return res;
}

export async function changeAvatar(data: ChangeAvatarReq): Promise<ChangeAvatarApiRes> {
    const res = apiService.put<ChangeAvatarRes>(`/creators/profile/avatar`, data);
    return res;
}

export async function deleteAvatar(url: string): Promise<any> {
    const res = await fetch(url, {
        method: 'DELETE',
    });
    return res;
}

export async function generalStorage(data: GeneralStorageAvatarReq): Promise<any> {
    const res = await fetch(data.url, {
        method: 'PUT',
        body: data.file,
    });

    return res;
}

export async function requestDeleteAvatar(data: RequestDeleteAvatarReq): Promise<any> {
    const res = await apiService.delete('/creators/request/deleteFile', data);
    return res;
}

export async function requestConnectWallet(data: ResquestConnectWalletReq): Promise<RequestConnectWalletApiRes> {
    return apiService.post('/creators/connect/request', data);
}

export async function verifyConnectWallet(data: VerifyConnectWalletReq): Promise<VerifyConnectWalletApiRes> {
    return apiService.post(`/creators/connect/verify`, data);
}

export function requestSocialX(): Promise<SocialsXApiRes> {
    return apiService.get('/creators/socials/x/auth');
}

export function requestSocialGoogle(): Promise<SocialsGoogleApiRes> {
    return apiService.get('/creators/socials/google/auth');
}

export function requestSocialFacebook(): Promise<SocialsFacebookApiRes> {
    return apiService.get('/creators/socials/facebook/auth');
}

export function removeSocial({ social }: RemoveSocialReq): Promise<RemoveSocialApiRes> {
    return apiService.delete(`/creators/socials/${social}`);
}

export async function getWalletsVault(payload: { id: string }) {
    return axios.get(`${BASE_URL_BATCH}/wallet/vaultWallets/${payload.id}`);
}

export async function addWallet(payload: { id: string; address: string }) {
    return axios.post(`${BASE_URL_BATCH}/wallet/addVaultWallet`, payload);
}

export async function deleteWallet(payload: { id: string; address: string }) {
    return axios.delete(`${BASE_URL_BATCH}/wallet/removeVaultWallet`, { data: payload });
}
