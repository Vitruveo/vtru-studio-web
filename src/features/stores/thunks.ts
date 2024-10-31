import { ReduxThunkAction } from '@/store';
import { createNewStore, getStoreById, getStores } from './requests';
import { storesActions } from './slice';

export function getStoresThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActions.setStartLoading());
        dispatch(storesActions.setSelectedStore(''));

        const response = await getStores();
        dispatch(storesActions.setData(response.data!));
        dispatch(storesActions.setFinishLoading());
    };
}

export function getStoreByIdThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActions.setStartLoading());
        const response = await getStoreById(id);
        dispatch(storesActions.setData([response.data!]));
        dispatch(storesActions.setFinishLoading());
    };
}

export function createNewStoreThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActions.setStartLoading());
        const response = await createNewStore();
        dispatch(storesActions.setSelectedStore(response.data!));
        dispatch(storesActions.setFinishLoading());
    };
}
