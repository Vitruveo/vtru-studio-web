import { createAppAsyncThunk } from "@/store/asyncThunk";
import { createRole, updateRole } from "./requests";
import { RoleApiRes, RoleReq } from "./types";

export const roleCreateThunk = createAppAsyncThunk<RoleApiRes, RoleReq>(
  "roles",
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
  "roles",
  async ({ name, description, permissions }, { rejectWithValue, getState }) => {
    try {
      const response = await updateRole({ name, description, permissions });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
