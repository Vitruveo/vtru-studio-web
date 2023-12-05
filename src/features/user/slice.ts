import { createSlice } from '@reduxjs/toolkit';

import { userAuthThunk } from './thunks';
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
    },
});

export const userActionsCreators = userSlice.actions;
