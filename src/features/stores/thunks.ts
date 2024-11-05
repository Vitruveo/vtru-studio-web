import { ReduxThunkAction } from '@/store';
import { createNewStore, deleteStore, getStoreById, getStores, updateStepNameStore } from './requests';
import { storesActions } from './slice';
import { UpdateOrganizationParams, UpdateStepNameStoresParams } from './types';

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
        dispatch(storesActions.setSelectedStore(response.data!.insertedId));
        dispatch(storesActions.setFinishLoading());
    };
}

export function updateOrganizationThunk(data: UpdateOrganizationParams): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        await updateStepNameStore({
            stepName: 'organization',
            id: data.id,
            data: data.data,
        });
        // dispatch(storesActions.updateStore({ id: data.id, data }));
    };
}

export function deleteStoreThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        await deleteStore(id);
        dispatch(storesActions.removeStore(id));
    };
}
