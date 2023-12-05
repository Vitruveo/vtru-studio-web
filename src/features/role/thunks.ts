import { createAppAsyncThunk } from "@/store/asyncThunk";
import { findManyRoles, createRole, updateRole, deleteRole } from "./requests";
import {
  RoleApiRes,
  RoleApiResCreate,
  RoleReq,
  RoleReqDelete,
  RoleReqUpdate,
  RoleRes,
} from "./types";

export const roleFindManyThunk = createAppAsyncThunk<RoleRes[]>(
  "roles/findmany",
  async ({ rejectWithValue, getState }) => {
    try {
      const response = await findManyRoles();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const roleCreateThunk = createAppAsyncThunk<RoleApiResCreate, RoleReq>(
  "roles/create",
  async ({ name, description, permissions }, { rejectWithValue, getState }) => {
    try {
      const response = await createRole({ name, description, permissions });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const roleUpdateThunk = createAppAsyncThunk<RoleApiRes, RoleReqUpdate>(
  "roles/update",
  async (
    { _id, name, description, permissions },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await updateRole(_id, {
        name,
        description,
        permissions,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const roleDeleteThunk = createAppAsyncThunk<RoleApiRes, RoleReqDelete>(
  "roles/delete",
  async ({ _id }, { rejectWithValue, getState }) => {
    try {
      const response = await deleteRole(_id);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
