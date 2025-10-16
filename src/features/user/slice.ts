'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DiditSession, RequestUpload, SynapsStep, UserSliceState, VaultProps } from './types';

import { UpdatedAssetStoresVisibilityReq } from '../common/types';

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
    personalDetails: undefined,
    artworkRecognition: undefined,
    links: [],
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
    autoStake: false,
    canConsignArtwork: true,
    generalVault: undefined,
    vault: {
        isBlocked: false,
        transactionHash: null,
        createdAt: null,
        isLoading: false,
        vaultAddress: '',
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
    assets: {
        data: [],
        limit: 0,
        page: 0,
        total: 0,
        totalPage: 0,
        collection: '',
        licenseArtCards: 0,
    },
    collections: [],
    currentPage: 1,
    sort: 'consignNewToOld',
    selectedAsset: '',
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
            state.username = creator?.username || '';
            state.displayName = creator.displayName;
            state.wallets = creator.wallets;
            state.links = creator.links;
            state.myWebsite = creator.myWebsite;
            state.personalDetails = creator.personalDetails;
            state.artworkRecognition = creator.artworkRecognition;
            state.profile = creator.profile;
            state.emailDefault = creator.emailDefault;
            state.walletDefault = creator.walletDefault;
            state.generalVault = creator.generalVault;
            state.vault.transactionHash = creator?.vault?.transactionHash || null;
            state.vault.vaultAddress = creator?.vault?.vaultAddress || null;
            state.vault.createdAt = creator?.vault?.createdAt || null;
            state.vault.isBlocked = creator?.vault?.isBlocked || false;
            state.framework = creator.framework;
            state.didit = creator.didit;
            state.truLevel = creator.truLevel;
            state.licenses = creator.licenses;
            state.autoStake = creator.autoStake;
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
        requestsUpload: (state, action: PayloadAction<RequestUpload>) => {
            state.requestsUpload = {
                ...state.requestsUpload,
                [action.payload.transactionId]: {
                    ...state.requestsUpload?.[action.payload.transactionId],
                    ...action.payload,
                },
            };
        },
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
        setCanConsignArtwork: (state, action: PayloadAction<boolean>) => {
            state.canConsignArtwork = action.payload;
        },
        setVault: (state, action: PayloadAction<VaultProps>) => {
            state.vault.transactionHash = action.payload.transactionHash;
            state.vault.createdAt = action.payload.createdAt;
        },
        setVaultLoading: (state, action: PayloadAction<boolean>) => {
            state.vault.isLoading = action.payload;
        },
        setMyAssets: (state, action: PayloadAction<UserSliceState['assets']>) => {
            state.assets = action.payload;
        },
        changeAssetStoresVisibility: (state, action: PayloadAction<UpdatedAssetStoresVisibilityReq>) => {
            const index = state.assets.data.findIndex((asset) => asset._id === action.payload.assetId);
            if (index !== -1) {
                state.assets.data[index].stores = action.payload.stores;
            }
        },
        setSelectedAsset: (state, action: PayloadAction<string>) => {
            state.selectedAsset = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setCollections: (state, action: PayloadAction<UserSliceState['collections']>) => {
            state.collections = action.payload;
        },
        setSelectedCollection: (state, action: PayloadAction<string>) => {
            state.assets.collection = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = {
                ...state.assets,
                data: state.assets.data.filter((asset) => asset._id !== action.payload),
            };
        },
        setDiditSession: (state, action: PayloadAction<DiditSession>) => {
            return {
                ...state,
                didit: {
                    ...(state.didit || {}),
                    session: action.payload,
                },
            };
        },
        // setSynapsSteps: (state, action: PayloadAction<SynapsStep[]>) => {
        //     if (state.synaps) {
        //         state.synaps.steps = action.payload;
        //     }
        // },
        // changeSynapsStep: (state, action: PayloadAction<SynapsChangeNotify>) => {
        //     if (state.synaps) {
        //         state.synaps.steps = state.synaps.steps.map((step) =>
        //             step.id === action.payload.stepId ? { ...step, status: action.payload.status } : step
        //         );
        //     }
        // },
        changeAutoStake: (state, action: PayloadAction<boolean>) => {
            state.autoStake = action.payload;
        },
    },
});

export const userActionsCreators = userSlice.actions;
