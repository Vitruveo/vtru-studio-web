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
    tasks: [
        {
            id: 'organization',
            name: 'Organization',
            status: 'Not Started',
            to: '/home/stores/publish/organization',
        },
        {
            id: 'artworks',
            name: 'Artworks',
            status: 'Not Started',
        },
        {
            id: 'appearanceContent',
            name: 'Appearance & Content',
            status: 'Not Started',
        },
        {
            id: 'reviewPublish',
            name: 'Review and Publish',
            status: 'Not Started',
        },
    ],
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
        setTask: (state, action: PayloadAction<{ id: string; status: StoresState['tasks'][0]['status'] }>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.tasks[taskIndex].status = action.payload.status;
        },
    },
});

export const storesActionsCreators = storesSlice.actions;
