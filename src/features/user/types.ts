import { APIResponse } from '../common/types';

interface User {
  _id: string;
  name: string;
  login: {
    email: string;
  };
  profile: {
    avatar: string | null;
    phone: string | null;
    language: string | null;
    location: string | null;
  };
  roles: Array<string>;
}
export interface UserSliceState extends User {
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

export interface UserOTPConfirmReq {
  email: string;
  code: string;
}

export interface UserOTPConfirmRes {
  user: User;
  token: string;
}

export type UserAddApiRes = APIResponse<UserAddRes>;
export type UserLoginApiRes = APIResponse<string>;
export type UserOTPConfirmApiRes = APIResponse<UserOTPConfirmRes>;
