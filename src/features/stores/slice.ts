import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoresState } from './types';

export const initialState: StoresState = {
    loading: false,
    data: [],
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
    },
});

export const storesActions = storesSlice.actions;
