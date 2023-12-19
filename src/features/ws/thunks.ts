import { io } from 'socket.io-client';

import { ReduxThunkAction } from '@/store';
import { WS_SERVER_URL } from '@/constants/ws';

import { websocketSlice } from '.';

export function connectWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        const socket = io(WS_SERVER_URL);

        dispatch(websocketSlice.actions.websocketConnected(socket));
    };
}

export function loginWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        const socket = getState().websocket.connection!;

        const creator = getState().user;

        socket.emit('login', {
            id: creator._id,
            email: creator.login.email,
            token: 'creator',
        });

        socket.on('preSignedURL', (data) => {
            console.log(`preSignedURL: ${JSON.stringify(data)}`);
        });
    };
}
