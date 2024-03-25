'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Typography, useTheme } from '@mui/material';

import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';

import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';

interface ConsignStepsProps {
    [key: string]: {
        title: string;
        status?: string;
        actionTitle: string;
        value?: string | number;
        actionFunc: () => void;
    };
}

const ConsignArtwork = () => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const pathname = usePathname();
    const router = useRouter();

    const { language } = useI18n();

    const theme = useTheme();
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.asset);
    const { previewAndConsign } = useSelector((state) => state.consignArtwork);

    const texts = {
        homeTitle: language['studio.home.title'],
        stepPublishMessageSuccess: language['studio.consignArtwork.stepPublishMessageSuccess'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        consignArtworkSubtitle: language['studio.consignArtwork.subtitle'],
        consignArtworkSubtitleLink: language['studio.consignArtwork.subtitle.link'],
        optional: language['studio.consignArtwork.optional'],
        moreInformation: language['studio.consignArtwork.subtitle.moreInformation'],
        reviewAndConsign: language['studio.consignArtwork.stepName.reviewAndConsign'],
    } as { [key: string]: string };

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

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        router.push(`${pathname}/consignmentStatus`);
    };

    const grayColor = theme.palette.text.disabled;

    const consignSteps: ConsignStepsProps = {
        artworkListing: {
            title: 'Artwork Listing',
            actionTitle: 'Preview',
            actionFunc: () => {},
        },
        creatorWallet: {
            title: 'Creator Wallet',
            actionTitle: previewAndConsign.creatorWallet ? 'Disconnect' : 'Connect',
            value: previewAndConsign.creatorWallet,
            actionFunc: () => {
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorWallet: previewAndConsign.creatorWallet ? '' : '0xA3FD…FEDS',
                    })
                );
            },
        },
        creatorCredits: {
            title: 'Creator Credits',
            actionTitle: 'Request',
            value: previewAndConsign.creatorCredits,
            actionFunc: () => {
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorCredits: 1,
                    })
                );
            },
        },
        creatorContract: {
            title: 'Creator Contract',
            status: 'Not Created',
            actionTitle: previewAndConsign.creatorContract ? 'View' : 'Start',
            value: previewAndConsign.creatorContract,
            actionFunc: () => {
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorContract: '0xED34…0012',
                    })
                );
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitDisabled={true}
                backPathRouter="/home/consignArtwork"
                title={texts.consignArtworkTitle}
                submitText="Consign"
                stepNumber={6}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />

                <Box marginBottom={2}>
                    <Box>
                        <Typography variant="h6" fontWeight="normal" color="GrayText">
                            🎉 Nice work! Your artwork is ready for consignment.
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
                                            bgcolor={(v?.status && !v.value && grayColor) || '#EFEFEF'}
                                        >
                                            {v.value || v.status}
                                        </Box>
                                    </Box>
                                    <Box width={100} marginLeft={1}>
                                        <Button
                                            disabled={status === 'published' || status === 'preview'}
                                            onClick={v.actionFunc}
                                            size="small"
                                            variant="contained"
                                            fullWidth
                                        >
                                            {v.actionTitle}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <CustomizedSnackbar
                    type={toastr.type}
                    open={toastr.open}
                    message={toastr.message}
                    setOpentate={setToastr}
                />
            </PageContainerFooter>
        </form>
    );
};

export default ConsignArtwork;
