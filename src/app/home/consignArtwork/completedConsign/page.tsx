'use client';

import { ChangeEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';

import PageContainerFooter from '@/app/home/components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import { ConsignArtworkAssetStatus } from '@/features/consignArtwork/types';
import { useToastr } from '@/app/hooks/useToastr';
import { consignArtworkThunks } from '@/features/consignArtwork/thunks';
import { EXPLORER_URL } from '@/constants/explorer';
import { CompletedConsignTableStatus } from '../components/completedConsignPage/CompletedConsignTableStatus';
import AssetMediaPreview from '../components/assetMediaPreview';
import { getAssetThunk } from '@/features/asset/thunks';

// TODO: ADICIONAR TRADUÇÃO

interface FormType {
    selectedStatus: ConsignArtworkAssetStatus;
}

export default function CompletedConsignPage() {
    const dispatch = useDispatch();
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const { language } = useI18n();
    const theme = useTheme();
    const toastr = useToastr();

    const previewAndConsign = useSelector((state) => state.consignArtwork.previewAndConsign);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);
    const status = useSelector((state) => state.consignArtwork.status);
    const userIsBlocked = useSelector((state) => state.user?.vault?.isBlocked);
    const transactionHash = useSelector((state) => state.asset.contractExplorer?.tx);
    const selectedAsset = useSelector((state) => state.user.selectedAsset);

    const grayColor = theme.palette.text.disabled;

    useEffect(() => {
        dispatch(getAssetThunk(selectedAsset));
    }, []);

    const formik = useFormik<FormType>({
        initialValues: {
            selectedStatus: status,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(consignArtworkThunks.updateStatus(values.selectedStatus));
        },
    });

    const texts = {
        artworkListingTitle: language['studio.consignArtwork.artworkListing'],
        artworkListingActionTitle: language['studio.consignArtwork.consignmentStatus.preview.title'],
        consignedTitle: language['studio.consignArtwork.artworkConsignedTitle'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        view: language['studio.consignArtwork.consignmentStatus.view'],
    } as { [key: string]: string };

    const handlePreview = () => {
        dispatch(consignArtworkThunks.preview());
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (status !== 'active') formik.handleChange(e);
    };

    const consignSteps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.artworkListingActionTitle,
            actionFunc: handlePreview,
            value: undefined,
        },
        creatorContract: {
            title: 'Artwork Transaction',
            actionTitle: texts.view,
            value: previewAndConsign.creatorContract?.value,
            actionFunc: async () => {
                if (transactionHash) {
                    window.open(`${EXPLORER_URL}/tx/${transactionHash}`, '_blank');
                } else {
                    toastr.display({ type: 'error', message: 'Explorer URL not found' });
                }
            },
        },
    };

    const BCrumb: BreadCrumbItem[] = [
        {
            title: 'Home',
        },
        {
            title: texts.consignArtworkTitle,
            to: '/home/consignArtwork',
        },
    ];

    return (
        <form onSubmit={formik.handleSubmit}>
            <PageContainerFooter
                submitDisabled={status === 'active' || status === 'blocked' || userIsBlocked}
                hasBackButton
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />
                <Grid display="flex" flexWrap="wrap" marginBottom={6} item xs={12} lg={6}>
                    <Box marginBottom={2}>
                        <Box pl={2}>
                            <Typography variant="h6" fontWeight="normal" color="GrayText">
                                {texts.consignedTitle}
                            </Typography>
                        </Box>
                        <Box maxWidth={600} p={2}>
                            {Object.values(consignSteps).map((v) => (
                                <Box
                                    sx={{ alignItems: 'center!important' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                    key={v.title}
                                >
                                    <Box flex={2}>
                                        <Typography
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}
                                            my={2}
                                            variant="h6"
                                            fontWeight="normal"
                                            color="GrayText"
                                        >
                                            {v.title}
                                        </Typography>
                                    </Box>
                                    <Box flex={2} display="flex">
                                        <Box width={110} display="flex" alignItems="center">
                                            {v.value && (
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    height="100%"
                                                    width="100%"
                                                    color={!v.value ? 'white' : 'inherit'}
                                                    bgcolor={(!v?.value && grayColor) || '#EFEFEF'}
                                                >
                                                    {v.value}
                                                </Box>
                                            )}
                                        </Box>
                                        <Box width={100} marginLeft={1}>
                                            <Button onClick={v.actionFunc} size="small" variant="contained" fullWidth>
                                                {v.actionTitle}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            {
                                <Box mt={4}>
                                    <CompletedConsignTableStatus
                                        selectedStatus={formik.values.selectedStatus}
                                        onStatusChange={handleChange}
                                    />
                                </Box>
                            }
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" justifyContent={!xL ? 'flex-start' : 'center'}>
                        <AssetMediaPreview />
                    </Box>
                </Grid>
            </PageContainerFooter>
        </form>
    );
}
