import { apiService } from '../../services/api';
import {
  AddCreatorEmailApiRes,
  AddCreatorEmailReq,
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
  const res = apiService.get<boolean>(`/creators/${data.username}/username/exist`);
  return res;
}

export async function checkCreatorEmailExist(data: CreatorEmailExistReq): Promise<CreatorEmailExistApiRes> {
  const res = apiService.get<boolean>(`/creators/${data.email}/email/exist`);
  return res;
}

export async function addCreatorEmailExist(data: AddCreatorEmailReq): Promise<AddCreatorEmailApiRes> {
  const res = apiService.post<boolean>(`/creators/${data.id}/email/add`, { email: data.email });
  return res;
}

export async function sendRequestUploadExist(
  data: CreatorSendRequestUploadReq,
): Promise<CreatorSendRequestUploadApiRes> {
  const res = apiService.post<string>('/creators/request/upload', data);
  return res;
}
