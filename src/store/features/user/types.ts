import { APIResponse } from "../common/types";

export interface UserSliceState {
  token: string;
  name;
  email;
  status: "loading" | "succeeded" | "failed";
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

export type UserAuthApiRes = APIResponse<UserAuthDataRes>;
