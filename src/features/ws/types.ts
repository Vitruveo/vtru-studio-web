import { SynapsStatus } from '../user/types';

export interface WebsocketSliceState {
    messages: string[];
}

export interface PreSignedURLPayload {
    preSignedURL: string;
    transactionId: string;
    path: string;
    origin: 'asset' | 'profile' | 'stores' | 'profileRequests';
    method: 'PUT' | 'DELETE';
}

export interface AssetChangeNotify {
    size: number;
    creatorId: string;
    fileName: string;
    newFilename: string;
    messageType: 'updateAsset' | 'deleteAsset';
}

export interface SynapsChangeNotify {
    sessionId: string;
    stepId: string;
    status: SynapsStatus;
    stepName: string;
    messageType: 'synapsSteps';
}
export interface NotifyEnvelope {
    notification: AssetChangeNotify | SynapsChangeNotify;
}

export interface AvatarEnvelop {
    social: {
        type: 'x' | 'google' | 'facebook';
        avatar: string;
        name: string;
    };
}
