import { signMessage } from '@wagmi/core';
import cookie from 'cookiejs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { nanoid } from '@reduxjs/toolkit';
import {
    userLoginReq,
    userAddReq,
    userOTPConfimReq,
    checkCreatorUsernameExist,
    checkCreatorEmailExist,
    addCreatorEmailExist,
    sendRequestUpload,
    changeCreator,
    sendEmailCode,
    verifyCode,
    changeAvatar,
    generalStorage,
    requestDeleteFile,
    requestConnectWallet,
    verifyConnectWallet,
    requestSocialX,
    requestSocialGoogle,
    requestSocialFacebook,
    removeSocial,
    deleteWallets,
    addWallets,
    getWalletsVault,
    generalStorageAvatar,
    me,
    synapsSessionInit,
    synapsIndividualSession,
    getTruLevel,
} from './requests';
import { userActionsCreators } from './slice';
import {
    UserAddApiRes,
    UserAddReq,
    UserLoginApiRes,
    UserLoginReq,
    UserOTPConfirmReq,
    UserOTPConfirmApiRes,
    CreatorUsernameExistApiRes,
    CreatorUsernameExistReq,
    CreatorEmailExistApiRes,
    CreatorEmailExistReq,
    AddCreatorEmailApiRes,
    AddCreatorEmailReq,
    CreatorSendRequestUploadApiRes,
    CreatorSendRequestUploadReq,
    SaveStepWizardReq,
    SendEmailCodeApiRes,
    SendEmailCodeReq,
    VerifyCodeReq,
    VerifyCodeApiRes,
    ChangeAvatarReq,
    ChangeAvatarApiRes,
    GeneralStorageAvatarReq,
    ResquestConnectWalletReq,
    VerifyConnectWalletReq,
    VerifyConnectWalletApiRes,
    RequestConnectWalletRes,
    RemoveSocialReq,
    RequestMyAssetThunkReq,
    GeneralStorageReq,
    User,
} from './types';
import { ReduxThunkAction } from '@/store';
import { AccountSettingsFormValues } from '@/app/home/myProfile/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';
import { BASE_URL_API } from '@/constants/api';
import { getAssetById, getMyAssets } from '../asset/requests';
import { ASSET_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
import { config } from '@/app/home/components/apps/wallet';

export function getTruLevelThunk(): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const response = await getTruLevel();
        const currentTrulevel = getState().user.truLevel;
        if (JSON.stringify(currentTrulevel) !== JSON.stringify(response.data))
            dispatch(
                userActionsCreators.change({
                    truLevel: response.data,
                })
            );
    };
}

export function getMeThunk(): ReduxThunkAction<Promise<boolean>> {
    return async function (dispatch) {
        try {
            const response = await me();
            if (response) {
                const auth = cookie.get('auth');

                await dispatch(
                    userActionsCreators.otpConfirm({
                        data: {
                            token: auth,
                            creator: response.data,
                        },
                    })
                );

                return true;
            }

            cookie.remove('auth');
            return false;
        } catch (error) {
            cookie.remove('auth');
            return false;
        }
    };
}

export function userLoginThunk(payload: UserLoginReq): ReduxThunkAction<Promise<UserLoginApiRes>> {
    return async function (dispatch, getState) {
        const response = await userLoginReq({ email: payload.email });

        dispatch(userActionsCreators.login({ email: payload.email }));

        return response;
    };
}

export function userOTPConfirmThunk(payload: UserOTPConfirmReq): ReduxThunkAction<Promise<UserOTPConfirmApiRes>> {
    return async function (dispatch, getState) {
        const response = await userOTPConfimReq({ email: payload.email, code: payload.code });

        if (response) {
            response.data?.creator;
            await dispatch(userActionsCreators.otpConfirm(response));

            // save cookie
            const host = window.location.hostname;
            const domain = host.replace('studio.', '');

            cookie.set('auth', response.data?.token, { path: '/', domain });

            if (response.data?.creator)
                dispatch(consignArtworkActionsCreators.checkIsCompletedProfile(response.data?.creator));
        }

        return response;
    };
}

