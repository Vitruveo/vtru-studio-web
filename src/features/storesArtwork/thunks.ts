import { ReduxThunkAction } from '@/store';
import {
    createStoreArtwork,
    getArtsAndArtists,
    getArtworkCollections,
    getArtworkCreatorName,
    getArtworkQuantity,
    getArtworkSubject,
    getArtworkTags,
} from './requests';
import {
    ArtsAndArtistsList,
    Collections,
    CreateStoreArtworkParams,
    GetArtsAndArtistsParams,
    GetArtworkQuantityParams,
    Names,
    ResponseAssets,
    Subject,
    Tags,
} from './types';

export function getArtworkTagsThunk(): ReduxThunkAction<Promise<Tags[]>> {
    return async (_dispatch: any) => {
        const response = await getArtworkTags();
        return response;
    };
}

export function getArtworkCollectionsThunk(collection: string): ReduxThunkAction<Promise<Collections[]>> {
    return async (_dispatch: any) => {
        const response = await getArtworkCollections(collection);
        return response;
    };
}

export function getArtworkSubjectThunk(subject: string): ReduxThunkAction<Promise<Subject[]>> {
    return async (_dispatch: any) => {
        const response = await getArtworkSubject(subject);
        return response;
    };
}

export function getArtworkCreatorNameThunk(name: string): ReduxThunkAction<Promise<Names[]>> {
    return async (_dispatch: any) => {
        const response = await getArtworkCreatorName(name);
        return response;
    };
}

export function createStoreArtworkThunk(data: CreateStoreArtworkParams): ReduxThunkAction<Promise<void>> {
    return async (_dispatch: any) => {
        await createStoreArtwork(data);
    };
}

export function getArtworkQuantityThunk({
    price,
    hasBts,
    filters,
    colorPrecision,
}: GetArtworkQuantityParams): ReduxThunkAction<Promise<number>> {
    return async (_dispatch: any) => {
        const response = await getArtworkQuantity({
            price,
            colorPrecision,
            hasBts,
            filters,
        });
        return response;
    };
}

export function getArtsAndArtistsThunk({
    price,
    hasBts,
    filters,
    colorPrecision,
    onlyInStore,
    search,
}: GetArtsAndArtistsParams): ReduxThunkAction<Promise<ArtsAndArtistsList>> {
    return async (_dispatch: any) => {
        const response = await getArtsAndArtists({
            price,
            colorPrecision,
            hasBts,
            filters,
            onlyInStore,
            search,
        });
        return {
            arts: response.data.map((item) => ({
                id: item._id,
                image: item.formats.display.path,
                title: item.assetMetadata.context.formData.title,
                isHide: false,
            })),
            artists: response.data.map((item) => ({
                id: item.framework.createdBy,
                avatar: item.formats.display.path,
                name: item.creator.username,
                isHide: false,
            })),
        };
    };
}
