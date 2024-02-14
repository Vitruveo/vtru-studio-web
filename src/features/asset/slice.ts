'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AssetSliceState } from './types';

const initialState: AssetSliceState = {
    _id: '',
    mediaAuxiliary: {
        formats: {
            arImage: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            arVideo: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            btsImage: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            btsVideo: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
            codeZip: {
                file: undefined,
                customFile: undefined,
                transactionId: undefined,
            },
        },
    },
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
    assetMetadata: undefined,
    licenses: undefined,
    requestAssetUpload: {},
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
    status: '',
    error: '',
};

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        changeFormatsMediaAuxiliary: (state, action: PayloadAction<Partial<AssetSliceState['mediaAuxiliary']>>) => {
            return {
                ...state,
                mediaAuxiliary: {
                    ...state.mediaAuxiliary,
                    formats: {
                        ...state.mediaAuxiliary.formats,
                        ...action.payload.formats,
                    },
                },
            };
        },
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
        removeFormatsMediaAuxiliary: (state, action: PayloadAction<string[]>) => {
            return {
                ...state,
                mediaAuxiliary: {
                    formats: Object.entries(state.mediaAuxiliary.formats).reduce(
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
                        {} as AssetSliceState['mediaAuxiliary']['formats']
                    ),
                },
            };
        },
        change: (state, action: PayloadAction<Partial<AssetSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        requestAssetUpload: (state, action) => {
            state.requestAssetUpload[action.payload.transactionId] = {
                ...state.requestAssetUpload[action.payload.transactionId],
                ...action.payload,
            };
        },
        requestAssetUploadUsed: (state, action) => {
            delete state.requestAssetUpload[action.payload.transactionId];
        },
        error: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const assetActionsCreators = assetSlice.actions;
