'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import PageContainerFooter from '../../components/container/PageContainerFooter';

import { consignArtworkThunks } from '@/features/consignArtwork/thunks';
import { requestConsignThunk, validationConsignThunk } from '@/features/asset/thunks';
import { ConsignArtworkAssetStatus } from '@/features/consignArtwork/types';
import ConsignMessage from './consignMessage';
import { CompletedConsignTableStatus } from '../components/completedConsignPage/CompletedConsignTableStatus';
import AssetMediaPreview from '../components/assetMediaPreview';

interface ConsignStepsProps {
    [key: string]: {
        title: string;
        status?: string;
        actionTitle: string;
        value?: string | number | undefined;
        loading?: boolean;
        disabled?: boolean;
        actionFunc: () => void;
    };
}

const ConsignArtwork = () => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const { validateConsign, consignArtwork } = useSelector((state) => state.asset);

    const texts = {
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        reviewAndConsign: language['studio.consignArtwork.stepName.reviewAndConsign'],
        artworkListingTitle: language['studio.consignArtwork.artworkListing'],
        preview: language['studio.consignArtwork.consignmentStatus.preview.title'],
        requestConsign: language['studio.consignArtwork.requestConsign'],
    } as { [key: string]: string };

    const textsForConsignArtWorkStatus = {
        pending: {
            buttontitle: 'Request Consign Pending',
            message:
                'Your artwork is being reviewed by our team and you will be notified when it is made available for purchase',
        },
        running: {
            buttontitle: 'Request Consign Pending',
            message:
                'Your artwork is being reviewed by our team and you will be notified when it is made available for purchase',
        },
        rejected: {
            buttontitle: undefined,
            message: 'Your artwork did not pass our moderation review.',
        },
        active: {
            buttontitle: undefined,
            message: 'Your artwork is active',
        },
        default: {
            buttontitle: texts.requestConsign,
            message:
                'Nice work! Your artwork is ready for request consignment. Once you submit it our team will review it and approve accordingly',
        },
    } as { [key: string]: { buttontitle: string | undefined; message: string } };

    const getConsignArtworkStatus = (status: ConsignArtworkAssetStatus | undefined) =>
        textsForConsignArtWorkStatus[status || 'default'];

    const consignArtworkStatus = useMemo(
        () => getConsignArtworkStatus(consignArtwork?.status),
        [consignArtwork?.status]
    );

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/home/consignArtwork',
            title: texts.consignArtworkTitle,
        },
        {
            title: texts.reviewAndConsign,
        },
    ];

    useEffect(() => {
        dispatch(validationConsignThunk());
    }, []);

    const handlePreview = () => {
        dispatch(consignArtworkThunks.checkPreview());
    };
    const handleCancelRequestConsign = () => {
        // do something
    };

    const consignSteps: ConsignStepsProps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.preview,
            actionFunc: handlePreview,
        },
        ...(consignArtwork?.status === 'pending' && {
            cancelRequest: {
                title: 'Cancel Request Consignment',
                actionTitle: 'Cancel',
                actionFunc: handleCancelRequestConsign,
            },
        }),
    };

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        dispatch(requestConsignThunk());
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText={consignArtworkStatus?.buttontitle || textsForConsignArtWorkStatus['default'].buttontitle}
                title={texts.consignArtworkTitle}
                stepNumber={6}
                submitDisabled={
                    validateConsign.status !== 'success' ||
                    consignArtwork?.status === 'pending' ||
                    consignArtwork?.status === 'running'
                }
                backOnclick={() => router.push(`/home/consignArtwork`)}
                display={!!consignArtworkStatus?.buttontitle}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />

                <Box marginBottom={2}>
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
                                    <Box
                                        style={{
                                            opacity: !v.value && !v.status ? 0 : 1,
                                        }}
                                        width={110}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            height="100%"
                                            width="100%"
                                            color={v.status && !v.value ? 'white' : 'inherit'}
                                            bgcolor={
                                                (v?.status && !v.value && theme.palette.text.disabled) || '#EFEFEF'
                                            }
                                        >
                                            {v.value || v.status}
                                        </Box>
                                    </Box>
                                    <Box width={120} marginLeft={1}>
                                        <Box width={100}>
                                            <Button
                                                disabled={v?.disabled || v?.loading}
                                                onClick={v.actionFunc}
                                                size="small"
                                                variant="contained"
                                                fullWidth
                                            >
                                                {v.loading ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        Loading...
                                                    </Box>
                                                ) : (
                                                    v.actionTitle
                                                )}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <ConsignMessage
                            validateConsign={validateConsign}
                            message={consignArtworkStatus?.message || textsForConsignArtWorkStatus['default'].message}
                        />
                        {consignArtwork?.status === 'pending' && (
                            <Box display="flex" justifyContent={'space-between'}>
                                <CompletedConsignTableStatus onStatusChange={() => {}} selectedStatus="preview" />
                                <AssetMediaPreview />
                            </Box>
                        )}

                        {consignArtwork?.status === 'rejected' && (
                            <Typography variant="h6" fontWeight="normal" color="GrayText">
                                If you think you have been flagged incorrectly, please submit the following form:{' '}
                                <a href="https://vtru.xyz/blockappeal" target="_blank" rel="noreferrer">
                                    https://vtru.xyz/blockappeal
                                </a>
                            </Typography>
                        )}
                    </Box>
                </Box>
            </PageContainerFooter>
        </form>
    );
};

export default ConsignArtwork;
