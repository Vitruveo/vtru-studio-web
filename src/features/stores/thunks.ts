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
import { GetStoresParams, StoreStorageParams, UpdateOrganizationParams, ValidateUrlParams } from './types';
import { hasTruthyObject } from '@/utils/truthyObject';

export function getStoresThunk(data?: GetStoresParams): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        dispatch(storesActionsCreators.setSelectedStore(''));

        const response = await getStores(data);
        dispatch(storesActionsCreators.setData(response.data!));
        dispatch(storesActionsCreators.setFinishLoading());
    };
}

export function getStoreByIdThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        const response = await getStoreById(id);
        const { data } = response;
        dispatch(
            storesActionsCreators.setData({
                data: [data!],
                total: 1,
                page: 1,
                totalPage: 1,
                limit: 1,
            })
        );

        const isCompleted =
            data?.organization?.url && data?.organization?.name && data?.organization?.formats?.logo?.square?.path;
        const isInProgress = hasTruthyObject(data?.organization);

        if (isCompleted) {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'Completed' }));
        } else if (isInProgress) {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'In Progress' }));
        } else {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'Not Started' }));
        }

        dispatch(storesActionsCreators.setFinishLoading());
    };
}

export function createNewStoreThunk(id?: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        const response = await createNewStore(id);
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