export function userAddThunk(payload: UserAddReq): ReduxThunkAction<Promise<UserAddApiRes>> {
    return async function (dispatch, getState) {
        const response = await userAddReq({ name: payload.name, email: payload.email });
        return response;
    };
}

export function checkCreatorUsernameExistThunk(
    payload: CreatorUsernameExistReq
): ReduxThunkAction<Promise<CreatorUsernameExistApiRes>> {
    return async function (dispatch, getState) {
        const response = await checkCreatorUsernameExist({ username: payload.username });
        return response;
    };
}

export function checkCreatorEmailExistThunk(
    payload: CreatorEmailExistReq
): ReduxThunkAction<Promise<CreatorEmailExistApiRes>> {
    return async function (dispatch, getState) {
        const response = await checkCreatorEmailExist({ email: payload.email });
        return response;
    };
}

export function addCreatorEmailThunk(payload: AddCreatorEmailReq): ReduxThunkAction<Promise<AddCreatorEmailApiRes>> {
    return async function (dispatch, getState) {
        const user = getState().user;

        const response = await addCreatorEmailExist({ id: user._id, email: payload.email, framework: user.framework });

        await dispatch(sendEmailThunk({ email: payload.email }));

        return response;
    };
}

export function sendEmailThunk(payload: SendEmailCodeReq): ReduxThunkAction<Promise<SendEmailCodeApiRes>> {
    return async function (dispatch, getState) {
        const response = await sendEmailCode({ email: payload.email });
        return response;
    };
}

export function verifyCodeThunk(payload: VerifyCodeReq): ReduxThunkAction<Promise<VerifyCodeApiRes>> {
    return async function (dispatch, getState) {
        const response = await verifyCode({ email: payload.email, code: payload.code });
        dispatch(userActionsCreators.change({ emails: response.data?.emails }));
        return response;
    };
}

export function sendRequestUploadThunk(
    payload: CreatorSendRequestUploadReq
): ReduxThunkAction<Promise<CreatorSendRequestUploadApiRes>> {
    return async function (dispatch, getState) {
        const transactionId = payload.transactionId || nanoid();

        if (payload.requestsUpload) {
            dispatch(
                userActionsCreators.requestsUpload({
                    status: 'requested',
                    transactionId,
                })
            );
        } else {
            await dispatch(
                userActionsCreators.requestAvatarUpload({
                    status: 'requested',
                    transactionId,
                })
            );
        }

        const response = await sendRequestUpload({
            mimetype: payload.mimetype,
            originalName: payload.originalName,
            transactionId: transactionId,
            origin: payload.requestsUpload ? 'profileRequests' : 'profile',
        });

        return response;
    };
}

export function creatorAccountThunk(payload: AccountSettingsFormValues): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        const user = getState().user;

        await changeCreator({
            userId: user._id,
            data: {
                name: user.name,
                profile: user.profile,
                emailDefault: payload.emailDefault,
                walletDefault: payload.walletDefault,
                username: payload.username,
                emails: payload.emails as any,
                wallets: payload.wallets,
                links: payload.links,
                myWebsite: payload.myWebsite,
                artworkRecognition: payload.artworkRecognition,
                personalDetails: payload.personalDetails,
                framework: user.framework,
            },
        });

        dispatch(
            userActionsCreators.change({
                emailDefault: payload.emailDefault,
                walletDefault: payload.walletDefault,
                username: payload.username,
                links: payload.links,
                myWebsite: payload.myWebsite,
                artworkRecognition: payload.artworkRecognition,
                personalDetails: payload.personalDetails,
                wallets: payload.wallets,
                emails: payload.emails,
            })
        );

        if (user.vault?.createdAt) {
            const res = await getWalletsVault();
            const newWallets = payload.wallets.filter((v) => !v.archived);
            const oldWallets = (res?.data || []).map((v: string) => ({ address: v }));

            const checkChangeWallets =
                newWallets.length !== oldWallets.length ||
                newWallets.reduce((acc, cur) => {
                    if (!oldWallets.find((v) => v.address === cur.address)) return true;
                    return acc;
                }, false);

            if (checkChangeWallets) {
                const deletedWallets = oldWallets.filter(
                    (w) => !newWallets.map((w2) => w2.address).includes(w.address)
                );

                const addedWallets = newWallets.filter((w) => !oldWallets.map((w2) => w2.address).includes(w.address));

                if (deletedWallets.length) {
                    await deleteWallets({ walletsAddress: deletedWallets.map((v) => v.address) });
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }

                if (addedWallets.length) {
                    await addWallets({ walletsAddress: addedWallets.map((v) => v.address) });
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
            }
        }
    };
}

