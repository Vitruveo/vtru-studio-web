'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AssetSliceState } from './types';

const initialState: AssetSliceState = {
    _id: '',
    tempColors: [],
    mediaAuxiliary: {
        description: '',
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
    web3: {
        c2pa: {
            finishedAt: null,
            error: null,
        },
        ipfs: {
            finishedAt: null,
            error: null,
        },
        consign: {
            finishedAt: null,
            error: null,
        },
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
                    description: action.payload.description || '',
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
                    ...state.mediaAuxiliary,
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
        changeContractExplorer: (state, action: PayloadAction<AssetSliceState['contractExplorer']>) => {
            state.contractExplorer = action.payload;
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
        // TODO: CORRIGIR TIPAGEM
        setArEnabled: (state: any, action: PayloadAction<boolean>) => {
            state.assetMetadata.taxonomy.formData.arenabled = action.payload == true ? 'yes' : 'no';
        },
        setTempColors: (state, action: PayloadAction<string[]>) => {
            state.tempColors = action.payload;
        },
        changeWeb3: (
            state,
            action: PayloadAction<{
                type: keyof AssetSliceState['web3'];
                value: AssetSliceState['web3'][keyof AssetSliceState['web3']];
            }>
        ) => {
            state.web3[action.payload.type] = action.payload.value;
        },
        resetConsign: (state) => {
            state.web3 = {
                c2pa: {
                    error: null,
                    finishedAt: null,
                },
                ipfs: {
                    error: null,
                    finishedAt: null,
                },
                consign: {
                    error: null,
                    finishedAt: null,
                },
            };
        },
    },
});

export const assetActionsCreators = assetSlice.actions;
