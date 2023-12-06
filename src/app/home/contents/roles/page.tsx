'use client';

import { useCallback, useEffect, useState } from 'react';
import toastr from 'toastr';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import RoleDetails from '@/app/home/components/apps/roles/RoleDetails';
import RoleList from '@/app/home/components/apps/roles/RoleList';
import RoleSearch from '@/app/home/components/apps/roles/RoleSearch';
import RoleFilter from '@/app/home/components/apps/roles/RoleFilter';
import AppCard from '@/app/home/components/shared/AppCard';
import { RoleType } from '@/mock/roles';
import { PermissionType } from '@/mock/permissions';
import { useDispatch } from '@/store/hooks';
import { roleDeleteThunk } from '@/features/role/thunks';
import RoleAdd from '../../components/apps/roles/RoleAdd';

const drawerWidth = 240;
const secdrawerWidth = 320;

export default function Roles() {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const dispatch = useDispatch();

    const [roles, setRoles] = useState<RoleType[]>([]);
    const [permissions, setPermissions] = useState<PermissionType[]>([]);
    const [roleId, setRoleId] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

    useEffect(() => {
        if (!roleId && roles.length >= 1) {
            setRoleId(roles[0]._id);
        }
    }, [roles]);

    useEffect(() => {
        const sseRoles = new EventSource('http://127.0.0.1:5001/roles');
        const ssePermissions = new EventSource(
            'http://127.0.0.1:5001/permissions'
        );

        sseRoles.addEventListener('role_list', (event) => {
            const role = JSON.parse(event.data);

            setRoles((prevState) => [...prevState, role]);
        });
        sseRoles.addEventListener('close', (event) => {
            sseRoles.close();
        });

        ssePermissions.addEventListener('permission_list', (event) => {
            setPermissions((prevState) => [
                ...prevState,
                JSON.parse(event.data),
            ]);
        });
        ssePermissions.addEventListener('close', (event) => {
            ssePermissions.close();
        });

        return () => {
            sseRoles.close();
            ssePermissions.close();
        };
    }, []);

    const rolesFiltered =
        search.length > 0
            ? roles.filter((role) => role.name.includes(search))
            : [];

    const rolesCategoryFiltered =
        category.length > 0
            ? roles.filter((role) => {
                  return role.permissions.some((permission) => {
                      const [categoryName] = permission.split(':');

                      return category === categoryName;
                  });
              })
            : [];

    const categories = permissions.reduce((acc: string[], cur) => {
        const [categoryName] = cur.key.split(':');
        if (acc.includes(categoryName)) return acc;

        return [...acc, categoryName];
    }, []);

    const onDeleteClick = ({ id }: { id: string }) => {
        if (window.confirm('Are sure want to delete?')) {
            dispatch(roleDeleteThunk({ _id: id }));
            setRoles((prevState) =>
                prevState.filter((item) => item._id !== id)
            );
            if (id === roleId) setRoleId('');
            toastr.success('Record deleted success');
        }
    };

    const handleAddNewRole = useCallback(
        ({
            id,
            name,
            description,
        }: {
            id: string;
            name: string;
            description: string;
        }) => {
            setRoles((prevState) => [
                { _id: id, name, description, permissions: [] },
                ...prevState,
            ]);

            setRoleId(id);
        },
        []
    );

    const handleUpdateRole = useCallback(
        ({
            id,
            name,
            description,
            permissions: permissionsKeys,
        }: {
            id: string;
            name: string;
            description: string;
            permissions: string[];
        }) => {
            setRoles((prevState) =>
                prevState.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            name,
                            description,
                            permissions: permissionsKeys,
                        };
                    }

                    return item;
                })
            );
        },
        []
    );

    return (
        <PageContainer title="Role" description="this is Role">
            <Breadcrumb title="Roles Application" subtitle="List Your Roles" />
            <AppCard>
                <Drawer
                    open={isLeftSidebarOpen}
                    onClose={() => setLeftSidebarOpen(false)}
                    sx={{
                        width: drawerWidth,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            position: 'relative',
                            zIndex: 2,
                        },
                        flexShrink: 0,
                    }}
                    variant={lgUp ? 'permanent' : 'temporary'}
                >
                    <RoleAdd handleAddNewRole={handleAddNewRole} />
                    <RoleFilter
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                    />
                </Drawer>

                <Box
                    sx={{
                        minWidth: secdrawerWidth,
                        width: {
                            xs: '100%',
                            md: secdrawerWidth,
                            lg: secdrawerWidth,
                        },
                        flexShrink: 0,
                    }}
                >
                    <RoleSearch
                        onClick={() => setLeftSidebarOpen(true)}
                        search={search}
                        setSearch={setSearch}
                    />
                    <RoleList
                        roleId={roleId}
                        data={
                            (search.length > 0 && rolesFiltered) ||
                            (category.length > 0 && rolesCategoryFiltered) ||
                            roles
                        }
                        onDeleteClick={onDeleteClick}
                        onRoleClick={({ id }) => setRoleId(id)}
                    />
                </Box>

                <Drawer
                    anchor="right"
                    open={isRightSidebarOpen}
                    onClose={() => setRightSidebarOpen(false)}
                    variant={mdUp ? 'permanent' : 'temporary'}
                    sx={{
                        width: mdUp ? secdrawerWidth : '100%',
                        zIndex: lgUp ? 0 : 1,
                        flex: mdUp ? 'auto' : '',
                        [`& .MuiDrawer-paper`]: {
                            width: '100%',
                            position: 'relative',
                        },
                    }}
                >
                    {mdUp ? (
                        ''
                    ) : (
                        <Box sx={{ p: 3 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => setRightSidebarOpen(false)}
                                sx={{
                                    mb: 3,
                                    display: {
                                        xs: 'block',
                                        md: 'none',
                                        lg: 'none',
                                    },
                                }}
                            >
                                Back{' '}
                            </Button>
                        </Box>
                    )}
                    <RoleDetails
                        roleId={roleId}
                        permissions={permissions}
                        onDeleteClick={onDeleteClick}
                        handleUpdateRole={handleUpdateRole}
                    />
                </Drawer>
            </AppCard>
        </PageContainer>
    );
}
