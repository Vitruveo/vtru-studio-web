import { apiService } from '../../services/api';
import {
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
