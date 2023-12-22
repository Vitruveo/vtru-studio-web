import { StepsFormValues } from '@/app/home/components/wizard/types';
import {
    userLoginReq,
    userAddReq,
    userOTPConfimReq,
    checkCreatorUsernameExist,
    checkCreatorEmailExist,
    addCreatorEmailExist,
    sendRequestUploadExist,
    assetStorage,
    changeCreator,
    sendEmailCode,
    verifyCode,
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
    AssetStorageReq,
    SaveStepWizardReq,
    SendEmailCodeApiRes,
    SendEmailCodeReq,
    VerifyCodeReq,
    VerifyCodeApiRes,
} from './types';
import { ReduxThunkAction } from '@/store';
import { assetUpdateStepThunk, getAssetThunk } from '../asset/thunks';

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
            await dispatch(userActionsCreators.otpConfirm(response));
            await dispatch(getAssetThunk());
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
        const response = await sendRequestUploadExist({
            mimetype: payload.mimetype,
            originalName: payload.originalName,
        });

        dispatch(userActionsCreators.requestAssetUpload({ transactionId: response.transaction }));

        return response;
    };
}

export function assetStorageThunk(payload: AssetStorageReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
        });

        return response;
    };
}

export function creatorAccountThunk(payload: StepsFormValues): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        const user = getState().user;

        let isChanged = false;

        isChanged = isChanged || payload.username !== user.username;
        isChanged = isChanged || !payload.emails.every((v) => user.emails.find((userV) => userV.email === v.email));
        isChanged =
            isChanged || !payload.wallets.every((v) => user.wallets.find((userV) => userV.address === v.address));

        if (isChanged) {
            await changeCreator({
                userId: user._id,
                data: {
                    name: user.name,
                    profile: user.profile,
                    username: payload.username,
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
        }
    };
}

export function saveStepWizardThunk(payload: SaveStepWizardReq): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        if (payload.step === 0) {
            dispatch(creatorAccountThunk(payload.values));
            return;
        }
        if (payload.step === 2) {
            dispatch(assetUpdateStepThunk(payload.values));
        }
        if (payload.step === 3) {
            dispatch(assetUpdateStepThunk(payload.values));
        }
        if (payload.step === 4) {
            dispatch(assetUpdateStepThunk(payload.values));
        }
        if (payload.step === 5) {
            dispatch(assetUpdateStepThunk(payload.values));
        }
    };
}
