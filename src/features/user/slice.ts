'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userLoginThunk, userAddThunk, userOTPConfirmThunk, sendRequestUploadThunk } from './thunks';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
    _id: '',
    token: '',
    username: '',
    name: '',
    login: {
        email: '',
    },
    wallets: [],
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
    framework: {
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
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
            const { token, creator } = action.payload.data;
            state.status = `succeeded: ${action.type}`;
            state.token = token;
            state._id = creator._id;
            state.emails = creator.emails;
            state.username = creator.username;
            state.wallets = creator.wallets;
            state.profile = creator.profile;
            state.framework = creator.framework;
        },
        change: (state, action: PayloadAction<Partial<UserSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
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
