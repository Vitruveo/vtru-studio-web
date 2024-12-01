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
    data: {
        general: {
            shortcuts?: {
                hideNudity?: boolean;
                hideAI?: boolean;
                photography?: boolean;
                animation?: boolean;
                physicalArt?: boolean;
                digitalArt?: boolean;
                includeSold?: boolean;
                hasBTS?: boolean;
            };
            licenses?: {
                minPrice?: number;
                maxPrice?: number;
                enabled?: boolean;
            };
        };
        context: {
            culture?: [string, string][];
            mood?: [string, string][];
            orientation?: [string, string][];
            precision?: number;
            colors?: string[];
        };
        taxonomy: {
            objectType?: [string, string][];
            tags?: [string, string][];
            collections?: [string, string][];
            aiGeneration?: [string, string][];
            arEnabled?: [string, string][];
            nudity?: [string, string][];
            category?: [string, string][];
            medium?: [string, string][];
            style?: [string, string][];
            subject?: [string, string][];
        };
        artists: {
            name?: [string, string][];
            nationality?: [string, string][];
            residence?: [string, string][];
        };
    };
}
