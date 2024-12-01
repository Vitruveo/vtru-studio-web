'use client';
import { Formik, Form } from 'formik';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import TabSliders from '@/app/home/components/stores/sliders/tabSliders';
import { Review } from '@/app/home/components/stores/review';
import { filterFalsyValues } from '@/utils/truthyObject';
import { createStoreArtworkThunk } from '@/features/storesArtwork/thunks';

const Component = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));

    const handleBack = () => {
        router.push('/home/stores/publish');
    };

    const shortcuts = store?.artworks.general.shortcuts || {};
    const licenses = store?.artworks.general.licenses || {};
    const context = store?.artworks.context || {};
    const taxonomy = store?.artworks.taxonomy || {};
    const artists = store?.artworks.artists || {};

    return (
        <Formik
            initialValues={{
                general: {
                    shortcuts: {
                        hideNudity: shortcuts.hideNudity || false,
                        hideAI: shortcuts.hideAI || false,
                        photography: shortcuts.photography || false,
                        animation: shortcuts.animation || false,
                        physicalArt: shortcuts.physicalArt || false,
                        digitalArt: shortcuts.digitalArt || false,
                        includeSold: shortcuts.includeSold || false,
                        hasBTS: shortcuts.hasBTS || false,
                    },
                    licenses: {
                        minPrice: licenses.minPrice || 0,
                        maxPrice: licenses.maxPrice || 10_000,
                        enabled: licenses.enabled || false,
                    },
                },
                context: {
                    culture: context.culture || [],
                    mood: context.mood || [],
                    orientation: context.orientation || [],
                    precision: context.precision || 0.7,
                    colors: context.colors || [],
                },
                taxonomy: {
                    objectType: taxonomy.objectType || [],
                    tags: taxonomy.tags || [],
                    collections: taxonomy.collections || [],
                    aiGeneration: taxonomy.aiGeneration || [],
                    arEnabled: taxonomy.arEnabled || [],
                    nudity: taxonomy.nudity || [],
                    category: taxonomy.category || [],
                    medium: taxonomy.medium || [],
                    style: taxonomy.style || [],
                    subject: taxonomy.subject || [],
                },
                artists: {
                    name: artists.name || [],
                    nationality: artists.nationality || [],
                    residence: artists.residence || [],
                },
            }}
            onSubmit={(values) => {
                const filteredValues = filterFalsyValues({
                    input: values,
                    keysToPreserve: ['general', 'context', 'taxonomy', 'artists'],
                });
                if (filteredValues.context && !filteredValues.context.colors) {
                    delete filteredValues.context.precision;
                }
                if (filteredValues.general && !filteredValues.general.licenses.enabled) {
                    delete filteredValues.general.licenses;
                }
                dispatch(createStoreArtworkThunk({ id: selectedStore.id, stepName: 'artworks', data: filteredValues }));
            }}
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
                </Form>
            </Box>
        </Formik>
    );
};

export default function Artworks() {
    return <Component />;
}
