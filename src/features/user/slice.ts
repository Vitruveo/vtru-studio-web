'use client';
import { createSlice } from '@reduxjs/toolkit';

import { userLoginThunk, userAddThunk, userOTPConfirmThunk, sendRequestUploadThunk } from './thunks';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
    _id: '',
    token: '',
    name: '',
    login: {
        email: '',
    },
    emails: [],
    profile: {
        avatar: '',
        phone: '',
        language: '',
        location: '',
    },
    roles: [],
    requestAssetUpload: {
        transactionId: '',
        url: '',
    },
    status: '',
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (state, action) => {
            state.status = `succeeded: ${action.type}`;
            state.login.email = action.payload.email;
        },
        otpConfirm: (state, action) => {
            state.status = `succeeded: ${action.type}`;
            state.token = action.payload.data.token;
            state._id = action.payload.data.creator._id;
            state.emails = action.payload.data.creator.emails;
        },
        requestAssetUpload: (state, action) => {
            state.requestAssetUpload.transactionId = action.payload.transactionId;
            state.requestAssetUpload.url = action.payload.url || '';
        },
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
    },
});

export const userActionsCreators = userSlice.actions;
export { userOTPConfirmThunk, userAddThunk, userLoginThunk, sendRequestUploadThunk };
