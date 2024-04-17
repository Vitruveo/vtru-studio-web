import { ReduxThunkAction } from '@/store';
import { ConsignArtworkAssetStatus } from './types';
import { updateAssetStep } from '../asset/requests';
import { consignArtworkActionsCreators } from './slice';
import { toastrActionsCreators } from '../toastr/slice';
import { CONSIGN_ARTWORK_PREVIEW_URL } from '@/constants/consign-artwork';
import cookie from 'cookiejs';

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
            const assetId = getState().asset._id;

            if (assetId) {
                cookie.set('token', getState().user.token, { path: '/', domain: window.location.hostname });
                const URL = `${CONSIGN_ARTWORK_PREVIEW_URL}/preview/${assetId}/${Date.now()}`;
                window.open(URL, '_blank');
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
            }
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
