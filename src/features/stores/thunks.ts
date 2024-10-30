import { ReduxThunkAction } from '@/store';
import { getStores } from './requests';
import { storesActions } from './slice';

export function getStoresThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActions.setStartLoading());
        const response = await getStores();
        dispatch(storesActions.setData(response.data!));
        dispatch(storesActions.setFinishLoading());
    };
}
