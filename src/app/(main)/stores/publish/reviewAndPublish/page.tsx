'use client';
import { Box, Button, Typography } from '@mui/material';
import { Preview } from '@/app/(main)/components/stores/Preview';
import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { STORE_STORAGE_URL } from '@/constants/asset';
import { Stores } from '@/features/stores/types';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

interface Props {
    data: {
        store: Stores;
    };
}
const Component = ({ data }: Props) => {
    const router = useRouter();
    const { store } = data;
    const isFile = (path: any): path is File => path instanceof File;

    return (
        <Box paddingInline={3}>
            <Breadcrumb
                title={'Publish Store'}
                items={[
                    { title: 'Stores', to: '/stores' },
                    { title: 'Publish', to: '/stores/publish' },
                    { title: 'Review And Publish' },
                ]}
                assetTitle={store.organization.url || ''}
            />
            <Preview
                title={store.organization.url || 'Store Name'}
                description={store.organization.description || 'Store Description'}
                domain={
                    store.organization.url
                        ? `https://${store.organization.url}.xibit.live`
                        : 'https://example.xibit.live'
                }
                banner={
                    isFile(store.organization.formats?.banner.path)
                        ? URL.createObjectURL(store.organization.formats?.banner.path)
                        : `${STORE_STORAGE_URL}/${store.organization.formats?.banner.path}` || ''
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
            />
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
                    <Button variant="contained">Request Publishment</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default function ReviewAndPublish() {
    const { data } = useSelector((state) => state.stores);
    return <Component data={{ store: data.data[0] }} />;
}
