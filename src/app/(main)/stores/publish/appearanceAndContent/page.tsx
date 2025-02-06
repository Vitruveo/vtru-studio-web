'use client';
import { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import {
    Box,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { IconRestore } from '@tabler/icons-react';
import { STORE_STORAGE_URL } from '@/constants/asset';
import { useDispatch, useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import HideElements from '@/app/(main)/components/stores/hideElements';
import { PreviewDetailed } from '@/app/(main)/components/stores/PreviewDetailed';
import { useRouter } from 'next/navigation';
import { updateAppearanceContentThunk } from '@/features/stores/thunks';
import { AppearanceContent } from '@/features/stores/types';

const AppearanceAndContent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openDialogSave, setOpenDialogSave] = useState(false);
    const inputColorRef = useRef<HTMLInputElement>(null);

    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));
    const { highlightColor, hideElements } = store?.appearanceContent || {};

    const isFile = (path: any): path is File => path instanceof File;

    const handleChangeColor = debounce(
        (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
            const color = e.target.value;
            setFieldValue('highlightColor', color);
        },
        500
    );

    const handleBack = (isDirty: boolean) => {
        if (isDirty) {
            setOpenDialogSave(true);
            return;
        }
        router.push('/stores/publish');
    };
    const handleBackSave = (handleSubmit: () => void) => {
        handleSubmit();
        setOpenDialogSave(false);
    };
    const handleBackCancel = () => {
        setOpenDialogSave(false);
        router.push('/stores/publish');
    };

    return (
        <Formik
            initialValues={
                {
                    hideElements: {
                        filters: hideElements?.filters || false,
                        order: hideElements?.order || false,
                        header: hideElements?.header || false,
                        recentlySold: hideElements?.recentlySold || false,
                        artworkSpotlight: hideElements?.artworkSpotlight || false,
                        artistSpotlight: hideElements?.artistSpotlight || false,
                        pageNavigation: hideElements?.pageNavigation || false,
                        cardDetails: hideElements?.cardDetails || false,
                        assets: hideElements?.assets || false,
                    },
                    highlightColor: highlightColor || '#FF0066',
                } as AppearanceContent
            }
            onSubmit={async (values) => {
                await dispatch(
                    updateAppearanceContentThunk({
                        id: selectedStore.id,
                        data: values,
                    })
                );
                router.push('/stores/publish');
            }}
        >
            {({ setFieldValue, resetForm, dirty, handleSubmit }) => (
                <Form>
                    <Box display={'grid'} gridTemplateRows={'1fr auto'} height="calc(100vh - 64px)">
                        <Box paddingInline={3}>
                            <Breadcrumb
                                title="Publish Store"
                                assetTitle={store?.organization?.url || ''}
                                items={[
                                    { title: 'Stores', to: '/stores' },
                                    { title: 'Publish', to: '/stores/publish' },
                                    { title: 'Appearance And Content' },
                                ]}
                            />
                        </Box>

                        <Box paddingInline={3} overflow="auto" paddingBottom={20}>
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <Box display={'flex'} flexDirection={'column'} padding={3} gap={2}>
                                        <Typography variant="h6" fontWeight={'bold'}>
                                            Hide Elements
                                        </Typography>
                                        <Typography variant="body2">
                                            You can choose which elements you want to show in your store
                                        </Typography>
                                        <HideElements />
                                    </Box>

                                    <Box display={'flex'} flexDirection={'column'} padding={3} gap={2}>
                                        <Typography variant="h6" fontWeight={'bold'}>
                                            Highlight Color
                                        </Typography>
                                        <Typography variant="body2">
                                            You can choose the highlight color for your store
                                        </Typography>
                                        <input
                                            type="color"
                                            onChange={(e) => handleChangeColor(e, setFieldValue)}
                                            ref={inputColorRef}
                                            defaultValue={highlightColor || '#FF0066'}
                                        />
                                    </Box>

                                    <Button
                                        startIcon={<IconRestore size={18} />}
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                            resetForm();
                                            if (inputColorRef.current) {
                                                inputColorRef.current.value = highlightColor || '#FF0066';
                                            }
                                        }}
                                    >
                                        <Typography variant="caption">Reset</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <PreviewDetailed
                                        title={store?.organization?.url || 'Store Name'}
                                        description={store?.organization.description || 'Store Description'}
                                        domain={
                                            store?.organization?.url
                                                ? `https://${store?.organization?.url}.xibit.live`
                                                : 'https://example.xibit.live'
                                        }
                                        banner={
                                            store?.organization.formats?.banner?.path
                                                ? isFile(store?.organization.formats?.banner.path)
                                                    ? URL.createObjectURL(store?.organization?.formats?.banner.path)
                                                    : `${STORE_STORAGE_URL}/${store?.organization.formats?.banner.path}`
                                                : null
                                        }
                                        logo={
                                            isFile(store?.organization.formats?.logo.square.path)
                                                ? URL.createObjectURL(store?.organization?.formats?.logo.square.path)
                                                : `${STORE_STORAGE_URL}/${store?.organization.formats?.logo.square.path}` ||
                                                  ''
                                        }
                                        logoHorizontal={
                                            isFile(store?.organization.formats?.logo.horizontal.path)
                                                ? URL.createObjectURL(
                                                      store?.organization?.formats?.logo.horizontal.path
                                                  )
                                                : `${STORE_STORAGE_URL}/${store?.organization.formats?.logo.horizontal.path}` ||
                                                  ''
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box bgcolor="#e5e7eb">
                            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                                <Typography color="GrayText">Step 3 of 3</Typography>
                                <Box display="flex" gap={2}>
                                    <Button type="button" variant="text" onClick={() => handleBack(dirty)}>
                                        <Typography color="gray">Back</Typography>
                                    </Button>
                                    <Button type="button" onClick={() => handleSubmit()} variant="contained">
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
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
                            <Button onClick={() => handleBackSave(handleSubmit)} color="success" variant="outlined">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            )}
        </Formik>
    );
};

export default AppearanceAndContent;
