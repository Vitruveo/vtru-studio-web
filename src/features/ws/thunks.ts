import { ReduxThunkAction } from '@/store';
import { userActionsCreators } from '../user/slice';
import webSocketService from '@/services/websocket';

export function connectWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        webSocketService.connect();
    };
}

export function loginWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        const creator = getState().user;

        webSocketService.emit('login', {
            id: creator._id,
            email: creator.login.email,
            token: 'creator',
        });

        webSocketService.on('preSignedURL', (data) => {
            dispatch(
                userActionsCreators.requestAssetUpload({
                    url: data.preSignedURL,
                    transactionId: data.transactionId,
                    path: data.path,
                    status: 'ready',
                })
            );
        });
    };
}
