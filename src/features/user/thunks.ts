import { createAppAsyncThunk } from "@/store";
import { userAuthReq } from "./requests";
import { UserAuthApiRes, UserAuthReq } from "./types";

export const userAuthThunk = createAppAsyncThunk<UserAuthApiRes, UserAuthReq>(
  "user/auth",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await userAuthReq({ email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
