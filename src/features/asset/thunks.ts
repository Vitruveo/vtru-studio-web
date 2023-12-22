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
} from './types';
import { ReduxThunkAction } from '@/store';

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
        dispatch(userActionsCreators.otpConfirm(response));

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
        const response = await addCreatorEmailExist({ id: payload.id, email: payload.email });
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
        }
    };
}
