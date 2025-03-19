'use client';

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Pagination,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { IconCopyPlus, IconPlus, IconTrash } from '@tabler/icons-react';
import Select from 'react-select';
import Image from 'next/image';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { createNewStoreThunk, deleteStoreThunk, getStoresThunk } from '@/features/stores/thunks';
import type { GetStoresParams, StorePaginated, Stores } from '@/features/stores/types';
import { storesActionsCreators } from '@/features/stores/slice';
import { NO_IMAGE_ASSET, STORE_STORAGE_URL } from '@/constants/asset';
import { useTheme } from '@mui/material/styles';
interface StoreProps {
    data: {
        store: StorePaginated;
        loading: boolean;
        openDeleteDialog: boolean;
        storeParams: GetStoresParams;
    };
    actions: {
        handleDelete: (id: string) => void;
        handleDeleteConfirm: () => void;
        handleDeleteCancel: () => void;
        handleCreateNewStore: (id?: string) => void;
        handleSelectStore: (id: string) => void;
        handleSelectFilter: (selectedFilter: string) => void;
        handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
        handleSelectSort: (selectedSort: string) => void;
    };
}

const Component = ({ data, actions }: StoreProps) => {
    const theme = useTheme();
    const smUp = useMediaQuery((t: Theme) => t.breakpoints.up('sm'));
    const { store, loading, openDeleteDialog, storeParams } = data;
    const {
        handleDelete,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleCreateNewStore,
        handleSelectStore,
        handleSelectFilter,
        handleChangePage,
        handleSelectSort,
    } = actions;

    return (
        <Box p={2}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent={smUp ? 'space-between' : 'center'}
                paddingBlock={2}
                pr={2}
                bgcolor="#e5e7eb"
                borderRadius={1}
                gap={2}
                flexWrap="wrap"
            >
                <Link
                    href="/stores/publish"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    onClick={() => handleCreateNewStore()}
                >
                    <Button>
                        <IconPlus />
                    </Button>
                    <Typography variant="h4">Publish a new Folio</Typography>
                </Link>
                <Select
                    placeholder="Duplicate Folio"
                    options={store.data.map((item) => ({
                        value: item._id,
                        label: item.organization?.url || 'Untitled',
                    }))}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            minWidth: 200,
                            width: 'auto',
                        }),
                    }}
                    onChange={(selectedOption) => {
                        handleCreateNewStore(selectedOption?.value);
                    }}
                />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" paddingBlock={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h5">Sort:</Typography>
                    <Select
                        placeholder="Sort by"
                        options={[
                            { value: 'createdNew', label: 'Created - New to Old' },
                            { value: 'createdOld', label: 'Created - Old to New' },
                            { value: 'nameAZ', label: 'Name - a-z' },
                            { value: 'nameZA', label: 'Name - z-a' },
                        ]}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                minWidth: 200,
                                width: 'auto',
                            }),
                        }}
                        onChange={(selectedOption) => {
                            handleSelectSort(selectedOption!.value);
                        }}
                    />
                </Box>
                <Box display="flex" gap={2}>
                    {['Draft', 'Active', 'Inactive', 'All'].map((item) => {
                        return (
                            <Typography
                                key={item}
                                fontSize={18}
                                color={storeParams.status === item.toLowerCase() ? 'primary' : 'black'}
                                style={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleSelectFilter(item)}
                            >
                                {item}
                            </Typography>
                        );
                    })}
                </Box>
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                gap={4}
                paddingBlock={2}
                overflow={'auto'}
                maxHeight={'calc(100vh - 280px)'}
            >
                {loading ? (
                    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                        <CircularProgress size={100} />
                    </Box>
                ) : (
                    store.data?.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href="/stores/publish"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                onClick={() => {
                                    handleSelectStore(item._id);
                                }}
                            >
                                <Box position="relative" width={200}>
                                    <Tooltip title="Duplicate Folio" placement="top">
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                backgroundColor: 'white',
                                                padding: 5,
                                                borderRadius: 5,
                                            }}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                handleCreateNewStore(item._id);
                                            }}
                                        >
                                            <IconCopyPlus color={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Folio" placement="top">
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                top: 60,
                                                right: 10,
                                                backgroundColor: 'white',
                                                padding: 5,
                                                borderRadius: 5,
                                            }}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                handleDelete(item._id);
                                            }}
                                        >
                                            <IconTrash color="red" />
                                        </IconButton>
                                    </Tooltip>
                                    <Image
                                        src={
                                            item.organization?.formats?.logo?.square?.path
                                                ? `${STORE_STORAGE_URL}/${item.organization.formats?.logo.square.path}`
                                                : NO_IMAGE_ASSET
                                        }
                                        alt="Folio Image"
                                        width={200}
                                        height={200}
                                        style={{
                                            borderTopLeftRadius: 5,
                                            borderTopRightRadius: 5,
                                            objectFit: 'cover',
                                        }}
                                    />

                                    <Box
                                        bgcolor="#e5e7eb"
                                        padding={1}
                                        mt={-1}
                                        sx={{
                                            borderBottomLeftRadius: 5,
                                            borderBottomRightRadius: 5,
                                        }}
                                    >
                                        <Typography fontSize={16}>{item?.organization?.url || 'Untitled'}</Typography>
                                        <Typography variant="h5">{item?.organization?.name || 'N/A Name'}</Typography>
                                        <Typography
                                            fontSize={16}
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {item.status}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        );
                    })
                )}
            </Box>
            <Box display="flex" justifyContent="center" paddingBlock={2}>
                <Pagination count={store.totalPage} page={store.page} color="primary" onChange={handleChangePage} />
            </Box>

            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Delete Store'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this folio?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="outlined">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default function Stores() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.stores);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<string | null>(null);
    const [getStoresParams, setGetStoresParams] = useState<GetStoresParams>({
        status: 'all',
        page: 1,
        limit: 24,
        sort: 'createdNew',
    });

    useEffect(() => {
        dispatch(getStoresThunk());
    }, []);

    const handleDelete = (id: string) => {
        setStoreToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (storeToDelete) {
            dispatch(deleteStoreThunk(storeToDelete));
        }
        setOpenDeleteDialog(false);
        setStoreToDelete(null);
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
        setStoreToDelete(null);
    };

    const handleCreateNewStore = (id?: string) => {
        dispatch(createNewStoreThunk(id));
    };

    const handleSelectStore = (id: string) => {
        dispatch(storesActionsCreators.setSelectedStore(id));
    };

    const handleSelectFilter = (selectedFilter: string) => {
        const value = selectedFilter.toLowerCase();
        setGetStoresParams((prev) => ({
            ...prev,
            status: value,
        }));
        dispatch(getStoresThunk({ ...getStoresParams, status: value }));
    };

    const handleSelectSort = (selectedSort: string) => {
        setGetStoresParams((prev) => ({
            ...prev,
            sort: selectedSort,
        }));
        dispatch(getStoresThunk({ ...getStoresParams, sort: selectedSort }));
    };

    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(storesActionsCreators.setCurrentPage(value));
        setGetStoresParams((prev) => ({
            ...prev,
            page: value,
        }));
        dispatch(getStoresThunk({ ...getStoresParams, page: value }));
    };

    return (
        <Component
            data={{ store: data, loading, openDeleteDialog, storeParams: getStoresParams }}
            actions={{
                handleDelete,
                handleDeleteConfirm,
                handleDeleteCancel,
                handleCreateNewStore,
                handleSelectStore,
                handleSelectFilter,
                handleChangePage,
                handleSelectSort,
            }}
        />
    );
}
