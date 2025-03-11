import { ReduxThunkAction } from '@/store';
import {
    createNewStore,
    deleteStore,
    getStoreById,
    getStores,
    storeStorage,
    updateStatusStore,
    updateStepNameStore,
    updateStoreVisibility,
    validateUrl,
} from './requests';
import { storesActionsCreators } from './slice';
import {
    GetStoresParams,
    StoreStatus,
    StoreStorageParams,
    UpdateAppearanceContentParams,
    UpdateOrganizationParams,
    UpdateStatusParams,
    ValidateUrlParams,
    StepStatus,
    UpdateStoreVisibilityParams,
} from './types';
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

        const isOrganizationCompleted =
            data?.organization?.url && data?.organization?.name && data?.organization?.formats?.logo?.square?.path;
        const isOrganizationInProgress = hasTruthyObject(data?.organization);
        const isArtworksCompleted = !!data?.artworks;
        const isAppearanceContentCompleted = !!data?.appearanceContent;

        const reviewAndPublishStatus: { [key in StoreStatus]: StepStatus } = {
            draft: 'Not Started',
            pending: 'In Progress',
            inactive: 'Not Approved',
            active: 'Completed',
            hidden: 'Completed',
        };

        if (isOrganizationCompleted) {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'Completed' }));
        } else if (isOrganizationInProgress) {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'In Progress' }));
        } else {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'organization', status: 'Not Started' }));
        }

        if (isArtworksCompleted) {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'artworks', status: 'Completed' }));
        } else {
            dispatch(storesActionsCreators.setPublishStoreStatusStep({ step: 'artworks', status: 'Not Started' }));
        }

        if (isAppearanceContentCompleted) {
            dispatch(
                storesActionsCreators.setPublishStoreStatusStep({ step: 'appearanceContent', status: 'Completed' })
            );
        } else {
            dispatch(
                storesActionsCreators.setPublishStoreStatusStep({ step: 'appearanceContent', status: 'Not Started' })
            );
        }

        dispatch(
            storesActionsCreators.setPublishStoreStatusStep({
                step: 'reviewPublish',
                status: reviewAndPublishStatus[data!.status as StoreStatus],
            })
        );
        dispatch(storesActionsCreators.setFinishLoading());
    };
}

export function createNewStoreThunk(id?: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStartLoading());
        createNewStore(id)
            .then((response) => {
                if (id) {
                    dispatch(getStoresThunk());
                    return;
                }
                dispatch(storesActionsCreators.setSelectedStore(response.data!.insertedId));
            })
            .finally(() => {
                dispatch(storesActionsCreators.setFinishLoading());
            });
    };
}

export function updateOrganizationThunk(data: UpdateOrganizationParams): ReduxThunkAction<Promise<void>> {
    return async (_dispatch: any) => {
        await updateStepNameStore({
            stepName: 'organization',
            id: data.id,
            data: data.data,
        });
    };
}

export function updateAppearanceContentThunk(data: UpdateAppearanceContentParams): ReduxThunkAction<Promise<void>> {
    return async (_dispatch: any) => {
        await updateStepNameStore({
            stepName: 'appearanceContent',
            id: data.id,
            data: data.data,
        });
    };
}

export function deleteStoreThunk(id: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        await deleteStore(id);
        dispatch(storesActionsCreators.removeStore(id));
    };
}

export function validateUrlThunk(
    data: ValidateUrlParams
): ReduxThunkAction<Promise<{ data: boolean | undefined; message: string }>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setSelectStoreValidateUrl(null));
        const response = await validateUrl(data);
        dispatch(storesActionsCreators.setSelectStoreValidateUrl(response.data || false));
        return {
            data: response.data,
            message: response.message,
        };
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

export function updateStatusThunk(data: UpdateStatusParams): ReduxThunkAction<Promise<void>> {
    return async (_dispatch: any) => {
        await updateStatusStore({
            id: data.id,
            status: data.status,
        });
    };
}

export function updateStoreVisibilityThunk(data: UpdateStoreVisibilityParams): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        dispatch(storesActionsCreators.setStoreVisibility({ id: data.id, status: data.status }));
        updateStoreVisibility({
            id: data.id,
            status: data.status,
        }).catch(() => {
            dispatch(
                storesActionsCreators.setStoreVisibility({
                    id: data.id,
                    status: data.status === 'active' ? 'hidden' : 'active',
                })
            );
        });
    };
}
