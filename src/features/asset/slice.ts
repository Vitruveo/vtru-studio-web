'use client';
import { createSlice } from '@reduxjs/toolkit';

import { assetStorageThunk } from './thunks';
import { AssetSliceState } from './types';

const initialState: AssetSliceState = {
    _id: '',
    framework: {
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    status: '',
    error: '',
};

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
    },
});

export const assetActionsCreators = assetSlice.actions;
export { assetStorageThunk };
