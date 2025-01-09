import { AxiosError } from 'axios';
import { ReduxThunkAction } from '@/store';
import { getFeatures } from './requests';
import { featuresActionCreators } from './slice';
import { findEmailInAllowList } from '../allowList/requests';

export function getFeaturesThunk(): ReduxThunkAction<Promise<void>> {
    return async function (dispatch, getState) {
        const response = await getFeatures();
        const email = getState().user.login.email;

        try {
            const check = await findEmailInAllowList(email);

            dispatch(featuresActionCreators.setEmailAllowed(check.data || false));
        } catch (error) {
            if ((error as AxiosError).status === 404) {
                dispatch(featuresActionCreators.setEmailAllowed(false));
            }
        }

        if (response.data)
            dispatch(
                featuresActionCreators.setFeatures(
                    response.data.map((v) => ({ ...v, name: v.name.trim().toLowerCase().replace(/\s/g, '') }))
                )
            );
    };
}
