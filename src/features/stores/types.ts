interface Media {
    name: string;
    path: string;
}

interface Formats {
    logo: {
        horizontal: Media;
        vertical: Media;
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

export interface StoresState {
    loading: boolean;
    data: Stores[];
    selectedStore: string;
    error: string | null;
}

export type CreateStoresParams = Pick<Stores, 'organization'>;

export interface UpdateStepNameStoresParams {
    id: string;
    stepName: string;
    data: any;
}

export interface UpdateOrganizationParams {
    id: string;
    data: Organization;
}
