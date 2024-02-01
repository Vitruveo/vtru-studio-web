'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChangeStatusPayload, ConsignArtworkSliceState } from './types';
import { Email, User, Wallet } from '../user/types';

export const stepsNames = {
    assetMedia: 'studio.consignArtwork.stepName.assetMedia',
    auxiliaryMedia: 'studio.consignArtwork.stepName.auxiliaryMedia',
    assetMetadata: 'studio.consignArtwork.stepName.assetMetadata',
    licenses: 'studio.consignArtwork.stepName.licenses',
    termsOfUse: 'studio.consignArtwork.stepName.termsOfUse',
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
    },
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
        changeStatusStep: (state, action: PayloadAction<ChangeStatusPayload>) => {
            const { stepId, status } = action.payload;
            if (status === 'completed') state.completedSteps[stepId].statusName = statusName.completed;
            if (status === 'inProgress') state.completedSteps[stepId].statusName = statusName.inProgress;
            if (status === 'notStarted') state.completedSteps[stepId].statusName = statusName.notStarted;
            state.completedSteps[stepId].status = status;
        },
    },
});

export const consignArtworkActionsCreators = consignArtworkSlice.actions;
