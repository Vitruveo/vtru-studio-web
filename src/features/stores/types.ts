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
    url: string;
    name: string;
    description: string | null;
    markup: number;
    formats: Formats | null;
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
    framework: Framework;
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

export interface Task {
    id: string;
    name: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    to?: string;
}
export interface StoresState {
    loading: boolean;
    data: Stores[];
    selectedStore: {
        id: string;
        validateUrl: null | boolean;
    };
    error: string | null;
    isSubmittingFiles: boolean;
    requestStoreUpload: { [key: string]: RequestStoreUpload };
    tasks: Task[];
}

export type CreateStoresParams = Pick<Stores, 'organization'>;

export interface UpdateStepNameStoresParams {
    id: string;
    stepName: string;
    data: any;
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
