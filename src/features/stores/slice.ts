import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoresItem, StoresState } from './types';

export const initialState: StoresState = {
    loading: false,
    data: [],
    selectedStore: '',
    error: null,
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
        setData: (state, action: PayloadAction<StoresState['data']>) => {
            state.data = action.payload;
        },
        setSelectedStore: (state, action: PayloadAction<StoresState['selectedStore']>) => {
            state.selectedStore = action.payload;
        },
        removeStore: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter((store: StoresItem) => store.id !== action.payload);
        },
    },
});

export const storesActions = storesSlice.actions;
