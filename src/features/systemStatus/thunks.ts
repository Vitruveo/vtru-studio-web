import { ReduxThunkAction } from '@/store';
import { actions } from './slice';
import { loadSystemStatus } from './requests';

export function loadSystemStatusThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        try {
            dispatch(actions.startLoading());
            const response = await loadSystemStatus();
            dispatch(actions.setData(response.data));
        } catch (error) {
            dispatch(actions.setError((error as Error).message));
        } finally {
            dispatch(actions.finishLoading());
        }
    };
}
