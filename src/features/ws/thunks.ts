import { ReduxThunkAction } from '@/store';
import { userActionsCreators } from '../user/slice';
import webSocketService from '@/services/websocket';
import { TOKEN_CREATORS } from '@/constants/ws';
import { assetActionsCreators } from '../asset/slice';
import { storesActionsCreators } from '../stores/slice';
import { PreSignedURLPayload, NotifyEnvelope, AvatarEnvelop, AssetChangeNotify } from './types';
import { deleteAssetStorage } from '../asset/requests';
import { deleteAvatar } from '../user/requests';
import { auxiliaryMediaThunk } from '../asset/thunks';
import { ASSET_STORAGE_URL } from '@/constants/asset';

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

                if (data.origin === 'profileRequests') {
                    dispatch(
                        userActionsCreators.requestsUpload({
                            url: data.preSignedURL,
                            transactionId: data.transactionId,
                            path: data.path,
                            status: 'ready',
                        })
                    );
                }

                if (data.origin === 'stores') {
                    dispatch(
                        storesActionsCreators.requestStoreUpload({
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

        webSocketService.on('userSocialAvatar', (data: AvatarEnvelop) => {
            if (data.social.type === 'x') {
                dispatch(
                    userActionsCreators.changeSocialsX({
                        name: data.social.name,
                        avatar: data.social.avatar,
                    })
                );
            }
            if (data.social.type === 'facebook') {
                dispatch(
                    userActionsCreators.changeSocialsFacebook({
                        name: data.social.name,
                        avatar: data.social.avatar,
                    })
                );
            }
            if (data.social.type === 'google') {
                dispatch(
                    userActionsCreators.changeSocialsGoogle({
                        name: data.social.name,
                        avatar: data.social.avatar,
                    })
                );
            }
        });

        webSocketService.on('userNotification', (data: NotifyEnvelope) => {
            if (data?.notification?.messageType === 'deleteAsset') {
                dispatch(userActionsCreators.change({ notify: 'deleteAsset' }));
                dispatch(auxiliaryMediaThunk({ deleteFormats: ['codeZip'] }));
            }
            if (data?.notification?.messageType === 'updateAsset') {
                const { fileName } = data?.notification as AssetChangeNotify;
                const asset = getState().asset;
                const findFormat = Object.entries(asset.formats).find(([key, value]) => value.path === fileName);

                if (findFormat) {
                    const newFilenameProps = data.notification?.newFilename
                        ? {
                              path: data.notification.newFilename,
                              file: `${ASSET_STORAGE_URL}/${data.notification.newFilename}`,
                          }
                        : {};
                    dispatch(
                        assetActionsCreators.changeFormats({
                            [findFormat[0]]: {
                                ...findFormat[1],
                                load: false,
                                ...newFilenameProps,
                                size: data.notification.size,
                            },
                        })
                    );
                }
            }
            if (data?.notification?.messageType === 'synapsSteps') {
                const { sessionId, stepId, status, stepName, messageType } = data.notification;
                dispatch(
                    userActionsCreators.changeSynapsStep({
                        sessionId,
                        stepId,
                        status,
                        stepName,
                        messageType,
                    })
                );
            }
        });
    };
}
