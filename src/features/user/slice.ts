'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSliceState } from './types';

const initialState: UserSliceState = {
    _id: '',
    token: '',
    emailDefault: '',
    walletDefault: '',
    notify: '',
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
    requestAvatarUpload: {
        path: '',
        status: '',
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
    canConsignArtwork: false
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
            state.emailDefault = creator.emailDefault;
            state.walletDefault = creator.walletDefault;
            state.framework = creator.framework;
        },
        change: (state, action: PayloadAction<Partial<UserSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        changeAvatar: (state, action: PayloadAction<{ fileId: string }>) => {
            state.profile.avatar = action.payload.fileId;
        },
        requestAvatarUpload: (state, action) => {
            state.requestAvatarUpload = action.payload;
        },
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
        setCanConsignArtwork: (state, action: PayloadAction<boolean>) => {
            state.canConsignArtwork = action.payload;
        }
    },
});

export const userActionsCreators = userSlice.actions;
