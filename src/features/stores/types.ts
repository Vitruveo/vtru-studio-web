interface Media {
    name: string;
    path: string;
}

export interface Formats {
    logo: {
        horizontal: Media;
        square: Media;
    };
    banner: Media;
}

interface Organization {
    url: string | null;
    name: string;
    description: string | null;
    markup: number;
    formats: Formats | null;
}

export interface Artworks {
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
        culture?: string[];
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
}

interface Framework {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}

export interface Stores {
    _id: string;
    organization: Organization;
    artworks: Artworks;
    framework: Framework;
    status: StoreStatus;
}

export interface RequestStoreUpload {
    transactionId: string;
    url: string;
    key: string;
    path: string;
    status: string;
    uploadProgress: number;
    format: string;
}

export type StepStatus = 'Not Started' | 'Completed' | 'In Progress';
export type StoreStatus = 'draft' | 'active' | 'inactive';

export interface CompletedSteps {
    status: StepStatus;
    label: string;
    optional?: boolean;
}
export interface PublishStore {
    organization: CompletedSteps;
    artworks: CompletedSteps;
    appearanceContent: CompletedSteps;
    reviewPublish: CompletedSteps;
}

export interface StoresState {
    loading: boolean;
    data: StorePaginated;
    selectedStore: {
        id: string;
        validateUrl: null | boolean;
    };
    filters: {
        status: string;
    };
    error: string | null;
    isSubmittingFiles: boolean;
    requestStoreUpload: { [key: string]: RequestStoreUpload };
    publishStore: PublishStore;
    status: StoreStatus;
}

export type CreateStoresParams = Pick<Stores, 'organization'>;

export interface UpdateStepNameStoresParams {
    id: string;
    stepName: string;
    data: any;
}

export interface GetStoresParams {
    status?: string;
    page?: number;
    limit?: number;
    sort?: string;
}

export interface UpdateOrganizationParams {
    id: string;
    data: Omit<Organization, 'formats'>;
}

export interface ValidateUrlParams {
    storeId: string;
    url: string;
}

export interface StoreStorageParams {
    url: string;
    file: File;
    dispatch: any;
    transactionId: string;
}

export interface StorePaginated {
    data: Stores[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
}
