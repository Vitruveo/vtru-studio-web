import { nanoid } from '@reduxjs/toolkit';
import { StepsFormValues } from '@/app/home/components/wizard/types';
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
} from './types';
import { ReduxThunkAction } from '@/store';
import { getAssetThunk } from '../asset/thunks';
import { AccountSettingsFormValues } from '@/app/home/myProfile/types';
import { consignArtworkActionsCreators } from '../consignArtwork/slice';

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
            await dispatch(getAssetThunk());
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
        const transactionId = nanoid();

        await dispatch(
            userActionsCreators.requestAvatarUpload({
                status: 'requested',
                transactionId,
            })
        );

        const response = await sendRequestUpload({
            mimetype: payload.mimetype,
            originalName: payload.originalName,
            transactionId: transactionId,
        });

        return response;
    };
}

export function creatorAccountThunk(payload: StepsFormValues | AccountSettingsFormValues): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        const user = getState().user;

        await changeCreator({
            userId: user._id,
            data: {
                name: user.name,
                profile: user.profile,
                username: payload.username,
                emails: payload.emails as any,
                wallets: payload.wallets,
                framework: user.framework,
            },
        });

        dispatch(
            userActionsCreators.change({
                username: payload.username,
                wallets: payload.wallets,
                emails: payload.emails,
            })
        );
    };
}

export function saveStepWizardThunk(payload: SaveStepWizardReq): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        if (payload.step === 0) {
            dispatch(creatorAccountThunk(payload.values));
            return;
        }
    };
}

export function changeAvatarThunk(payload: ChangeAvatarReq): ReduxThunkAction<Promise<ChangeAvatarApiRes>> {
    return async function (dispatch, getState) {
        const response = await changeAvatar({
            fileId: payload.fileId,
        });

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

        const res = await generalStorage(payload);

        await dispatch(changeAvatarThunk({ fileId: payload.path, transactionId: payload.transactionId }));

        return res;
    };
}
