export interface WebsocketSliceState {
    messages: string[];
}

export interface PreSignedURLPayload {
    preSignedURL: string;
    transactionId: string;
    path: string;
    origin: 'asset' | 'profile';
    method: 'PUT' | 'DELETE';
}

export interface NotifyEnvelope {
    notification: {
        size: number;
        creatorId: string;
        fileName: string;
        newFilename: string;
        messageType: string;
    };
}

export interface AvatarEnvelop {
    social: {
        type: 'x' | 'google' | 'facebook';
        avatar: string;
        name: string;
    };
}
