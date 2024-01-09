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
        changeStatusStep: (state, action: PayloadAction<ChangeStatusPayload>) => {
            const { stepId, status } = action.payload;
            if (status === 'completed') state.completedSteps[stepId].statusName = 'Completed';
            if (status === 'inProgress') state.completedSteps[stepId].statusName = 'In Progress';
            if (status === 'notStarted') state.completedSteps[stepId].statusName = 'Not Started';
            state.completedSteps[stepId].status = status;
        },
    },
});

export const consignArtworkActionsCreators = consignArtworkSlice.actions;
