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
