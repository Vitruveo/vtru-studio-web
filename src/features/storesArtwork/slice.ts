import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreArtworkState } from './types';

export const initialState: StoreArtworkState = {
    tags: [],
    collections: [],
    subject: [],
    name: [],
};

export const storeArtworkSlice = createSlice({
    name: 'storeArtwork',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<StoreArtworkState['tags']>) => {
            state.tags = action.payload;
        },
        setCollections: (state, action: PayloadAction<StoreArtworkState['collections']>) => {
            state.collections = action.payload;
        },
        setSubject: (state, action: PayloadAction<StoreArtworkState['subject']>) => {
            state.subject = action.payload;
        },
        setName: (state, action: PayloadAction<StoreArtworkState['name']>) => {
            state.name = action.payload;
        },
    },
});

export const storesArtworkActions = storeArtworkSlice.actions;
