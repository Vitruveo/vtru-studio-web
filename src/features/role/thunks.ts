import { createAppAsyncThunk } from "@/store/asyncThunk";
import { findManyRoles, createRole, updateRole } from "./requests";
import { RoleApiRes, RoleReq, RoleRes } from "./types";

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

export const roleCreateThunk = createAppAsyncThunk<RoleApiRes, RoleReq>(
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

export const roleUpdateThunk = createAppAsyncThunk<RoleApiRes, RoleReq>(
  "roles/update",
  async ({ name, description, permissions }, { rejectWithValue, getState }) => {
    try {
      const response = await updateRole({ name, description, permissions });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
