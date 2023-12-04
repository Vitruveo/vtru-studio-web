import { APIResponse } from "../common/types";

export interface RoleSliceState {
  name: string;
  description: string;
  permissions: string[];
  status: "" | "loading" | "succeeded" | "failed";
  error: string;
}

export interface RoleReq {
  name: string;
  description: string;
  permissions: string[];
}

export interface RoleRes {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  framework: object;
}

export type RoleApiRes = APIResponse<RoleRes>;
