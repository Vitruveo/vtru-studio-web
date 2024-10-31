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
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { IconCopy, IconPlus, IconTrash } from '@tabler/icons-react';
import Select from 'react-select';
import Image from 'next/image';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { createNewStoreThunk, deleteStoreThunk, getStoresThunk } from '@/features/stores/thunks';
import { StoresItem } from '@/features/stores/types';
import { storesActions } from '@/features/stores/slice';

interface StoreProps {
    data: {
        stores: StoresItem[];
        loading: boolean;
        openDeleteDialog: boolean;
    };
    actions: {
        handleDelete: (id: string) => void;
        handleDeleteConfirm: () => void;
        handleDeleteCancel: () => void;
        handleCreateNewStore: (id?: string) => void;
        handleSelectStore: (id: string) => void;
    };
}

const Component = ({ data, actions }: StoreProps) => {
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const { stores, loading, openDeleteDialog } = data;
    const { handleDelete, handleDeleteConfirm, handleDeleteCancel, handleCreateNewStore, handleSelectStore } = actions;

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
                    href="/home/stores/publish"
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
                    <Typography variant="h4">Publish a new Store</Typography>
                </Link>
                <Select
                    placeholder="Duplicate Store"
                    options={[
                        { value: 'store 1', label: 'Store 1' },
                        { value: 'store 2', label: 'Store 2' },
                        { value: 'store 3', label: 'Store 3' },
                    ]}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            minWidth: 200,
                            width: 'auto',
                        }),
                    }}
                />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" paddingBlock={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h5">Sort:</Typography>
                    <Select
                        placeholder="Sort by"
                        options={[
                            { value: 'created - new', label: 'Created - New to Old' },
                            { value: 'created - old', label: 'Created - Old to New' },
                            { value: 'name - a-z', label: 'Name - a-z' },
                            { value: 'name - z-a', label: 'Name - z-a' },
                        ]}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                minWidth: 200,
                                width: 'auto',
                            }),
                        }}
                    />
                </Box>
                <Box display="flex" gap={2}>
                    {['Draft', 'Active', 'Inactive', 'All'].map((item) => {
                        return (
                            <Typography
                                key={item}
                                fontSize={18}
                                style={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                {item}
                            </Typography>
                        );
                    })}
                </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={4} paddingBlock={2}>
                {loading ? (
                    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                        <CircularProgress size={100} />
                    </Box>
                ) : (
                    stores.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href="/home/stores/publish"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                onClick={() => {
                                    handleSelectStore(item.id);
                                }}
                            >
                                <Box position="relative" width={200}>
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
                                            handleCreateNewStore(item.id);
                                        }}
                                    >
                                        <IconCopy color="red" />
                                    </IconButton>
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
                                            handleDelete(item.id);
                                        }}
                                    >
                                        <IconTrash color="red" />
                                    </IconButton>

                                    <Image
                                        src={item?.image}
                                        alt="Store Image"
                                        width={200}
                                        height={200}
                                        style={{
                                            borderTopLeftRadius: 5,
                                            borderTopRightRadius: 5,
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
                                        <Typography variant="h5">{item?.name}</Typography>
                                        <Typography fontSize={16}>{item?.status}</Typography>
                                        <Typography
                                            fontSize={16}
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Edit
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        );
                    })
                )}
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
                        Do you really want to delete this store?
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
    const { data: storesData, loading } = useSelector((state) => state.stores);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<string | null>(null);

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
        dispatch(storesActions.setSelectedStore(id));
    };

    return (
        <Component
            data={{ stores: storesData, loading, openDeleteDialog }}
            actions={{
                handleDelete,
                handleDeleteConfirm,
                handleDeleteCancel,
                handleCreateNewStore,
                handleSelectStore,
            }}
        />
    );
}
