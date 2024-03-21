export type StepId = 'termsOfUse' | 'assetMedia' | 'assetMetadata' | 'licenses' | 'auxiliaryMedia' | 'reviewAndConsign';
export type StepStatus = 'notStarted' | 'completed' | 'inProgress';

export interface CompletedSteps {
    [key: string]: {
        stepId: StepId;
        stepName: string;
        status: StepStatus;
        statusName: string;
        optional?: boolean;
    };
}

export interface ConsignArtworkSliceState {
    isCompletedProfile: boolean;
    goToConsignArtwork: boolean;
    completedSteps: CompletedSteps;
    previewAndConsign: {
        creatorCredits?: number;
        creatorWallet?: string;
        creatorContract?: string;
    };
}

export interface ChangeStatusPayload {
    stepId: StepId;
    status: StepStatus;
}
