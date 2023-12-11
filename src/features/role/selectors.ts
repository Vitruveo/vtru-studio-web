import { AppState } from '../../store';
import { RoleSliceState } from './types';

/**
 * Returns a field selector function for the user slice of the Redux state.
 * The field selector function allows selecting specific fields from the user slice.
 *
 * @template T - The type of fields to select from the user slice.
 * @param {T[]} fields - An array of field names to select from the user slice.
 * @returns {FieldSelector<Pick<RoleSliceState, T>>} - The field selector function.
 */

export const roleSelector = <T extends keyof RoleSliceState>(fields: T[]) => {
  return (state: AppState['role']): Pick<RoleSliceState, T> => {
    const selectedFields = {} as Pick<RoleSliceState, T>;

    fields.forEach((field) => {
      selectedFields[field] = state[field];
    });

    return selectedFields;
  };
};
