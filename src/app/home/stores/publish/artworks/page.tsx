'use client';
import { Formik, Form } from 'formik';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import TabSliders from '@/app/home/components/stores/sliders/tabSliders';
import { Review } from '@/app/home/components/stores/review';

const Component = () => {
    const router = useRouter();

    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));

    const handleBack = () => {
        router.push('/home/stores/publish');
    };

    return (
        <Formik
            initialValues={{
                general: {
                    shortcuts: {
                        hideNudity: false,
                        hideAI: false,
                        photography: false,
                        animation: false,
                        physicalArt: false,
                        digitalArt: false,
                        includeSold: false,
                        hasBTS: false,
                    },
                    licenses: {
                        minPrice: 0,
                        maxPrice: 10_000,
                    },
                },
                context: {
                    culture: [],
                    mood: [],
                    orientation: [],
                    precision: 0.0,
                    colors: [],
                },
                taxonomy: {
                    objectType: [],
                    tags: [],
                    collections: [],
                    aiGeneration: [],
                    arEnabled: [],
                    nudity: [],
                    category: [],
                    medium: [],
                    style: [],
                    subject: [],
                },
                artists: {
                    name: [],
                    nationality: [],
                    residence: [],
                },
            }}
            onSubmit={() => {}}
        >
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
                <Form>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TabSliders />
                        </Grid>
                        <Grid item xs={6}>
                            <Review />
                        </Grid>
                    </Grid>
                </Form>
                <Box
                    bgcolor="#e5e7eb"
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="end" gap={170} p={2}>
                        <Typography color="GrayText">Step 2 of 3</Typography>
                        <Box display="flex" gap={2}>
                            <Button type="button" variant="text" onClick={handleBack}>
                                <Typography color="gray">Back</Typography>
                            </Button>
                            <Button type="submit" variant="contained">
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Formik>
    );
};

export default function Artworks() {
    return <Component />;
}
