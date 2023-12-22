import type { AppState } from '@/store/index';
import { AssetSliceState } from './types';

/**
 * Returns a field selector function for the asset slice of the Redux state.
 * The field selector function allows selecting specific fields from the asset slice.
 *
 * @template T - The type of fields to select from the asset slice.
 * @param {T[]} fields - An array of field names to select from the asset slice.
 * @returns {FieldSelector<Pick<AssetSliceState, T>>} - The field selector function.
 */

export const assetSelector = <T extends keyof AssetSliceState>(fields: T[]) => {
    return (state: AppState): Pick<AssetSliceState, T> => {
        const selectedFields = {} as Pick<AssetSliceState, T>;

        fields.forEach((field) => {
            selectedFields[field] = state.asset[field];
        });

        return selectedFields;
    };
};
