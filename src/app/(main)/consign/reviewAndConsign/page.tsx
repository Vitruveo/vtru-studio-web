'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import PageContainerFooter from '../../components/container/PageContainerFooter';

import { consignArtworkThunks } from '@/features/consign/thunks';
import { requestConsignThunk, validationConsignThunk, deleteRequestConsignThunk } from '@/features/asset/thunks';
import { ConsignArtworkAssetStatus } from '@/features/consign/types';
import ConsignMessage from './consignMessage';
import { CompletedConsignTableStatus } from '../components/completedConsignPage/CompletedConsignTableStatus';
import AssetMediaPreview from '../components/assetMediaPreview';
import Comments from '../components/comments';

interface ConsignStepsProps {
    [key: string]: {
        title: string;
        status?: string;
        actionTitle: string;
        value?: string | number | undefined;
        loading?: boolean;
        disabled?: boolean;
        actionFunc: () => void;
        show: boolean;
    };
}

const ConsignArtwork = () => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const { validateConsign, consignArtwork, _id } = useSelector((state) => state.asset);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);

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
        blocked: {
            buttontitle: undefined,
            message: 'Your artwork is blocked',
        },
        draft: {
            buttontitle: texts.requestConsign,
            message:
                'Nice work! Your artwork is ready for request consignment. Once you submit it our team will review it and approve accordingly',
        },
        error: {
            buttontitle: 'Request Consign Error',
            message: 'There was an error on consignment. Please contact one of our moderators',
        },
    } as { [key: string]: { buttontitle: string | undefined; message: string } };

    const getConsignArtworkStatus = (status: ConsignArtworkAssetStatus | undefined) =>
        textsForConsignArtWorkStatus[status || 'draft'];

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
            to: '/consign',
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
        dispatch(deleteRequestConsignThunk());
    };

    const consignSteps: ConsignStepsProps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.preview,
            actionFunc: handlePreview,
            show: true,
        },
        cancelRequest: {
            title: 'Cancel Request Consignment',
            actionTitle: 'Cancel',
            actionFunc: handleCancelRequestConsign,
            show: consignArtwork?.status === 'pending',
        },
    };

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        dispatch(requestConsignThunk());
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText={consignArtworkStatus?.buttontitle || textsForConsignArtWorkStatus['draft'].buttontitle}
                title={texts.consignArtworkTitle}
                stepNumber={6}
                submitDisabled={
                    validateConsign.status !== 'success' ||
                    consignArtwork?.status === 'pending' ||
                    consignArtwork?.status === 'running' ||
                    consignArtwork?.status === 'error'
                }
                backOnclick={() => {
                    if (consignArtwork?.status === 'pending') {
                        router.push('/home');

                        return;
                    }

                    router.push('/consign');
                }}
                display={!!consignArtworkStatus?.buttontitle}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />

                <Box marginBottom={2}>
                    <Box maxWidth={600} p={2}>
                        {Object.values(consignSteps)
                            .filter((v) => v.show)
                            .map((v) => (
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
                            message={consignArtworkStatus?.message || textsForConsignArtWorkStatus['draft'].message}
                        />
                        {consignArtwork?.status !== 'rejected' && (
                            <Box ml={2}>
                                <Comments assetId={_id} />
                                <Box display="flex" justifyContent={'space-between'}>
                                    <CompletedConsignTableStatus onStatusChange={() => { }} selectedStatus="preview" />
                                    <AssetMediaPreview />
                                </Box>
                            </Box>
                        )}

                        {consignArtwork?.status === 'rejected' && (
                            <Box display={'flex'} flexDirection={'column'} pt={1} pl={2}>
                                <Typography variant="h6" fontWeight="normal" color="GrayText" mb={2}>
                                    If you think you have been flagged incorrectly, please submit the following form:{' '}
                                    <a href="https://vtru.xyz/blockappeal" target="_blank" rel="noreferrer">
                                        https://vtru.xyz/blockappeal
                                    </a>
                                </Typography>
                                <Comments assetId={_id} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </PageContainerFooter>
        </form>
    );
};

export default ConsignArtwork;
