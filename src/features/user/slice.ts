import { createSlice } from '@reduxjs/toolkit';

import { userAuthThunk, userAddThunk } from './thunks';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
  token: '',
  name: '',
  email: '',
  status: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** BUILDER USER AUTH THUNK */
    builder.addCase(userAuthThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(userAuthThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(userAuthThunk.rejected, (state, action) => {
      state.status = 'failed';

      state.error = action.error.message || '';
    });

    /** BUILDER USER ADD THUNK */
    builder.addCase(userAddThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(userAddThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(userAddThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export const userActionsCreators = userSlice.actions;
