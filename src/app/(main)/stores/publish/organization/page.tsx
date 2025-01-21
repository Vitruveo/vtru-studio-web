'use client';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Slider,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import CustomTextField from '@/app/(main)/components/forms/theme-elements/CustomTextField';
import { MediaCard } from '@/app/(main)/components/stores/mediaCard';

import { useDispatch, useSelector } from '@/store/hooks';
import { storeStorageThunk, updateOrganizationThunk, validateUrlThunk } from '@/features/stores/thunks';
import { sendRequestUploadStoresThunk } from '@/features/asset/thunks';
import { storesActionsCreators } from '@/features/stores/slice';
import { STORE_STORAGE_URL } from '@/constants/asset';
import LoadingOverlay from '@/app/(main)/components/loadingOverlay';
import { Preview } from '@/app/(main)/components/stores/Preview';

interface Input {
    url: string | null;
    name: string;
    description: string;
    markup: number;
    logoHorizontal: File | string | null;
    logoSquare: File | string | null;
    banner: File | string | null;
}

const mediaConfigs = {
    logoHorizontal: {
        width: 500,
        height: 120,
        ppi: 72,
        sizeMB: 10,
        required: true,
        definition: 'landscape',
    },
    logoSquare: {
        width: 1000,
        height: 1000,
        ppi: 72,
        sizeMB: 10,
        required: true,
        definition: 'square',
    },
    banner: {
        width: 1500,
        height: 500,
        ppi: 72,
        sizeMB: 10,
        required: true,
        definition: 'landscape',
    },
};

const cardsToUploadMedias = [
    { field: 'logoSquare', name: 'Logo - Square', dimensions: '1000x1000', required: true },
    { field: 'logoHorizontal', name: 'Logo - Horizontal', dimensions: '500x120', required: true },
    { field: 'banner', name: 'Banner', dimensions: '1500x500', required: false },
];