export function saveStepWizardThunk(payload: SaveStepWizardReq): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        if (payload.step === 0) {
            if (payload.values.deleteKeys?.length) {
                requestDeleteFile({
                    deleteKeys: payload.values.deleteKeys,
                    transactionId: nanoid(),
                    origin: 'profileRequests',
                });
            }
            dispatch(creatorAccountThunk(payload.values));
            return;
        }
    };
}

export function changeAvatarThunk(payload: ChangeAvatarReq): ReduxThunkAction<Promise<ChangeAvatarApiRes>> {
    return async function (dispatch, getState) {
        const avatar = getState().user?.profile?.avatar;
        if (avatar && (payload.fileId === '' || payload.fileId !== avatar)) {
            requestDeleteFile({ deleteKeys: [avatar], transactionId: nanoid() });
        }

        const response = await changeAvatar({
            fileId: payload.fileId,
        });

        if (payload.transactionId)
            dispatch(
                userActionsCreators.requestAvatarUpload({
                    transactionId: payload.transactionId,
                    status: 'finished',
                })
            );

        dispatch(userActionsCreators.changeAvatar({ fileId: payload.fileId }));

        return response;
    };
}

export function generalStorageAvatarThunk(payload: GeneralStorageAvatarReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        dispatch(
            userActionsCreators.requestAvatarUpload({
                transactionId: payload.transactionId,
                status: 'uploading',
            })
        );

        const res = await generalStorageAvatar(payload);

        await dispatch(changeAvatarThunk({ fileId: payload.path, transactionId: payload.transactionId }));

        return res;
    };
}

export function generalStorageThunk(payload: GeneralStorageReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const res = await generalStorage({ ...payload, dispatch });

        dispatch(
            userActionsCreators.requestsUpload({
                transactionId: payload.transactionId,
                status: 'finished',
            })
        );

        return res;
    };
}

export function requestConnectWalletThunk(
    payload: ResquestConnectWalletReq
): ReduxThunkAction<Promise<RequestConnectWalletRes>> {
    return async function (dispatch, getState) {
        const response = await requestConnectWallet(payload);

        if (!response.data?.nonce) throw new Error('nonce not found');

        const signature = await signMessage(config, {
            // account: payload.wallet,
            message: response.data.nonce,
        });

        return { signature };
    };
}

export function verifyConnectWalletThunk(
    payload: VerifyConnectWalletReq
): ReduxThunkAction<Promise<VerifyConnectWalletApiRes>> {
    return async function (dispatch, getState) {
        return verifyConnectWallet(payload);
    };
}

