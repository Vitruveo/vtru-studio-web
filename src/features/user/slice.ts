'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSliceState, vaultProps } from './types';

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
    canConsignArtwork: false,
    vault: {
        transactionHash: null,
        createdAt: null,
        isLoading: false,
    },
    socials: {
        x: {
            name: '',
            avatar: '',
        },
        facebook: {
            name: '',
            avatar: '',
        },
        google: {
            name: '',
            avatar: '',
        },
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state = initialState;
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
            state.vault.transactionHash = creator?.vault?.transactionHash || null;
            state.vault.createdAt = creator?.vault?.createdAt || null;
            state.framework = creator.framework;
            state.socials = {
                x: {
                    name: creator?.socials?.x?.name ?? '',
                    avatar: creator?.socials?.x?.avatar ?? '',
                },
                facebook: {
                    name: creator?.socials?.facebook?.name ?? '',
                    avatar: creator?.socials?.facebook?.avatar ?? '',
                },
                google: {
                    name: creator?.socials?.google?.name ?? '',
                    avatar: creator?.socials?.google?.avatar ?? '',
                },
            };
        },
        change: (state, action: PayloadAction<Partial<UserSliceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        changeSocialsX: (state, action: PayloadAction<{ avatar: string; name: string }>) => {
            state.socials.x.avatar = action.payload.avatar;
            state.socials.x.name = action.payload.name;
        },
        changeSocialsFacebook: (state, action: PayloadAction<{ avatar: string; name: string }>) => {
            state.socials.facebook.avatar = action.payload.avatar;
            state.socials.facebook.name = action.payload.name;
        },
        changeSocialsGoogle: (state, action: PayloadAction<{ avatar: string; name: string }>) => {
            state.socials.google.avatar = action.payload.avatar;
            state.socials.google.name = action.payload.name;
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
        },
        setVault: (state, action: PayloadAction<vaultProps>) => {
            state.vault.transactionHash = action.payload.transactionHash;
            state.vault.createdAt = action.payload.createdAt;
        },
        setVaultLoading: (state, action: PayloadAction<boolean>) => {
            state.vault.isLoading = action.payload;
        },
    },
});

export const userActionsCreators = userSlice.actions;
