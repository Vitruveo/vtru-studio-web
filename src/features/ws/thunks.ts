import { io } from 'socket.io-client';

import { ReduxThunkAction } from '@/store';
import { WS_SERVER_URL } from '@/constants/ws';

import { websocketSlice } from '.';
import { userActionsCreators } from '../user/slice';

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
            dispatch(
                userActionsCreators.requestAssetUpload({
                    url: data.preSignedURL,
                    transactionId: data.transactionId,
                })
            );
        });

        // {"preSignedURL":"https://vitruveo-studio-dev-general.s3.us-east-1.amazonaws.com/657ca3745877648a3ab37bc2/1703018822479.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZQ2LD7JIWDPOKYNC%2F20231219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T204702Z&X-Amz-Expires=3600&X-Amz-Signature=2309207363e79346bc2dc4361f0a84313d762ba80bd3e5640a7f7f8dceb773e2&X-Amz-SignedHeaders=host&x-id=PutObject","transactionId":"cRoczIykz0s-sEplwhXRy"}
    };
}
