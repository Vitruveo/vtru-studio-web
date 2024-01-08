'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChangeStatusPayload, ConsignArtworkSliceState } from './types';
import { Email, User, Wallet } from '../user/types';

const initialState: ConsignArtworkSliceState = {
    isCompletedProfile: false,
    goToConsignArtwork: false,
    completedSteps: {
        assetMedia: {
            stepId: 'assetMedia',
            stepName: 'Asset Media',
            status: 'notStarted',
            statusName: 'Not Started',
        },
        assetMetadata: {
            stepId: 'assetMetadata',
            stepName: 'Asset Metadata',
            status: 'notStarted',
            statusName: 'Not Started',
        },
        licenses: {
            stepId: 'licenses',
            stepName: 'Licenses',
            status: 'notStarted',
            statusName: 'Not Started',
        },
        termsOfUse: {
            stepId: 'termsOfUse',
            stepName: 'Terms of Use',
            status: 'notStarted',
            statusName: 'Not Started',
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
        changeStatus: (state, action: PayloadAction<ChangeStatusPayload>) => {
            const { stepId, status, statusName } = action.payload;
            state.completedSteps[stepId].status = status;
            state.completedSteps[stepId].statusName = statusName;
        },
    },
});

export const consignArtworkActionsCreators = consignArtworkSlice.actions;
