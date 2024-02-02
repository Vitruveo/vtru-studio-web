import { ReduxThunkAction } from '@/store';
import { userActionsCreators } from '../user/slice';
import webSocketService from '@/services/websocket';
import { TOKEN_CREATORS } from '@/constants/ws';
import { assetActionsCreators } from '../asset/slice';
import { PreSignedURLPayload, NotifyEnvelope } from './types';
import { deleteAssetStorage } from '../asset/requests';
import { deleteAvatar } from '../user/requests';
import { auxiliaryMediaThunk } from '../asset/thunks';

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
            token: TOKEN_CREATORS,
        });

        webSocketService.on('preSignedURL', (data: PreSignedURLPayload) => {
            if (data.method === 'PUT') {
                if (data.origin === 'asset')
                    dispatch(
                        assetActionsCreators.requestAssetUpload({
                            url: data.preSignedURL,
                            transactionId: data.transactionId,
                            path: data.path,
                            status: 'ready',
                        })
                    );
                if (data.origin === 'profile') {
                    dispatch(
                        userActionsCreators.requestAvatarUpload({
                            url: data.preSignedURL,
                            transactionId: data.transactionId,
                            path: data.path,
                            status: 'ready',
                        })
                    );
                }
            }
            if (data.method === 'DELETE') {
                if (data.origin === 'asset') deleteAssetStorage(data.preSignedURL);
                if (data.origin === 'profile') deleteAvatar(data.preSignedURL);
            }
        });

        webSocketService.on('userNotification', (data: NotifyEnvelope) => {
            if (data?.notification?.messageType === 'deleteAsset') {
                dispatch(userActionsCreators.change({ notify: 'deleteAsset' }));
                dispatch(auxiliaryMediaThunk({ deleteFormats: ['codeZip'] }));
            }
        });
    };
}
