'use client';
import { useRef, useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import TabSliders from '@/app/(main)/components/stores/sliders/tabSliders';
import { Review } from '@/app/(main)/components/stores/review';
import { filterFalsyValues } from '@/utils/truthyObject';
import { createStoreArtworkThunk } from '@/features/storesArtwork/thunks';
import { type Artworks } from '@/features/stores/types';

const Component = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [openDialogSave, setOpenDialogSave] = useState(false);
    const formikRef = useRef<FormikProps<Artworks & { redirectPath: string }>>(null);
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));

    const handleSubmit = (values: Artworks & { redirectPath: string }) => {
        const filteredValues = filterFalsyValues({
            input: values,
            keysToPreserve: ['general', 'context', 'taxonomy', 'artists', 'portfolio', 'exclude'],
        });
        if (filteredValues.context && !filteredValues.context.colors) {
            delete filteredValues.context.precision;
        }
        if (filteredValues.general && !filteredValues.general.licenses.enabled) {
            delete filteredValues.general.licenses;
        }
        dispatch(createStoreArtworkThunk({ id: selectedStore.id, stepName: 'artworks', data: filteredValues }));
        router.push(values.redirectPath);
    };

    const handleBack = async () => {
        if (formikRef.current) {
            if (formikRef.current.dirty) {
                setOpenDialogSave(true);
                return;
            }
        }
        router.push('/stores/publish');
    };
    const handleBackSave = () => {
        if (formikRef.current) {
            formikRef.current.setFieldValue('redirectPath', '/stores/publish');
            handleSubmit(formikRef.current?.values);
            setOpenDialogSave(false);
        }
    };
    const handleBackCancel = () => {
        setOpenDialogSave(false);
        router.push('/stores/publish');
    };
    const handleNext = () => {
        if (formikRef.current) {
            formikRef.current.setFieldValue('redirectPath', '/stores/publish/artworks');
            handleSubmit(formikRef.current?.values);
        }
    };

    const shortcuts = store?.artworks?.general?.shortcuts || {};
    const licenses = store?.artworks?.general?.licenses || {};
    const context = store?.artworks?.context || {};
    const taxonomy = store?.artworks?.taxonomy || {};
    const artists = store?.artworks?.artists || {};
    const portfolio = store?.artworks?.portfolio || {};
    const exclude = store?.artworks?.exclude || {};

    return (
        <Box display={'grid'} gridTemplateRows={'1fr auto'} height="calc(100vh - 64px)">
            <Box paddingInline={3} overflow={'auto'} paddingBottom={20}>
                <Breadcrumb
                    title="Publish Folio"
                    assetTitle={store?.organization?.name || ''}
                    items={[
                        { title: 'Folios', to: '/stores' },
                        { title: 'Publish', to: '/stores/publish' },
                        { title: 'Artworks' },
                    ]}
                />
                <Formik
                    innerRef={formikRef}
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
                                maxPrice: licenses.maxPrice || 0,
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
                        portfolio: {
                            wallets: portfolio?.wallets,
                        },
                        exclude: {
                            arts: exclude.arts || [],
                            artists: exclude.artists || [],
                            onlyInStore: exclude.onlyInStore || false,
                        },
                        redirectPath: '/stores/publish',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <TabSliders />
                            </Grid>
                            <Grid item xs={6}>
                                <Review />
                            </Grid>
                        </Grid>
                        <Dialog
                            open={openDialogSave}
                            onClose={() => setOpenDialogSave(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{'Back to publish page'}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to save the changes before leaving?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleBackCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleBackSave} color="success" variant="outlined">
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Form>
                </Formik>
            </Box>
            <Box bgcolor="#e5e7eb">
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <Typography color="GrayText">Step 2 of 3</Typography>
                    <Box display="flex" gap={2}>
                        <Button type="button" variant="text" onClick={handleBack}>
                            <Typography color="gray">Back</Typography>
                        </Button>
                        <Button type="button" onClick={handleNext} variant="contained">
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default function Artworks() {
    return <Component />;
}
