import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemStatusState, SystemStatusType } from './types';

export const initialState: SystemStatusState = {
    data: {
        studio: { info: [], warn: [], error: [], maintenance: [] },
    },
    error: null,
    loading: false,
};

export const systemStatusSlice = createSlice({
    name: 'systemStatus',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<SystemStatusType>) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { actions } = systemStatusSlice;
export default systemStatusSlice.reducer;
