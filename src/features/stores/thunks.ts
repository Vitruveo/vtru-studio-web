import { ReduxThunkAction } from '@/store';
import {
    createNewStore,
    deleteStore,
    getStoreById,
    getStores,
    storeStorage,
    updateStepNameStore,
    validateUrl,
} from './requests';
import { storesActionsCreators } from './slice';
import { StoreStorageParams, UpdateOrganizationParams, ValidateUrlParams } from './types';

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
        dispatch(
            storesActionsCreators.setData({
                data: [response.data!],
                total: 1,
                page: 1,
                totalPage: 1,
                limit: 1,
            })
        );
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

export function validateUrlThunk(data: ValidateUrlParams): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setSelectStoreValidateUrl(null));
        const response = await validateUrl(data);
        dispatch(storesActionsCreators.setSelectStoreValidateUrl(response.data || false));
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
