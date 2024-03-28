import { AssetStatus } from '@/features/asset/types';
import { ConsignTableStatus } from './CompletedConsignTableStatus';

export const getStatus = (tableStatus: ConsignTableStatus) => {
    switch (tableStatus) {
        case 'Draft':
            return 'draft';
        case 'Preview':
            return 'preview';
        case 'Active':
            return 'published';
        case 'Hidden':
            return 'archived';
        default:
            return '';
    }
};

export const getTableStatus = (status: AssetStatus) => {
    switch (status) {
        case 'draft':
            return 'Draft';
        case 'preview':
            return 'Preview';
        case 'published':
            return 'Active';
        case 'archived':
            return 'Hidden';
        default:
            return 'Draft';
    }
};
