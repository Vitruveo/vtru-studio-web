import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeaturesState, FeatureType } from './types';

const initialState: FeaturesState = {
    isEmailAllowed: false,
    list: [],
};

export const featuresSlice = createSlice({
    name: 'features',
    initialState,
    reducers: {
        setEmailAllowed(state, action: PayloadAction<boolean>) {
            state.isEmailAllowed = action.payload;
        },
        setFeatures(state, action: PayloadAction<FeatureType[]>) {
            state.list = action.payload;
        },
    },
});

export const featuresActionCreators = featuresSlice.actions;
