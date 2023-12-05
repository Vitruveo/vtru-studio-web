import { createSlice } from '@reduxjs/toolkit';

import { roleCreateThunk } from './thunks';
import { RoleSliceState } from './types';

const initialState: RoleSliceState = {
    name: '',
    description: '',
    permissions: [],
    byId: {},
    status: '',
    error: '',
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** BUILDER ROLE CREATE THUNK */
        builder.addCase(roleCreateThunk.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(roleCreateThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
        });
        builder.addCase(roleCreateThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || '';
        });
        /** BUILDER ROLE FIND MANY THUNK */
        // builder.addCase(roleFindManyThunk.pending, (state) => {
        //     state.status = 'loading';
        // });
        // builder.addCase(roleFindManyThunk.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     action.payload.forEach((item) => (state.byId[item.id] = item));
        // });
        // builder.addCase(roleFindManyThunk.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message || '';
        // });
    },
});

export const roleActionsCreators = roleSlice.actions;
