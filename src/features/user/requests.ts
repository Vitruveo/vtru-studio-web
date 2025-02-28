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
    GeneralStorageReq,
    SynapsSessionInitApiRes,
    SynapsIndividualSessionApiRes,
    GetTruLevelApiRes,
} from './types';
import { Framework } from '../common/types';
import { api3Service } from '@/services/api3';
import { userActionsCreators } from './slice';

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

export async function generalStorageAvatar(data: GeneralStorageAvatarReq): Promise<any> {
    const res = await fetch(data.url, {
        method: 'PUT',
        body: data.file,
    });

    return res;
}

export async function generalStorage({ file, url, dispatch, transactionId }: GeneralStorageReq): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                dispatch(
                    userActionsCreators.requestsUpload({
                        transactionId,
                        status: 'uploading',
                        uploadProgress: percentCompleted,
                    })
                );
            }
        };

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        xhr.send(file);
    });
}

export async function requestDeleteFile(data: RequestDeleteAvatarReq): Promise<any> {
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

export async function getWalletsVault() {
    return api3Service.get<string[]>(`/wallet/vaultWallets`);
}

export async function addWallets(payload: { walletsAddress: string[] }) {
    return api3Service.post(`/wallet/addVaultWallets`, payload);
}

export async function deleteWallets(payload: { walletsAddress: string[] }) {
    return api3Service.delete(`/wallet/removeVaultWallets`, { data: payload });
}

export async function me() {
    return apiService.get('/creators/me');
}

export async function synapsSessionInit(): Promise<SynapsSessionInitApiRes> {
    return apiService.post('/creators/synaps/session/init', {});
}

export async function synapsIndividualSession(): Promise<SynapsIndividualSessionApiRes> {
    return apiService.post(`/creators/synaps/individual/session`, {});
}

export async function getTruLevel(): Promise<GetTruLevelApiRes> {
    return apiService.get('/creators/truLevel');
}

export async function putAutoStake(autoStake: boolean) {
    return apiService.put('/creators/autoStake', { autoStake });
}
