'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { assetStorageThunk } from './thunks';
import { AssetSliceState } from './types';

const initialState: AssetSliceState = {
    _id: '',
    asset: {
        formats: {
            original: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            display: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            exhibition: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            preview: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            print: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
        },
    },
    assetMetadata: {
        assetMetadataDomains: [],
        assetMetadataDefinitions: [],
    },
    // creatorMetadata: {
    //     creatorMetadataDefinitions: [],
    // },
    licenses: [],
    contract: false,
    framework: {
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    status: 'draft',
    error: '',
};

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<Partial<AssetSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        error: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const assetActionsCreators = assetSlice.actions;
export { assetStorageThunk };
