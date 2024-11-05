import { ReduxThunkAction } from '@/store';
import { createNewStore, deleteStore, getStoreById, getStores, storeStorage, updateStepNameStore } from './requests';
import { storesActionsCreators } from './slice';
import { StoreStorageParams, UpdateOrganizationParams } from './types';

export function getStoresThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        dispatch(storesActionsCreators.setSelectedStore(''));

        const response = await getStores();
        dispatch(storesActionsCreators.setData(response.data!));
        dispatch(storesActionsCreators.setFinishLoading());
    };
}

export function getStoreByIdThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        const response = await getStoreById(id);
        dispatch(storesActionsCreators.setData([response.data!]));
        dispatch(storesActionsCreators.setFinishLoading());
    };
}

export function createNewStoreThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        const response = await createNewStore();
        dispatch(storesActionsCreators.setSelectedStore(response.data!.insertedId));
        dispatch(storesActionsCreators.setFinishLoading());
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
        dispatch(storesActionsCreators.removeStore(id));
    };
}

export function storeStorageThunk({
    file,
    url,
    transactionId,
}: Omit<StoreStorageParams, 'dispatch'>): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(
            storesActionsCreators.requestStoreUpload({
                transactionId,
                status: 'uploading',
            })
        );

        await storeStorage({
            file,
            url,
            dispatch,
            transactionId,
        });

        dispatch(
            storesActionsCreators.requestStoreUpload({
                transactionId,
                status: 'done',
            })
        );
    };
}
