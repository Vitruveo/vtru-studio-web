'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { useAccount, useConnectorClient } from 'wagmi';

import PageContainerFooter from '@/app/(main)/components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import { ConsignArtworkAssetStatus } from '@/features/consign/types';
import { useToastr } from '@/app/hooks/useToastr';
import { updateAssetStatusThunk } from '@/features/asset/thunks';
import { consignArtworkThunks } from '@/features/consign/thunks';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { CompletedConsignTableStatus } from '../components/completedConsignPage/CompletedConsignTableStatus';
import AssetMediaPreview from '../components/assetMediaPreview';
import { getAssetThunk, signerUpdateAssetStatusThunk } from '@/features/asset/thunks';
import axios from 'axios';
import { NODE_ENV } from '@/constants/api';

const notAllowedStatus = ['draft', 'preview'];

// TODO: ADICIONAR TRADUÇÃO

interface FormType {
    selectedStatus: ConsignArtworkAssetStatus;
}

export default function CompletedConsignPage() {
    const dispatch = useDispatch();
    const [explorerUrl, setExplorerUrl] = useState('');
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const { language } = useI18n();
    const theme = useTheme();
    const toastr = useToastr();
    const { data: client } = useConnectorClient();
    const { address } = useAccount();

    const previewAndConsign = useSelector((state) => state.consignArtwork.previewAndConsign);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);
    const status = useSelector((state) => state.consignArtwork.status);
    const userIsBlocked = useSelector((state) => state.user?.vault?.isBlocked);
    const transactionHash = useSelector((state) => state.asset.contractExplorer?.tx);
    const isMinted = useSelector((state) => state.asset.mintExplorer?.transactionHash);
    const selectedAsset = useSelector((state) => state.user.selectedAsset);
    const wallets = useSelector((state) => state.user.wallets);

    const [loading, setLoading] = useState(false);

    const grayColor = theme.palette.text.disabled;

    useEffect(() => {
        dispatch(getAssetThunk(selectedAsset));
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setExplorerUrl(rowData.data[NODE_ENV].vitruveo.explorer_url);
        };
        fetchData();
    }, []);

    const formik = useFormik<FormType>({
        initialValues: {
            selectedStatus: status,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                if (isMinted || notAllowedStatus.includes(values.selectedStatus)) return;

                const signedMessage = await dispatch(
                    signerUpdateAssetStatusThunk({
                        assetKey: selectedAsset,
                        status: values.selectedStatus,
                        client: client!,
                    })
                );

                if (!signedMessage) {
                    toastr.display({ type: 'error', message: 'Error signing message' });
                    return;
                }

                if (!wallets.some((wallet) => wallet.address === address)) {
                    toastr.display({ type: 'error', message: 'Wallet not found in your account' });
                    return;
                }

                await dispatch(
                    updateAssetStatusThunk({
                        assetKey: selectedAsset,
                        status: values.selectedStatus,
                    })
                );

                toastr.display({ type: 'success', message: 'Status updated' });
            } catch (error) {
                console.error(error);
                toastr.display({ type: 'error', message: 'Error updating status' });
            } finally {
                setLoading(false);
            }
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
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as ConsignArtworkAssetStatus;

        if (isMinted || notAllowedStatus.includes(value)) return;

        formik.setFieldValue('selectedStatus', value);
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
                    window.open(`${explorerUrl}/tx/${transactionHash}`, '_blank');
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
            to: '/consign',
        },
    ];

    const renderMessage = () => {
        if (loading) return 'Loading...';

        if (userIsBlocked) return 'You are blocked';

        if (!address) return 'Connect your wallet';

        return 'Save';
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <PageContainerFooter
                submitDisabled={!address || loading || userIsBlocked || status === formik.values.selectedStatus}
                hasBackButton
                submitText={renderMessage()}
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
