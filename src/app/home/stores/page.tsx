'use client';

import { Box, Button, CircularProgress, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import { IconCopy, IconPlus, IconTrash } from '@tabler/icons-react';
import Select from 'react-select';
import Image from 'next/image';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { getStoresThunk } from '@/features/stores/thunks';
import { StoresItem } from '@/features/stores/types';

interface StoreProps {
    data: {
        stores: StoresItem[];
        loading: boolean;
    };
}

const Component = ({ data }: StoreProps) => {
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const { stores, loading } = data;

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
                    onClick={() => {
                        // dispatch to redux new item
                    }}
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
                    stores.map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href="/home/stores/publish"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                onClick={() => {
                                    // dispatch to redux item
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
                                    >
                                        <IconTrash color="red" />
                                    </IconButton>

                                    <Image
                                        src={item.image}
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
                                        <Typography variant="h5">{item.name}</Typography>
                                        <Typography fontSize={16}>{item.status}</Typography>
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
        </Box>
    );
};

export default function Stores() {
    const dispatch = useDispatch();
    const { data: storesData, loading } = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(getStoresThunk());
    }, []);

    return <Component data={{ stores: storesData, loading }} />;
}
