import { AssetConsignArtwork } from '../asset/types';

export type StepId = 'termsOfUse' | 'assetMedia' | 'assetMetadata' | 'licenses' | 'auxiliaryMedia' | 'reviewAndConsign';
export type StepStatus = 'notStarted' | 'completed' | 'inProgress';
export type ConsignArtworkAssetStatus = 'draft' | 'preview' | 'active' | 'hidden' | 'blocked';

export interface CompletedSteps {
    [key: string]: {
        stepId: StepId;
        stepName: string;
        status: StepStatus;
        statusName: string;
        optional?: boolean;
    };
}

export interface ConsignArtworkSliceState extends AssetConsignArtwork {
    isCompletedProfile: boolean;
    goToConsignArtwork: boolean;
    status: ConsignArtworkAssetStatus;
    completedSteps: CompletedSteps;
    previewAndConsign: {
        artworkListing?: {
            checked: boolean;
        };
        creatorCredits?: {
            checked: boolean;
            value?: undefined | number;
            loading?: boolean;
        };
        creatorWallet?: {
            checked: boolean;
            value: string | `0x${string}`;
        };
        creatorContract?: {
            checked: boolean;
            value?: string;
            loading?: boolean;
        };
    };
}

export interface ChangeStatusPayload {
    stepId: StepId;
    status: StepStatus;
}
