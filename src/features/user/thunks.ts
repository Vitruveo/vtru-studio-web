// import { createAppAsyncThunk } from "@/store/asyncThunk";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAuthReq, userAddReq } from './requests';
import { UserAddApiRes, UserAddReq, UserAuthApiRes, UserAuthReq } from './types';

export const userAuthThunk = createAsyncThunk<UserAuthApiRes, UserAuthReq>(
  'user/auth',
  async ({ email }, { rejectWithValue, getState }) => {
    try {
      const response = await userAuthReq({ email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const userAddThunk = createAsyncThunk<UserAddApiRes, UserAddReq>(
  'user/add',
  async ({ name, email }, { rejectWithValue }) => {
    try {
      const response = await userAddReq({ name, email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);
