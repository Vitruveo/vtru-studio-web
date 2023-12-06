import { APIResponse } from '../common/types';

export interface UserSliceState {
  token: string;
  name: string;
  email: string;
  status: '' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

export interface UserAuthReq {
  email: string;
}

export interface UserAuthRes {
  token: string;
  name: string;
  email: string;
}

export interface UserAddReq {
  name: string;
  email: string;
}

export interface UserAddRes {
  id: string;
  name: string;
  email: string;
}

export type UserAddApiRes = APIResponse<UserAddRes>;
export type UserAuthApiRes = APIResponse<UserAuthRes>;
