import { ReduxThunkAction } from '@/store';
import { getArtworkTags } from './requests';
import { storesArtworkActions } from './slice';

export function getArtworkTagsThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        const response = await getArtworkTags();
        dispatch(storesArtworkActions.setTags(response));
    };
}
