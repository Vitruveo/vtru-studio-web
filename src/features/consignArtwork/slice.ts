'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChangeStatusPayload, ConsignArtworkAssetStatus, ConsignArtworkSliceState } from './types';
import { Email, Wallet } from '../user/types';
import { AssetConsignArtwork } from '../asset/types';

export const stepsNames = {
    assetMedia: 'studio.consignArtwork.stepName.assetMedia',
    auxiliaryMedia: 'studio.consignArtwork.stepName.auxiliaryMedia',
    assetMetadata: 'studio.consignArtwork.stepName.assetMetadata',
    licenses: 'studio.consignArtwork.stepName.licenses',
    termsOfUse: 'studio.consignArtwork.stepName.termsOfUse',
    reviewAndConsign: 'studio.consignArtwork.stepName.reviewAndConsign',
};

export const statusName = {
    completed: 'studio.consignArtwork.stepStatus.completed',
    inProgress: 'studio.consignArtwork.stepStatus.inProgress',
    notStarted: 'studio.consignArtwork.stepStatus.notStarted',
    error: 'studio.consignArtwork.stepStatus.error',
};

const initialState: ConsignArtworkSliceState = {
    isCompletedProfile: false,
    goToConsignArtwork: false,
    status: 'draft',
    completedSteps: {
        assetMedia: {
            stepId: 'assetMedia',
            stepName: stepsNames.assetMedia,
            status: 'notStarted',
            statusName: statusName.notStarted,
        },
        assetMetadata: {
            stepId: 'assetMetadata',
            stepName: stepsNames.assetMetadata,
            status: 'notStarted',
            statusName: statusName.notStarted,
        },

        licenses: {
            stepId: 'licenses',
            stepName: stepsNames.licenses,
            status: 'notStarted',
            statusName: statusName.notStarted,
        },
        termsOfUse: {
            stepId: 'termsOfUse',
            stepName: stepsNames.termsOfUse,
            status: 'notStarted',
            statusName: statusName.notStarted,
        },
        auxiliaryMedia: {
            stepId: 'auxiliaryMedia',
            stepName: stepsNames.auxiliaryMedia,
            status: 'notStarted',
            statusName: statusName.notStarted,
            optional: true,
        },
        reviewAndConsign: {
            stepId: 'reviewAndConsign',
            stepName: stepsNames.reviewAndConsign,
            status: 'notStarted',
            statusName: statusName.notStarted,
        },
    },
    previewAndConsign: {
        creatorCredits: {
            checked: false,
            value: undefined,
            loading: false,
        },
        creatorWallet: {
            checked: false,
            value: '',
        },
        creatorContract: {
            checked: false,
            value: '',
            loading: false,
        },
        artworkListing: {
            checked: false,
        },
    },
    artworkListing: '',
    creatorWallet: '',
    creatorContract: '',
    creatorCredits: 0,
};

export const consignArtworkSlice = createSlice({
    name: 'consignArtwork',
    initialState,
    reducers: {
        checkIsCompletedProfile: (
            state,
            action: PayloadAction<{ username: string; wallets: Wallet[]; emails: Email[] }>
        ) => {
            const { username, wallets, emails } = action.payload;
            state.isCompletedProfile = !!(emails.length && wallets.length && username.length);
        },
        changeGoToConsignArtwork: (state, action: PayloadAction<boolean>) => {
            state.goToConsignArtwork = action.payload;
        },
        changePreviewAndConsign: (state, action: PayloadAction<ConsignArtworkSliceState['previewAndConsign']>) => {
            state.previewAndConsign = { ...state.previewAndConsign, ...action.payload };
        },
        changeStatusStep: (state, action: PayloadAction<ChangeStatusPayload>) => {
            const { stepId, status } = action.payload;
            if (status === 'completed') state.completedSteps[stepId].statusName = statusName.completed;
            if (status === 'inProgress') state.completedSteps[stepId].statusName = statusName.inProgress;
            if (status === 'notStarted') state.completedSteps[stepId].statusName = statusName.notStarted;
            state.completedSteps[stepId].status = status;
        },
        changeConsignArtwork: (state, action: PayloadAction<AssetConsignArtwork>) => {
            state.artworkListing = action.payload.artworkListing;
            state.creatorWallet = action.payload.creatorWallet;
            state.creatorContract = action.payload.creatorContract;
            state.creatorCredits = action.payload.creatorCredits;
            state.status = action.payload.status;
        },
        changeConsignArtworkAssetStatus: (state, action: PayloadAction<{ status: ConsignArtworkAssetStatus }>) => {
            const { status } = action.payload;
            state.status = status;
        },
        addPreviewAndConsignWallet: (state, action: PayloadAction<string>) => {
            state.previewAndConsign.creatorWallet = { checked: true, value: action.payload };
        },
        deletePreviewAndConsignWallet: (state) => {
            state.previewAndConsign.creatorWallet = { checked: false, value: '' };
        }
    },
});

export const consignArtworkActionsCreators = consignArtworkSlice.actions;
