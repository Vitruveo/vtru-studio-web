import cookie from 'cookiejs';
import { AxiosError } from 'axios';
import { ReduxThunkAction } from '@/store';
import { checkFeaturesEmail, getFeatures } from './requests';
import { featuresActionCreators } from './slice';
import { findEmailInAllowList } from '../allowList/requests';

export function getFeaturesThunk(): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const response = await getFeatures();

        const cookieEmail = cookie.get('loggedEmail');
        const email = (cookieEmail as string) || getState().user.login.email;

        const isEmailAllowed = getState().features.isEmailAllowed;
        const list = getState().features.list;

        try {
            const check = await findEmailInAllowList(email);
            if (isEmailAllowed !== check.data) dispatch(featuresActionCreators.setEmailAllowed(check.data || false));
        } catch (error) {
            if ((error as AxiosError).status === 404) {
                if (isEmailAllowed) dispatch(featuresActionCreators.setEmailAllowed(false));
            }
        }

        if (response.data) {
            const myFeatures = await checkFeaturesEmail({ email });
            const formatedList = response.data.map((v) => ({
                name: v.name.trim().toLowerCase().replace(/\s/g, ''),
                released: v.released,
                isOnlyFor: v.isOnlyFor,
                onlyFor: v.onlyFor,
                isEmailInList: myFeatures.data?.includes(v.name),
            }));
            if (JSON.stringify(formatedList) !== JSON.stringify(list)) {
                dispatch(featuresActionCreators.setFeatures(formatedList));
            }
        }
    };
}
