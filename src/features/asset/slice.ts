'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AssetSliceState } from './types';

const initialState: AssetSliceState = {
    _id: '',

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
    assetMetadata: {
        assetMetadataDomains: [],
        assetMetadataDefinitions: [],
    },
    // creatorMetadata: {
    //     creatorMetadataDefinitions: [],
    // },
    licenses: undefined,
    isOriginal: false,
    generatedArtworkAI: false,
    notMintedOtherBlockchain: false,
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
        changeFormats: (state, action: PayloadAction<Partial<AssetSliceState['formats']>>) => {
            return {
                ...state,
                formats: {
                    ...state.formats,
                    ...action.payload,
                },
            };
        },
        removeFormats: (state, action: PayloadAction<string[]>) => {
            return {
                ...state,
                formats: Object.entries(state.formats).reduce(
                    (acc, [key, value]) => {
                        if (action.payload.includes(key))
                            return {
                                ...acc,
                                [key]: {
                                    file: undefined,
                                    customFile: undefined,
                                    transactionId: undefined,
                                },
                            };
                        return {
                            ...acc,
                            [key]: value,
                        };
                    },
                    {} as AssetSliceState['formats']
                ),
            };
        },
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
