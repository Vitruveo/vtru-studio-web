'use client';

import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';

import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { getStoreByIdThunk } from '@/features/stores/thunks';
import { Stores, Task } from '@/features/stores/types';
import { NO_IMAGE_ASSET, STORE_STORAGE_URL } from '@/constants/asset';

const statusStyles = {
    Completed: {
        text: '#fff',
        background: '#93C47D',
    },
    'In Progress': {
        text: '#fff',
        background: '#F6B26B',
    },
    'Not Started': {
        text: '#fff',
        background: 'rgba(0, 0, 0, 0.38);',
    },
};

interface ComponentProps {
    data: {
        tasks?: Task[];
        store: Stores;
        loading: boolean;
    };
}

const Component = ({ data }: ComponentProps) => {
    const router = useRouter();
    const { store, loading, tasks } = data;

    if (loading || !store)
        return (
            <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                <CircularProgress size={100} />
            </Box>
        );

    return (
        <Box position="relative" paddingInline={3} overflow="auto">
            <Breadcrumb
                title="Publish Store"
                assetTitle={store.organization.url}
                items={[{ title: 'Stores', to: '/home/stores' }, { title: 'Publish' }]}
            />

            <Box p={2} pt={0}>
                <Typography variant="h6" fontWeight="normal" color="GrayText">
                    Complete all required tasks to publish your Store.
                </Typography>
            </Box>

            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        {tasks?.map((task, index) => {
                            const isLast = index === tasks.length - 1;

                            return (
                                <Grid key={task.id} container mb={3}>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" fontWeight="normal" color="GrayText">
                                            {task.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography
                                                width={110}
                                                height={30}
                                                color={statusStyles[task.status as keyof typeof statusStyles].text}
                                                bgcolor={
                                                    statusStyles[task.status as keyof typeof statusStyles].background
                                                }
                                                borderRadius={0}
                                                paddingBlock={0.5}
                                                textTransform="none"
                                                textAlign="center"
                                            >
                                                {task.status}
                                            </Typography>
                                            {!isLast && (
                                                <Button
                                                    sx={{
                                                        width: 100,
                                                        height: 30,
                                                    }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (task.to) router.push(task.to);
                                                    }}
                                                >
                                                    {task.status !== 'Not Started' ? 'Edit' : 'Start'}
                                                </Button>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Image
                            src={
                                store?.organization.formats?.logo?.square?.path
                                    ? `${STORE_STORAGE_URL}/${store?.organization.formats?.logo.square.path}?timestamp=${new Date().getTime()}`
                                    : NO_IMAGE_ASSET
                            }
                            alt={store.organization.name}
                            width={400}
                            height={400}
                            style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '400px',
                                maxHeight: '400px',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                bgcolor="#e5e7eb"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="flex-end" p={2}>
                    <Button variant="text" onClick={() => router.push('/home/stores')}>
                        <Typography color="gray">Back</Typography>
                    </Button>
                    <Button variant="contained">Review and Publish</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default function Publish() {
    const dispatch = useDispatch();
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const { data, loading, tasks } = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(getStoreByIdThunk(selectedStore.id));
    }, [selectedStore]);

    return <Component data={{ store: data.data[0], loading, tasks }} />;
}