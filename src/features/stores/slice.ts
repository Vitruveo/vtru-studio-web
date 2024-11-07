import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stores, StoresState } from './types';

export const initialState: StoresState = {
    loading: false,
    data: [],
    selectedStore: {
        id: '',
        validateUrl: null,
    },
    error: null,
    isSubmittingFiles: false,
    requestStoreUpload: {},
};

export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setStartLoading: (state) => {
            state.loading = true;
        },
        setFinishLoading: (state) => {
            state.loading = false;
        },
        setIsSubmittingFiles: (state, action: PayloadAction<boolean>) => {
            state.isSubmittingFiles = action.payload;
        },
        setData: (state, action: PayloadAction<StoresState['data']>) => {
            state.data = action.payload;
        },
        setSelectedStore: (state, action: PayloadAction<StoresState['selectedStore']['id']>) => {
            state.selectedStore.id = action.payload;
        },
        setSelectStoreValidateUrl: (state, action: PayloadAction<StoresState['selectedStore']['validateUrl']>) => {
            state.selectedStore.validateUrl = action.payload;
        },
        removeStore: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter((store: Stores) => store._id !== action.payload);
        },
        requestStoreUpload: (state, action) => {
            state.requestStoreUpload[action.payload.transactionId] = {
                ...state.requestStoreUpload[action.payload.transactionId],
                ...action.payload,
            };
        },
        clearRequestStoreUpload: (state) => {
            state.requestStoreUpload = {};
        },
    },
});

export const storesActionsCreators = storesSlice.actions;
