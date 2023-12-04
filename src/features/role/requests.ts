import { apiService } from "@/app/services/api";
import { RoleRes, RoleReq, RoleApiRes } from "./types";

export async function findManyRoles(): Promise<RoleRes[]> {
  const response: RoleRes[] = [];

  return response;
}

export function findOneRole(id: string): Promise<RoleRes> {
  const req: any = {};
  return req;
}

export async function createRole(data: RoleReq): Promise<RoleApiRes> {
  const response = await apiService.post<RoleRes>("/roles", data);

  return response;
}

export function updateRole(data: RoleReq): Promise<RoleApiRes> {
  const req: any = {};
  return req;
}

export function deleteRole(data: RoleReq): Promise<RoleRes> {
  const req: any = {};
  return req;
}
