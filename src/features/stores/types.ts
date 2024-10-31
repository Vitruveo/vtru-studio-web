export interface StoresItem {
    id: string;
    name: string;
    status: string;
    image: string;
}

export interface StoresState {
    loading: boolean;
    data: StoresItem[];
    selectedStore: string;
    error: string | null;
}
