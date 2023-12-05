import { APIResponse } from "../common/types";

export interface RoleSliceState {
  name: string;
  description: string;
  permissions: string[];
  byId: { [key: string]: RoleRes };
  status: "" | "loading" | "succeeded" | "failed";
  error: string;
}

export interface RoleReq {
  _id?: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface RoleReqUpdate {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface RoleReqDelete {
  _id: string;
}

export interface RoleRes {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  framework: object;
}

export type RoleApiRes = APIResponse<RoleRes>;
export type RoleApiResDelete = APIResponse<{ ok: boolean }>;
export type RoleApiResCreate = APIResponse<{
  acknowledged: boolean;
  insertedId: string;
}>;
