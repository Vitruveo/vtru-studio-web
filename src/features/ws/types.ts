import { Socket } from 'socket.io-client';

export interface WebsocketSliceState {
    messages: string[];
}

export interface PreSignedURLPayload {
    preSignedURL: string;
    transactionId: string;
    path: string;
    origin: 'asset' | 'profile';
}
