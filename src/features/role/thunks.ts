import { createAppAsyncThunk } from '../../store/asyncThunk';
import { createRole, updateRole } from './requests';
import { RoleApiRes, RoleReq } from './types';

// export const roleFindManyThunk = createAppAsyncThunk<RoleRes[]>(
//     'roles/findmany',
//     async () => {
//         try {
//             const response = await findManyRoles();
//             return response;
//         } catch (error) {
//             return rejectWithValue(error as string);
//         }
//     }
// );

export const roleCreateThunk = createAppAsyncThunk<RoleApiRes, RoleReq>(
    'roles/create',
    async ({ name, description, permissions }, { rejectWithValue }) => {
        try {
            const response = await createRole({
                name,
                description,
                permissions,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const roleUpdateThunk = createAppAsyncThunk<RoleApiRes, RoleReq>(
    'roles/update',
    async ({ name, description, permissions }, { rejectWithValue }) => {
        try {
            const response = await updateRole({
                name,
                description,
                permissions,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
