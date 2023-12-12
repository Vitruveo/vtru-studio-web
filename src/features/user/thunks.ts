import { createAppAsyncThunk } from '@/store/asyncThunk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  userLoginReq,
  userAddReq,
  userOTPConfimReq,
  checkCreatorUsernameExist,
  checkCreatorEmailExist,
  addCreatorEmailExist,
} from './requests';
import {
  UserAddApiRes,
  UserAddReq,
  UserLoginApiRes,
  UserLoginReq,
  UserOTPConfirmReq,
  UserOTPConfirmApiRes,
  CreatorUsernameExistApiRes,
  CreatorUsernameExistReq,
  CreatorEmailExistApiRes,
  CreatorEmailExistReq,
  AddCreatorEmailApiRes,
  AddCreatorEmailReq,
} from './types';

export const userLoginThunk = createAppAsyncThunk<UserLoginApiRes, UserLoginReq>(
  'user/login',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await userLoginReq({ email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const userAddThunk = createAppAsyncThunk<UserAddApiRes, UserAddReq>(
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

export const userOTPConfirmThunk = createAppAsyncThunk<UserOTPConfirmApiRes, UserOTPConfirmReq>(
  'user/otpConfirm',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await userOTPConfimReq({ email, code });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const checkCreatorUsernameExistThunk = createAppAsyncThunk<CreatorUsernameExistApiRes, CreatorUsernameExistReq>(
  'creator/username/exist',
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await checkCreatorUsernameExist({ username });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const checkCreatorEmailExistThunk = createAppAsyncThunk<CreatorEmailExistApiRes, CreatorEmailExistReq>(
  'creator/email/exist',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await checkCreatorEmailExist({ email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const addCreatorEmailThunk = createAppAsyncThunk<AddCreatorEmailApiRes, AddCreatorEmailReq>(
  'creator/add/emaill',
  async ({ email, id }, { rejectWithValue }) => {
    try {
      const response = await addCreatorEmailExist({ id, email });
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);
