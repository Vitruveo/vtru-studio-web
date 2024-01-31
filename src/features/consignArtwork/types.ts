export type StepId = 'termsOfUse' | 'assetMedia' | 'assetMetadata' | 'licenses' | 'auxiliaryMedia';
export type StepStatus = 'notStarted' | 'completed' | 'inProgress';

export interface CompletedSteps {
    [key: string]: {
        stepId: StepId;
        stepName: string;
        status: StepStatus;
        statusName: string;
    };
}

export interface ConsignArtworkSliceState {
    isCompletedProfile: boolean;
    goToConsignArtwork: boolean;
    completedSteps: CompletedSteps;
}

export interface ChangeStatusPayload {
    stepId: StepId;
    status: StepStatus;
}
