import { Artworks } from '../stores/types';

export interface StoreArtworkState {
    tags: Tags[];
    collections: Collections[];
    subject: Subject[];
    name: Collections[];
}

export interface Tags {
    tag: string;
    count: number;
}

export interface Collections {
    count: number;
    collection: string;
}

export interface Subject {
    count: number;
    subject: string;
}

export interface Names {
    count: number;
    collection: string;
}

export interface ResponseAssets {
    data: any[];
    tags: Tags[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
    maxPrice: number;
}

export interface CreateStoreArtworkParams {
    id: string;
    stepName: string;
    data: Artworks;
}

export interface GetArtworkQuantityParams {
    price?: { min?: number; max?: number };
    colorPrecision: number;
    hasBts: string;
    filters: Artworks;
    storesId: string;
}

export interface GetArtsAndArtistsParams {
    price?: { min?: number; max?: number };
    colorPrecision: number;
    hasBts: string;
    filters: Artworks;
    search: string;
    onlyInStore: boolean;
    page: number;
    limit: number;
}

export interface GetArtsAndArtistsForIncludeParams {
    search: string;
    page: number;
    limit: number;
}

export interface ArtsAndArtistsList {
    arts: {
        id: string;
        title: string;
        image: string;
        isHide: boolean;
    }[];
    artists: {
        id: string;
        name: string;
        avatar: string;
        isHide: boolean;
    }[];
    page: number;
    total: number;
    totalPage: number;
    limit: number;
}

export interface BuidlQuery {
    [key: string]:
    | string
    | {
        $in: string[];
    }
    | {
        [key: string]: {
            $regex: string;
            $options: string;
        };
    }[];
}
