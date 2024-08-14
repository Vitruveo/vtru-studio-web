'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AssetSliceState, Comments } from './types';

const initialState: AssetSliceState = {
    _id: '',
    tempColors: [],
    isLoading: false,
    isLoadingMediaData: 'notStarted',
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
            validation: {
                isValid: false,
                message: '',
            },
        },
        display: {
            file: undefined,
            customFile: undefined,
            transactionId: undefined,
            validation: {
                isValid: false,
                message: '',
            },
        },
        exhibition: {
            file: undefined,
            customFile: undefined,
            transactionId: undefined,
            validation: {
                isValid: false,
                message: '',
            },
        },
        preview: {
            file: undefined,
            customFile: undefined,
            transactionId: undefined,
            validation: {
                isValid: false,
                message: '',
            },
        },
        print: {
            file: undefined,
            customFile: undefined,
            transactionId: undefined,
            validation: {
                isValid: false,
                message: '',
            },
        },
    },
    assetMetadata: undefined,
    licenses: undefined,
    requestAssetUpload: {},
    terms: {
        isOriginal: false,
        generatedArtworkAI: false,
        notMintedOtherBlockchain: false,
        contract: false,
    },
    framework: {
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    status: '',
    validateConsign: { status: '', message: '' },
    consign: {
        transaction: '',
        status: '',
        message: '',
        when: '',
        steps: {
            check: null,
            c2pa: null,
            ipfs: null,
            contractExplorer: null,
        },
    },
    error: '',
    comments: [],
};

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        changeLoadingMediaData: (state, action: PayloadAction<string>) => {
            state.isLoadingMediaData = action.payload;
        },
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
        changeAuxiliaryMediaDescription: (state, action: PayloadAction<string>) => {
            state.mediaAuxiliary.description = action.payload;
        },
        change: (state, action: PayloadAction<Partial<AssetSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        clearRequestAssetUpload: (state) => {
            state.requestAssetUpload = {};
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
            if (state.assetMetadata?.taxonomy) {
                state.assetMetadata.taxonomy.formData.arenabled = action.payload == true ? 'yes' : 'no';
            }
        },
        setTempColors: (state, action: PayloadAction<number[][]>) => {
            state.tempColors = action.payload;
        },
        setValidationConsign: (state, action: PayloadAction<AssetSliceState['validateConsign']>) => {
            state.validateConsign = action.payload;
        },
        setConeignTransaction: (state, action: PayloadAction<string>) => {
            state.consign.transaction = action.payload;
        },
        setConsignInfo: (
            state,
            action: PayloadAction<{
                status: string;
                message: string;
                when: string;
            }>
        ) => {
            state.consign.message = action.payload.message;
            state.consign.status = action.payload.status;
            state.consign.when = action.payload.when;
        },
        setConsignStep: (
            state,
            action: PayloadAction<{
                step: 'check' | 'c2pa' | 'ipfs' | 'contractExplorer';
            }>
        ) => {
            state.consign.steps[action.payload.step] = new Date().toISOString();
        },
        resetConsign: (state) => {
            state.consign = initialState.consign;
        },
        setRequestConsignStatusPending: (state) => {
            if (!state.consignArtwork) {
                state.consignArtwork = { status: 'pending' };
            } else {
                state.consignArtwork.status = 'pending';
            }
        },
        setRequestConsignStatusDraft: (state) => {
            state.consignArtwork!.status = 'draft';
        },
        setRequestConsignComments: (state, action: PayloadAction<Comments[]>) => {
            state.comments = action.payload;
        },
        setFormatValidationConfirmed: (state) => {
            Object.values(state.formats).forEach((format) => {
                if (format)
                    format.validation = {
                        isValid: true,
                        message: '',
                    };
            });
        },
        setFormatValidationError: (
            state,
            action: PayloadAction<{
                format: keyof AssetSliceState['formats'];
                message: string;
            }>
        ) => {
            const format = state.formats[action.payload.format];
            if (format)
                format.validation = {
                    isValid: false,
                    message: action.payload.message,
                };
        },
        resetAsset: (state) => {
            return initialState;
        },
    },
});

export const assetActionsCreators = assetSlice.actions;
