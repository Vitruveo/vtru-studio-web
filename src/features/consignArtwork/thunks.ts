import { ReduxThunkAction } from '@/store';
import { ConsignArtworkAssetStatus } from './types';
import { updateAssetStep } from '../asset/requests';
import { consignArtworkActionsCreators } from './slice';
import { toastrActionsCreators } from '../toastr/slice';

export function updateStatus(status: ConsignArtworkAssetStatus): ReduxThunkAction {
    return async (dispatch, getState) => {
        try {
            await updateAssetStep({
                stepName: 'consignArtworkStatus',
                consignArtwork: {
                    status: status,
                },
            });
            dispatch(consignArtworkActionsCreators.changeConsignArtworkAssetStatus({ status: status }));
            dispatch(
                toastrActionsCreators.displayToastr({
                    message: 'Consign artwork status updated',
                    type: 'success',
                })
            );
        } catch (error) {
            dispatch(
                toastrActionsCreators.displayToastr({
                    message: 'Error updating consign artwork status',
                    type: 'error',
                })
            );
        }
    };
}

export function checkPreview(): ReduxThunkAction {
    return async (dispatch, getState) => {
        try {
            await updateAssetStep({
                stepName: 'consignArtworkListing',
                consignArtwork: {
                    listing: new Date().toISOString(),
                },
            });
            dispatch(
                consignArtworkActionsCreators.changePreviewAndConsign({
                    artworkListing: {
                        checked: true,
                    },
                })
            );
        } catch (error) {
            dispatch(
                toastrActionsCreators.displayToastr({
                    message: 'Error checking preview',
                    type: 'error',
                })
            );
        }
    };
}

export const consignArtworkThunks = {
    updateStatus,
    checkPreview,
};
