import axios from 'axios';
import { apiService } from '@/services/api';
import {
    AddCreatorEmailApiRes,
    AddCreatorEmailReq,
    AssetStorageReq,
    CreatorEmailExistApiRes,
    CreatorEmailExistReq,
    CreatorSendRequestUploadApiRes,
    CreatorSendRequestUploadReq,
    CreatorUsernameExistApiRes,
    CreatorUsernameExistReq,
    UserAddApiRes,
    UserAddReq,
    UserAddRes,
    UserLoginApiRes,
    UserLoginReq,
    UserOTPConfirmApiRes,
    UserOTPConfirmReq,
    UserOTPConfirmRes,
} from './types';

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

export async function addCreatorEmailExist(data: AddCreatorEmailReq): Promise<AddCreatorEmailApiRes> {
    const res = apiService.post<boolean>(`/creators/${data.id}/email`, { email: data.email });
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
    const res = axios.put(data.url, formData, {
        onUploadProgress: (progressEvent) => {
            console.log('Upload progress: ', Math.round((progressEvent.loaded / progressEvent.total!) * 100));
        },
    });

    return res;
}
