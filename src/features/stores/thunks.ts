import { ReduxThunkAction } from '@/store';
import { createNewStore, deleteStore, getStoreById, getStores } from './requests';
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

export function createNewStoreThunk(id?: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActions.setStartLoading());
        const response = await createNewStore(id);
        dispatch(storesActions.setSelectedStore(response.data!.insertedId));
        dispatch(storesActions.setFinishLoading());
    };
}

export function deleteStoreThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        await deleteStore(id);
        dispatch(storesActions.removeStore(id));
    };
}
