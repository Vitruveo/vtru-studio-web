import axios from 'axios';
import FormData from 'form-data';
import { apiService } from '@/services/api';
import {
    AddCreatorEmailApiRes,
    AddCreatorEmailReq,
    AssetStorageReq,
    CreatorEmailExistApiRes,
    CreatorEmailExistReq,
    CreatorSchemaType,
    CreatorSendRequestUploadApiRes,
    CreatorSendRequestUploadReq,
    CreatorUsernameExistApiRes,
    CreatorUsernameExistReq,
    SendEmailCodeApiRes,
    SendEmailCodeReq,
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
    VerifyCodeRes,
} from './types';
import { Framework } from '../common/types';

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
    const res = apiService.post<VerifyCodeRes>(`/creators/${data.email}/email/verifyCode`, { code: data.code });
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

export async function sendRequestUploadExist(
    data: CreatorSendRequestUploadReq
): Promise<CreatorSendRequestUploadApiRes> {
    const res = apiService.post<string>('/creators/request/upload', data);
    return res;
}

export async function assetStorage(data: AssetStorageReq): Promise<any> {
    const formData = new FormData();
    formData.append('file', data.file);

    const res = await axios.put(data.url, formData, {
        headers: formData.getHeaders(),
        onUploadProgress: (progressEvent) => {
            console.log(Math.round((progressEvent.loaded / progressEvent.total!) * 100));
        },
    });

    return res;
}