const Component = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const mediaRefs = useRef<any[]>([]);

    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));
    const requestUpload = useSelector((state) => state.stores.requestStoreUpload);
    const isSubmittingFiles = useSelector((state) => state.stores.isSubmittingFiles);

    const [openDialogSave, setOpenDialogSave] = useState(false);

    const formatsMapper = {
        logoHorizontal: store?.organization.formats?.logo.horizontal?.path,
        logoSquare: store?.organization.formats?.logo.square?.path,
        banner: store?.organization.formats?.banner?.path,
    };

    const handleSetMediaRef = (ref: any, index: number) => {
        mediaRefs.current[index] = ref;
    };

    const handleValidateUrl = () => {
        if (selectedStore.id && formik.values.url)
            dispatch(validateUrlThunk({ storeId: selectedStore.id, url: formik.values.url }));
    };

    const handleValidateMedia = (field: string, value: any) => {
        const card = cardsToUploadMedias.find((item) => item.field === field);
        if (card?.required && value === null) {
            return 'This media is required';
        }
        return undefined;
    };

    const handleSubmit = (values: Input & { redirectPath: string }) => {
        let hasFile = false;
        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof File) {
                hasFile = true;
                const transactionId = nanoid();

                dispatch(
                    storesActionsCreators.requestStoreUpload({
                        key,
                        status: 'requested',
                        transactionId,
                    })
                );

                const image = new Image();
                image.src = URL.createObjectURL(value);
                image.onload = () => {
                    const width = image.width.toString();
                    const height = image.height.toString();

                    dispatch(
                        sendRequestUploadStoresThunk({
                            mimetype: 'image/jpeg',
                            metadata: {
                                width,
                                height,
                                formatUpload: key,
                                path: formatsMapper[key as keyof typeof formatsMapper],
                                maxSize: mediaConfigs[key as keyof typeof mediaConfigs].sizeMB.toString(),
                            },
                            originalName: value.name,
                            transactionId,
                            id: selectedStore.id,
                        })
                    );
                };
            }
        });

        if (hasFile) return;

        dispatch(
            updateOrganizationThunk({
                id: selectedStore.id,
                data: {
                    url: values.url,
                    name: values.name,
                    description: values.description,
                    markup: values.markup,
                    hasBanner: Boolean(values.banner),
                    // formats: {}
                },
            })
        );

        router.push(values.redirectPath);
    };

    const formik = useFormik<Input & { redirectPath: string }>({
        initialValues: {
            url: store?.organization.url || null,
            name: store?.organization.name || '',
            description: store?.organization.description || '',
            markup: store?.organization.markup || 10,
            logoHorizontal: formatsMapper.logoHorizontal
                ? `${STORE_STORAGE_URL}/${formatsMapper.logoHorizontal}`
                : null,
            logoSquare: formatsMapper.logoSquare ? `${STORE_STORAGE_URL}/${formatsMapper.logoSquare}` : null,
            banner: formatsMapper.banner ? `${STORE_STORAGE_URL}/${formatsMapper.banner}` : null,

            redirectPath: '/stores/publish/artworks',
        },
        validationSchema: yup.object().shape({
            url: yup
                .string()
                .required()
                .test('url', 'Invalid URL', (value) => /^[a-z0-9-]{4,}$/.test(value!)),
            name: yup.string().required(),
            description: yup.string().max(250),
            markup: yup.number().required(),
        }),
        validate: (values) => {
            const errors: any = {};
            cardsToUploadMedias.forEach((item) => {
                const error = handleValidateMedia(item.field, values[item.field as keyof typeof mediaConfigs]);
                if (error) {
                    errors[item.field as keyof typeof mediaConfigs] = error;
                }
            });
            return errors;
        },
        onSubmit: handleSubmit,
    });

    const handleBack = () => {
        if (formik.dirty) {
            setOpenDialogSave(true);
            return;
        }
        router.push('/stores/publish');
    };
    const handleBackSave = () => {
        formik.setFieldValue('redirectPath', '/stores/publish');
        formik.handleSubmit();
        setOpenDialogSave(false);
    };
    const handleBackCancel = () => {
        setOpenDialogSave(false);
        router.push('/stores/publish');
    };
    const handleNext = async () => {
        formik.handleSubmit();
    };

    useEffect(() => {
        if (selectedStore.validateUrl === false) formik.setFieldError('url', 'URL is already in use');
    }, [selectedStore.validateUrl]);

    useEffect(() => {
        if (Object.keys(requestUpload).length === 0) return;
        const hasUploading = Object.values(requestUpload).some((item) => item.status === 'uploading');
        const hasReady = Object.values(requestUpload).some((item) => item.status === 'ready');
        const allDone = Object.values(requestUpload).every((item) => item.status === 'done');

        if (allDone) {
            formik.handleSubmit();
            dispatch(storesActionsCreators.setIsSubmittingFiles(false));
            dispatch(storesActionsCreators.clearRequestStoreUpload());
            return;
        }

        if (hasUploading) {
            dispatch(storesActionsCreators.setIsSubmittingFiles(true));
        }

        if (hasReady) {
            Object.entries(requestUpload)
                .filter(([_, value]) => value.status === 'ready')
                .forEach(([_, value]) => {
                    const file = formik.values[value.key as keyof typeof mediaConfigs]!;

                    dispatch(
                        storeStorageThunk({
                            file: file as File,
                            url: value.url,
                            transactionId: value.transactionId,
                        })
                    );
                    formik.setFieldValue(value.key as keyof typeof mediaConfigs, '');
                });
        }
    }, [requestUpload]);

    const handleChangeFile = (field: string, file: File | null) => {
        formik.setValues({
            ...formik.values,
            [field]: file,
        });
    };

    return (
        <Box display="grid" gridTemplateRows="1fr auto" height="calc(100vh - 64px)">
            <Box paddingInline={3} overflow="auto" paddingBottom={20}>
                <Breadcrumb
                    title="Publish Store"
                    assetTitle={store?.organization.url || ''}
                    items={[
                        { title: 'Stores', to: '/stores' },
                        { title: 'Publish', to: '/stores/publish' },
                        { title: 'Organization' },
                    ]}
                />
                <Box p={2} pt={0}>
                    <Typography variant="h4">Organization</Typography>
                    <Typography variant="h6" fontWeight="normal" color="GrayText">
                        Complete all required tasks to publish your Store.
                    </Typography>
                </Box>

                <Box display="flex">
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{
                            width: '45%',
                            padding: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={0.5}>
                            <Typography variant="h6" fontWeight="normal">
                                Store URL <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography color={theme.palette.primary.main} fontSize={'1.5rem'}>
                                    https://
                                </Typography>
                                <CustomTextField
                                    placeholder="type your store url here"
                                    size="small"
                                    name="url"
                                    value={formik.values.url}
                                    onChange={formik.handleChange}
                                    onBlur={handleValidateUrl}
                                    variant="outlined"
                                    sx={{
                                        marginInline: 1,
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            size: formik.values.url?.length || 20,
                                        },
                                    }}
                                />
                                <Typography color={theme.palette.primary.main} fontSize={'1.5rem'}>
                                    .xibit.live
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="error">
                                {formik.errors.url}
                            </Typography>
                            <Typography variant="caption" color="GrayText">
                                Lowercase a-z, numbers 0-9 and hyphens. Minimum length 4 characters.
                            </Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant="h6" fontWeight="normal">
                                Name <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <CustomTextField
                                id="name"
                                label=""
                                size="small"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                sx={{
                                    width: 400,
                                    marginTop: 2,
                                }}
                            />
                            <Typography variant="caption" color="error">
                                {formik.errors.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="normal">
                                Description
                            </Typography>
                            <CustomTextField
                                id="description"
                                label=""
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                size="small"
                                multiline
                                rows={4}
                                fullWidth
                                sx={{
                                    marginTop: 2,
                                }}
                            />
                            <Typography variant="caption" color="error">
                                {formik.errors.description}
                            </Typography>
                        </Box>

                        <Box width={400}>
                            <Typography marginBottom={2} variant="h6" fontWeight="normal">
                                Price Markup (%)
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Slider
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={0}
                                    max={50}
                                    name="markup"
                                    value={formik.values.markup}
                                    onChange={(_event, value) => formik.setFieldValue('markup', value)}
                                />

                                <CustomTextField
                                    id="markup"
                                    label=""
                                    sx={{ width: 70, marginLeft: 2 }}
                                    size="small"
                                    name="markup"
                                    value={formik.values.markup}
                                    onChange={formik.handleChange}
                                    onBlur={() => {
                                        if (formik.values.markup < 0) {
                                            formik.setFieldValue('markup', 0);
                                        }
                                        if (formik.values.markup > 50) {
                                            formik.setFieldValue('markup', 50);
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="normal">
                                Store Branding
                            </Typography>
                            <Box display="flex" gap={4}>
                                {cardsToUploadMedias.map((item, index) => {
                                    const mediaConfig = mediaConfigs[item.field as keyof typeof mediaConfigs];

                                    return (
                                        <Box key={item.name} width={170} height={240}>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                sx={{ flexWrap: 'nowrap', width: '100%', height: 50 }}
                                            >
                                                <h4
                                                    style={{
                                                        margin: 0,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {item.name}{' '}
                                                    {item.required && <span style={{ color: 'red' }}>*</span>}
                                                </h4>

                                                {formik.values[item.field as keyof typeof mediaConfigs] && (
                                                    <IconButton
                                                        onClick={() => {
                                                            handleChangeFile(item.field, null);
                                                            mediaRefs.current[index].handleClearMedia();
                                                        }}
                                                    >
                                                        <Delete color="error" />
                                                    </IconButton>
                                                )}
                                            </Box>

                                            <Box
                                                sx={{
                                                    border: '2px solid #D5D5D5',
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    minWidth: 160,
                                                    maxWidth: 160,
                                                    minHeight: 240,
                                                    maxHeight: 240,
                                                }}
                                            >
                                                <header
                                                    style={{
                                                        backgroundColor: '#EFEFEF',
                                                        paddingInline: 8,
                                                        paddingBlock: 4,

                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        borderTopLeftRadius: 2,
                                                        borderTopRightRadius: 2,
                                                        height: 70,
                                                    }}
                                                >
                                                    <Typography color="GrayText" fontSize="0.8rem">
                                                        Image
                                                    </Typography>
                                                    <Typography color="GrayText" fontSize="0.8rem">
                                                        {item.dimensions}
                                                    </Typography>
                                                    <Typography color="GrayText" fontSize="0.8rem">
                                                        10 MB maximun
                                                    </Typography>
                                                </header>
                                                <MediaCard
                                                    file={formik.values[item.field as keyof typeof mediaConfigs]}
                                                    mediaConfig={mediaConfig}
                                                    isRequired={item.required}
                                                    handleChangeFile={(file) => handleChangeFile(item.field, file)}
                                                    ref={(ref) => handleSetMediaRef(ref, index)}
                                                />
                                            </Box>
                                            <Typography variant="caption" color="error">
                                                {formik.errors[item.field as keyof typeof mediaConfigs]}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                        {isSubmittingFiles && <LoadingOverlay message="Uploading files..." />}
                    </form>

                    <Preview
                        title={formik.values.name || 'Store Name'}
                        description={
                            formik.values.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                        }
                        domain={
                            formik.values.url ? `https://${formik.values.url}.xibit.live` : 'https://example.xibit.live'
                        }
                        banner={
                            formik.values.banner instanceof File
                                ? URL.createObjectURL(formik.values.banner)
                                : formik.values.banner
                        }
                        logo={
                            formik.values.logoSquare instanceof File
                                ? URL.createObjectURL(formik.values.logoSquare)
                                : formik.values.logoSquare
                        }
                        logoHorizontal={
                            formik.values.logoHorizontal instanceof File
                                ? URL.createObjectURL(formik.values.logoHorizontal)
                                : formik.values.logoHorizontal
                        }
                    />
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
                        <Button onClick={handleBackSave} color="success" variant="outlined">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box bgcolor="#e5e7eb">
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <Typography color="GrayText">Step 1 of 3</Typography>
                    <Box display="flex" gap={2}>
                        <Button type="button" variant="text" onClick={handleBack}>
                            <Typography color="gray">Back</Typography>
                        </Button>
                        <Button
                            type="button"
                            onClick={handleNext}
                            variant="contained"
                            disabled={Object.values(formik.errors).length > 0}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default function Organization() {
    return <Component />;
}
