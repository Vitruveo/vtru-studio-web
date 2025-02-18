'use client';
import { Box, Button, Typography } from '@mui/material';
import { Preview } from '@/app/(main)/components/stores/Preview';
import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { STORE_STORAGE_URL } from '@/constants/asset';
import { Stores } from '@/features/stores/types';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import PublishStoreMessage from './publishMessage';
import { getStoreByIdThunk, updateStatusThunk, validateUrlThunk } from '@/features/stores/thunks';
import { isFile } from '@/utils/isFile';
import { useState } from 'react';

interface Props {
    data: {
        store: Stores;
        loading: boolean;
    };
}
const Component = ({ data }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isInvalidUrl, setIsInvalidUrl] = useState(false);
    const { store, loading } = data;

    const textsForPublishStoreStatus = {
        draft: {
            buttontitle: 'Request Moderation',
            message:
                'Nice work! Your store is ready for moderation. Once you submit it our team will review it and approve accordingly',
        },
        pending: {
            buttontitle: 'Request moderation pending',
            message: 'Your store is being reviewed by our team and you will be notified when it is made available',
        },
        active: {
            buttontitle: undefined,
            message: 'Your store is active',
        },
        inactive: {
            buttontitle: undefined,
            message: 'Your store did not pass our moderation review.',
        },
        invalidUrl: {
            buttontitle: 'Request Moderation',
            message: 'Your URL is already in use. Please update it and try request moderation again',
        },
    } as { [key: string]: { buttontitle: string | undefined; message: string } };

    const handleRequestPublishment = async () => {
        setIsInvalidUrl(false);
        const validationResponse = await dispatch(
            validateUrlThunk({ storeId: store._id, url: store.organization.url! })
        );
        if (!validationResponse.data) {
            setIsInvalidUrl(true);
            return;
        }
        await dispatch(updateStatusThunk({ id: store._id, status: 'pending' }));
        dispatch(getStoreByIdThunk(store._id));
        setIsInvalidUrl(false);
    };

    return (
        <Box paddingInline={3} height={'calc(100vh - 140px)'} overflow={'auto'}>
            <Breadcrumb
                title={'Publish Store'}
                items={[
                    { title: 'Stores', to: '/stores' },
                    { title: 'Publish', to: '/stores/publish' },
                    { title: 'Review And Publish' },
                ]}
                assetTitle={store.organization?.name || ''}
            />
            {!isInvalidUrl ? (
                <PublishStoreMessage
                    message={textsForPublishStoreStatus[store.status].message}
                    loading={loading}
                    type={'warning'}
                />
            ) : (
                <PublishStoreMessage
                    message={textsForPublishStoreStatus.invalidUrl.message}
                    loading={loading}
                    type={'error'}
                />
            )}
            <Box display={'flex'} justifyContent={'center'} width={'100%'} mb={4}>
                <Preview
                    title={store.organization?.name || 'Store Name'}
                    description={store.organization.description || 'Store Description'}
                    domain={
                        store.organization?.url
                            ? `https://${store.organization?.url}.xibit.live`
                            : 'https://example.xibit.live'
                    }
                    banner={
                        store.organization.formats?.banner?.path
                            ? isFile(store.organization.formats?.banner.path)
                                ? URL.createObjectURL(store.organization.formats?.banner.path)
                                : `${STORE_STORAGE_URL}/${store.organization.formats?.banner.path}`
                            : null
                    }
                    logo={
                        isFile(store.organization.formats?.logo.square.path)
                            ? URL.createObjectURL(store.organization.formats?.logo.square.path)
                            : `${STORE_STORAGE_URL}/${store.organization.formats?.logo.square.path}` || ''
                    }
                    logoHorizontal={
                        isFile(store.organization.formats?.logo.horizontal.path)
                            ? URL.createObjectURL(store.organization.formats?.logo.horizontal.path)
                            : `${STORE_STORAGE_URL}/${store.organization.formats?.logo.horizontal.path}` || ''
                    }
                    style={{ width: '55%' }}
                />
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
                    <Button variant="text" onClick={() => router.push('/stores/publish')}>
                        <Typography color="gray">Back</Typography>
                    </Button>
                    {textsForPublishStoreStatus[store.status].buttontitle && (
                        <Button
                            variant="contained"
                            onClick={handleRequestPublishment}
                            disabled={store.status !== 'draft'}
                        >
                            {textsForPublishStoreStatus[store.status].buttontitle}
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default function ReviewAndPublish() {
    const { data, loading } = useSelector((state) => state.stores);
    return <Component data={{ store: data.data[0], loading }} />;
}
