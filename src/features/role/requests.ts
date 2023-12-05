import { apiService } from '@/app/services/api';
import { RoleApiRes, RoleReq, RoleRes } from './types';

export async function findManyRoles(): Promise<RoleRes[]> {
    const response: RoleRes[] = [];

    return response;
}

export function findOneRole(id: string): Promise<RoleRes> {
    const req: any = {};
    return req;
}

export async function createRole(data: RoleReq): Promise<RoleApiRes> {
    const response = await apiService.post<RoleRes>('/roles', data);

    return response;
}

export async function updateRole(
  id: string,
  data: RoleReq
): Promise<RoleApiRes> {
  const response = await apiService.put<RoleRes>(`/roles/${id}`, data);

  return response;
}

export async function deleteRole(id: string): Promise<boolean> {
  await apiService.delete(`/roles/${id}`);
  return true;
}