export function requestVaultThunk(): ReduxThunkAction<Promise<void>> {
    return function (dispatch, getState) {
        dispatch(userActionsCreators.setVaultLoading(true));

        const token = getState().user.token;
        const ctrl = new AbortController();

        const url = `${BASE_URL_API}/creators/vault`;
        const headers = {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${token}`,
        };

        return new Promise((resolve, reject) =>
            fetchEventSource(url, {
                method: 'POST',
                headers,
                signal: ctrl.signal,
                onmessage(message) {
                    if (message.event === 'vault_success') {
                        try {
                            const parsed = JSON.parse(message.data);
                            dispatch(userActionsCreators.setVault(parsed));
                        } finally {
                            ctrl.abort();
                            resolve();
                        }
                    }
                    if (message.event === 'vault_error') {
                        ctrl.abort();
                        reject();
                    }
                },
            })
                .finally(() => {
                    dispatch(userActionsCreators.setVaultLoading(false));
                })
                .catch(() => {
                    reject();
                })
        );
    };
}

export function requestSocialXThunk(): ReduxThunkAction<Promise<void>> {
    return function () {
        return requestSocialX().then((response) => {
            if (response.data) {
                window.open(response.data, '_blank');
            }
        });
    };
}

export function requestSocialGoogleThunk(): ReduxThunkAction<Promise<void>> {
    return function () {
        return requestSocialGoogle().then((response) => {
            if (response.data) {
                window.open(response.data, '_blank');
            }
        });
    };
}

export function requestSocialFacebookThunk(): ReduxThunkAction<Promise<void>> {
    return function () {
        return requestSocialFacebook().then((response) => {
            if (response.data) {
                window.open(response.data, '_blank');
            }
        });
    };
}

export function requestMyAssetsThunk({
    page,
    limit,
    status,
    collection,
    sort,
}: RequestMyAssetThunkReq): ReduxThunkAction<Promise<void>> {
    return function (dispatch) {
        return getMyAssets({ page, status, collection, sort, limit }).then((response) => {
            if (response.data) {
                dispatch(
                    userActionsCreators.setMyAssets({
                        data: response.data.data.map((asset: any) => ({
                            _id: asset._id,
                            title: asset.assetMetadata?.context?.formData?.title || 'Untitled',
                            image: !asset?.formats?.preview?.path
                                ? NO_IMAGE_ASSET
                                : `${ASSET_STORAGE_URL}/${asset.formats.preview.path}`,
                            status: asset.consignArtwork?.status || 'Draft',
                            collections: asset?.assetMetadata?.taxonomy?.formData?.collections || [],
                            mintExplorer: asset?.mintExplorer,
                            contractExplorer: asset?.contractExplorer,
                            licenses: asset?.licenses,
                            countComments: asset?.countComments,
                        })),
                        limit: response.data.limit,
                        page: response.data.page,
                        total: response.data.total,
                        totalPage: response.data.totalPage,
                        collection: response.data.collection,
                    })
                );
                dispatch(userActionsCreators.setCollections(response.data.collections));
            }
        });
    };
}

export function getAssetByIdThunk(id: string): ReduxThunkAction<Promise<any>> {
    return async function (dispatch) {
        const response = await getAssetById(id);
        return response;
    };
}

export function removeSocialThunk(data: RemoveSocialReq): ReduxThunkAction<Promise<void>> {
    return function (dispatch) {
        return removeSocial(data).then(() => {
            if (data.social === 'x') {
                dispatch(userActionsCreators.changeSocialsX({ avatar: '', name: '' }));
            }
            if (data.social === 'facebook') {
                dispatch(userActionsCreators.changeSocialsFacebook({ avatar: '', name: '' }));
            }

            if (data.social === 'google') {
                dispatch(userActionsCreators.changeSocialsGoogle({ avatar: '', name: '' }));
            }
        });
    };
}

export function synapsSessionInitThunk(): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const res = await synapsSessionInit();
        if (res.data?.session_id) {
            dispatch(userActionsCreators.setSynapsSessionId(res.data.session_id));
        }
    };
}

export function synapsIndividualSessionThunk(): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const res = await synapsIndividualSession();
        if (res.data?.session) {
            const steps = res.data.session.steps.map((v) => ({ ...v, name: v.type }));
            dispatch(userActionsCreators.setSynapsSteps(steps));
        }
    };
}
