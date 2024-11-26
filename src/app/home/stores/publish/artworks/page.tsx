'use client';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { useSelector } from '@/store/hooks';
import { Box, Typography } from '@mui/material';

const Component = () => {
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));

    return (
        <Box
            position="relative"
            paddingInline={3}
            sx={{
                overflowY: 'auto',
                height: 'calc(100vh - 64px)',
                paddingBottom: 30,
            }}
        >
            <Breadcrumb
                title="Publish Store"
                assetTitle={store?.organization.url || ''}
                items={[
                    { title: 'Stores', to: '/home/stores' },
                    { title: 'Publish', to: '/home/stores/publish' },
                    { title: 'Artworks' },
                ]}
            />
        </Box>
    );
};

export default function Artworks() {
    return <Component />;
}
