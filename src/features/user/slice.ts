import { createSlice } from '@reduxjs/toolkit';

import { userLoginThunk, userAddThunk, userOTPConfirmThunk } from './thunks';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
  _id: '',
  token: '',
  name: '',
  login: {
    email: '',
  },
  emails: [],
  profile: {
    avatar: '',
    phone: '',
    language: '',
    location: '',
  },
  roles: [],
  status: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    /** BUILDER USER AUTH THUNK */
    builder.addCase(userLoginThunk.pending, (state, action) => {
      state.status = `loading: ${action.type}`;
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.status = `succeeded: ${action.type}`;
      state.login.email = action.meta.arg.email;
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.status = `failed ${action.type}`;
      state.error = action.error.message || '';
    });

    /** BUILDER USER OTP THUNK */
    builder.addCase(userOTPConfirmThunk.pending, (state, action) => {
      state.status = `loading: ${action.type}`;
    });
    builder.addCase(userOTPConfirmThunk.fulfilled, (state, action) => {
      state.status = `succeeded: ${action.type}`;
      if (!action.payload.data) return;
      state.token = action.payload.data.token;
      state._id = action.payload.data.creator._id;
      state.emails = action.payload.data.creator.emails;
    });
    builder.addCase(userOTPConfirmThunk.rejected, (state, action) => {
      state.status = `failed: ${action.type}`;
      state.error = action.error.message || '';
    });
  },
});

export const userActionsCreators = userSlice.actions;
export { userOTPConfirmThunk, userAddThunk, userLoginThunk };
