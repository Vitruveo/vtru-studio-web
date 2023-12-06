import apiService from '@/services/api';
import { UserAddApiRes, UserAddReq, UserAddRes, UserAuthApiRes, UserAuthReq } from './types';

export function userAuthReq({ email }: UserAuthReq): Promise<UserAuthApiRes> {
  const req: any = {};
  return req;
}

export async function userAddReq(data: UserAddReq): Promise<UserAddApiRes> {
  const response = await apiService.put<UserAddRes>(`/users`, data);
  return response;
}
