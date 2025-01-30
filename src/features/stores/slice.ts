import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublishStore, StepStatus, Stores, StoresState } from './types';

export const initialState: StoresState = {
    loading: false,
    data: {
        data: [],
        page: 1,
        totalPage: 0,
        total: 0,
        limit: 24,
    },
    selectedStore: {
        id: '',
        validateUrl: null,
    },
    filters: {
        status: 'all',
    },
    error: null,
    isSubmittingFiles: false,
    requestStoreUpload: {},
    publishStore: {
        organization: {
            label: 'Organization',
            status: 'Not Started',
            optional: false,
        },
        artworks: {
            label: 'Artworks',
            status: 'Not Started',
            optional: false,
        },
        appearanceContent: {
            label: 'Appearance & Content (Coming Soon)',
            status: 'Not Started',
            optional: true,
        },
        reviewPublish: {
            label: 'Review and Publish',
            status: 'Not Started',
            optional: true,
        },
    },
    status: 'draft',
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
        setIsSubmittingFiles: (state, action: PayloadAction<StoresState['isSubmittingFiles']>) => {
            state.isSubmittingFiles = action.payload;
        },
        setData: (state, action: PayloadAction<StoresState['data']>) => {
            state.data = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<StoresState['data']['page']>) => {
            state.data.page = action.payload;
        },
        setSelectedStore: (state, action: PayloadAction<StoresState['selectedStore']['id']>) => {
            state.selectedStore.id = action.payload;
        },
        setSelectStoreValidateUrl: (state, action: PayloadAction<StoresState['selectedStore']['validateUrl']>) => {
            state.selectedStore.validateUrl = action.payload;
        },
        setFilters: (state, action: PayloadAction<StoresState['filters']>) => {
            state.filters = action.payload;
        },
        removeStore: (state, action: PayloadAction<string>) => {
            state.data.data = state.data.data.filter((store: Stores) => store._id !== action.payload);
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
        setPublishStoreStatusStep: (state, action: PayloadAction<{ step: keyof PublishStore; status: StepStatus }>) => {
            state.publishStore[action.payload.step].status = action.payload.status;
        },
        setPublishStoreStatus: (state, action: PayloadAction<StoresState['status']>) => {
            state.status = action.payload;
        },
    },
});

export const storesActionsCreators = storesSlice.actions;
