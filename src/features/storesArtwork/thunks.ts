import { ReduxThunkAction } from '@/store';
import { getArtworkCollections, getArtworkCreatorName, getArtworkSubject, getArtworkTags } from './requests';
import { storesArtworkActions } from './slice';

export function getArtworkTagsThunk(): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        const response = await getArtworkTags();
        dispatch(storesArtworkActions.setTags(response));
    };
}

export function getArtworkCollectionsThunk(collection: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        const response = await getArtworkCollections(collection);
        dispatch(storesArtworkActions.setCollections(response));
    };
}

export function getArtworkSubjectThunk(subject: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        const response = await getArtworkSubject(subject);
        dispatch(storesArtworkActions.setSubject(response));
    };
}

export function getArtworkCreatorNameThunk(name: string): ReduxThunkAction<Promise<void>> {
    return async (dispatch: any) => {
        const response = await getArtworkCreatorName(name);
        dispatch(storesArtworkActions.setName(response));
    };
}
