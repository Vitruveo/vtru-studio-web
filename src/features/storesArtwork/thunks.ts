import { ReduxThunkAction } from '@/store';
import {
    createStoreArtwork,
    getArtsAndArtists,
    getArtsAndArtistsForInclude,
    getArtworkCollections,
    getArtworkCreatorName,
    getArtworkQuantity,
    getArtworkSubject,
    getArtworkTags,
    getCreatorAvatar,
} from './requests';
import {
    ArtsAndArtistsList,
    Collections,
    CreateStoreArtworkParams,
    GetArtsAndArtistsForIncludeParams,
    GetArtsAndArtistsParams,
    GetArtworkQuantityParams,
    Names,
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
    storesId,
}: GetArtworkQuantityParams): ReduxThunkAction<Promise<number>> {
    return async (_dispatch: any) => {
        const response = await getArtworkQuantity({
            price,
            colorPrecision,
            hasBts,
            filters,
            storesId,
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
    page,
    limit,
}: GetArtsAndArtistsParams): ReduxThunkAction<Promise<ArtsAndArtistsList>> {
    return async (_dispatch: any) => {
        const response = await getArtsAndArtists({
            price,
            colorPrecision,
            hasBts,
            filters,
            onlyInStore,
            search,
            page,
            limit,
        });
        return {
            arts: response.data.map((item) => ({
                id: item._id,
                image: item.formats.preview.path,
                title: item.assetMetadata.context.formData.title,
                isHide: false,
            })),
            artists: response.data.reduce((acc, current) => {
                if (!acc.find((item: any) => item.id === current.framework.createdBy)) {
                    acc.push({
                        id: current.framework.createdBy,
                        name: current.creator.username,
                        avatar: current.formats.preview.path,
                        isHide: false,
                    });
                }
                return acc;
            }, []),
            page: response.page,
            total: response.total,
            totalPage: response.totalPage,
            limit: response.limit,
        };
    };
}

export function getArtsAndArtistsForIncludeThunk({
    search,
    page,
    limit,
}: GetArtsAndArtistsForIncludeParams): ReduxThunkAction<Promise<ArtsAndArtistsList>> {
    return async (_dispatch: any) => {
        const response = await getArtsAndArtistsForInclude({
            search,
            page,
            limit,
        });
        return {
            arts: response.data.map((item) => ({
                id: item._id,
                image: item.formats.preview.path,
                title: item.assetMetadata.context.formData.title,
                isHide: false,
            })),
            artists: response.data.reduce((acc, current) => {
                if (!acc.find((item: any) => item.id === current.framework.createdBy)) {
                    acc.push({
                        id: current.framework.createdBy,
                        name: current.creator.username,
                        avatar: current.formats.preview.path,
                        isHide: false,
                    });
                }
                return acc;
            }, []),
            page: response.page,
            total: response.total,
            totalPage: response.totalPage,
            limit: response.limit,
        };
    };
}

export function getCreatorAvatarThunk(creatorId: string): ReduxThunkAction<Promise<string>> {
    return async (_dispatch: any) => {
        const response = await getCreatorAvatar(creatorId);
        return response;
    };
}
