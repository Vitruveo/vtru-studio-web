'use client';

import { Box, Button, CircularProgress, Grid, Switch, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';

import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { getStoreByIdThunk, updateStoreVisibilityThunk } from '@/features/stores/thunks';
import { Stores, PublishStore, StepStatus } from '@/features/stores/types';
import { Preview } from '../../components/stores/Preview';
import { isFile } from '@/utils/isFile';
import { STORE_STORAGE_URL } from '@/constants/asset';

const statusStyles: { [key in StepStatus]: { text: string; background: string } } = {
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
    'Not Approved': {
        text: '#fff',
        background: '#F56236',
    },
};

const paths = {
    organization: '/stores/publish/organization',
    artworks: '/stores/publish/artworks',
    appearanceContent: '/stores/publish/appearanceAndContent',
    reviewAndPublish: '/stores/publish/reviewAndPublish',
};

interface ComponentProps {
    data: {
        publishStore: PublishStore;
        store: Stores;
        loading: boolean;
        reviewAndPublishAvailable: boolean;
    };
    actions: {
        handleChangeHiddenStore: () => void;
    };
}

const Component = ({ data, actions }: ComponentProps) => {
    const router = useRouter();
    const { store, loading, publishStore, reviewAndPublishAvailable } = data;
    const { handleChangeHiddenStore } = actions;

    if (loading || !store)
        return (
            <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                <CircularProgress size={100} />
            </Box>
        );

    return (
        <Box position="relative" paddingInline={3} height={'calc(100vh - 140px)'} overflow="auto">
            <Breadcrumb
                title="Publish Folio"
                assetTitle={store.organization?.name || ''}
                items={[{ title: 'Folios', to: '/stores' }, { title: 'Publish' }]}
            />

            <Box paddingInline={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box pb={4.5}>
                            <Typography variant="h6" fontWeight="normal" color="GrayText">
                                Complete all required tasks to publish your Folio.
                            </Typography>
                        </Box>
                        {Object.entries(publishStore || {})?.map((step, index) => {
                            const [key, value] = step;

                            const isLast = index === Object.keys(publishStore || {}).length - 1;

                            return (
                                <Grid key={key} container mb={3} alignItems={'center'}>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" fontWeight="normal" color="GrayText">
                                            {value?.label}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography
                                                width={110}
                                                height={30}
                                                color={
                                                    statusStyles[value.status as keyof typeof statusStyles]?.text ||
                                                    statusStyles['Not Started'].text
                                                }
                                                bgcolor={
                                                    statusStyles[value.status as keyof typeof statusStyles]
                                                        ?.background || statusStyles['Not Started'].background
                                                }
                                                borderRadius={0}
                                                paddingBlock={0.5}
                                                textTransform="none"
                                                textAlign="center"
                                            >
                                                {value?.status}
                                            </Typography>
                                            {!isLast && (
                                                <Button
                                                    sx={{
                                                        width: 100,
                                                        height: 30,
                                                    }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        router.push(paths[key as keyof typeof paths]);
                                                    }}
                                                >
                                                    {value?.status !== 'Not Started' ? 'Edit' : 'Start'}
                                                </Button>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {['active', 'hidden'].includes(store.status) && (
                            <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={'end'}>
                                <Typography variant="h5">Hide in Folio view</Typography>
                                <Switch onChange={handleChangeHiddenStore} checked={store.status === 'hidden'} />
                            </Box>
                        )}
                        <Preview
                            title={store.organization?.name || 'Folio Name'}
                            description={store.organization?.description || 'Folio Description'}
                            domain={
                                store.organization?.url
                                    ? `https://${store.organization?.url}.xibit.live`
                                    : 'https://example.xibit.live'
                            }
                            banner={
                                store.organization?.formats?.banner?.path
                                    ? isFile(store.organization?.formats?.banner?.path)
                                        ? URL.createObjectURL(store.organization?.formats?.banner?.path)
                                        : `${STORE_STORAGE_URL}/${store.organization?.formats?.banner?.path}`
                                    : null
                            }
                            logo={
                                isFile(store.organization?.formats?.logo?.square?.path)
                                    ? URL.createObjectURL(store.organization?.formats?.logo?.square?.path)
                                    : `${STORE_STORAGE_URL}/${store.organization?.formats?.logo?.square?.path}` || ''
                            }
                            logoHorizontal={
                                isFile(store.organization?.formats?.logo?.horizontal?.path)
                                    ? URL.createObjectURL(store.organization?.formats?.logo?.horizontal?.path)
                                    : `${STORE_STORAGE_URL}/${store.organization?.formats?.logo?.horizontal?.path}` ||
                                    ''
                            }
                            style={{ width: '100%' }}
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
                    <Button variant="text" onClick={() => router.push('/stores')}>
                        <Typography color="gray">Back</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!reviewAndPublishAvailable}
                        onClick={() => router.push(paths.reviewAndPublish)}
                    >
                        Review and Publish
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default function Publish() {
    const dispatch = useDispatch();
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const { data, loading, publishStore } = useSelector((state) => state.stores);
    const reviewAndPublishAvailable = Object.values(publishStore || {})
        .filter((value) => !value.optional)
        .every((value) => value.status === 'Completed');

    useEffect(() => {
        dispatch(getStoreByIdThunk(selectedStore.id));
    }, [selectedStore]);

    const handleChangeHiddenStore = () => {
        if (!['active', 'hidden'].includes(data.data[0].status)) return;

        dispatch(
            updateStoreVisibilityThunk({
                id: data.data[0]._id,
                status: data.data[0].status === 'active' ? 'hidden' : 'active',
            })
        );
    };

    return (
        <Component
            data={{ store: data.data[0], loading, publishStore, reviewAndPublishAvailable }}
            actions={{ handleChangeHiddenStore }}
        />
    );
}
