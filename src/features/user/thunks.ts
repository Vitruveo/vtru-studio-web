import { createAppAsyncThunk } from "@/store/asyncThunk";
import { userAuthReq } from "./requests";
import { UserAuthApiRes, UserAuthReq } from "./types";

export const userAuthThunk = createAppAsyncThunk<UserAuthApiRes, UserAuthReq>(
  "user/auth",
  async ({ email }, { rejectWithValue, getState }) => {
    try {
      const response = await userAuthReq({ email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
