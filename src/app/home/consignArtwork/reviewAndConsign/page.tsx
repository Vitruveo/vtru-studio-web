'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import { useI18n } from '@/app/hooks/useI18n';

import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { WalletProvider } from '../../components/apps/wallet';
import { useToastr } from '@/app/hooks/useToastr';
import { consignArtworkThunks } from '@/features/consignArtwork/thunks';
import { updateAssetStep } from '@/features/asset/requests';

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
    const toastr = useToastr();
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const { disconnectAsync } = useDisconnect();
    const { isConnected, address } = useAccount();
    const { openConnectModal } = useConnectModal();

    const { status } = useSelector((state) => state.asset);
    const { previewAndConsign } = useSelector((state) => state.consignArtwork);
    const wallets = useSelector((state) => state.user.wallets);

    // Handles the wallet address change
    // useEffect(() => {
    //     let hasWallet = false;
    //     if (isConnected && address) {
    //         for (const wallet of wallets) {
    //             if (wallet.address === address) {
    //                 dispatch(
    //                     consignArtworkActionsCreators.changePreviewAndConsign({
    //                         creatorWallet: {
    //                             checked: true,
    //                             value: address,
    //                         },
    //                     })
    //                 );
    //                 hasWallet = true;
    //                 break;
    //             }
    //         }
    //         if (!hasWallet) {
    //             toastr.display({
    //                 type: 'error',
    //                 message: 'Wallet not found, please add it to your account at your profile.',
    //             });
    //         }
    //     }
    // }, [isConnected, address]);

    const texts = {
        homeTitle: language['studio.home.title'],
        stepPublishMessageSuccess: language['studio.consignArtwork.stepPublishMessageSuccess'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        consignArtworkSubtitle: language['studio.consignArtwork.subtitle'],
        consignArtworkSubtitleLink: language['studio.consignArtwork.subtitle.link'],
        optional: language['studio.consignArtwork.optional'],
        moreInformation: language['studio.consignArtwork.subtitle.moreInformation'],
        reviewAndConsign: language['studio.consignArtwork.stepName.reviewAndConsign'],
        artworkListingTitle: language['studio.consignArtwork.artworkListing'],
        preview: language['studio.consignArtwork.consignmentStatus.preview.title'],
        comingSoon: language['studio.consignArtwork.comingSoon'],
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

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        router.push(`/home/consignArtwork/DoneConsign`);
    };

    const grayColor = theme.palette.text.disabled;

    const handleWalletConnection = () => {
        if (isConnected || previewAndConsign.creatorWallet?.value) {
            disconnectAsync();
            dispatch(
                consignArtworkActionsCreators.changePreviewAndConsign({ creatorWallet: { checked: false, value: '' } })
            );
            return;
        }
        openConnectModal?.();
    };

    const handlePreview = () => {
        dispatch(consignArtworkThunks.checkPreview());
    };

    const consignSteps: ConsignStepsProps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.preview,
            actionFunc: handlePreview,
        },
        // creatorWallet: {
        //     title: 'Creator Wallet',
        //     actionTitle: previewAndConsign.creatorWallet?.value ? 'Disconnect' : 'Connect',
        //     value:
        //         previewAndConsign.creatorWallet?.value &&
        //         previewAndConsign.creatorWallet?.value.slice(0, 6) +
        //             '...' +
        //             previewAndConsign.creatorWallet?.value.slice(-4),
        //     actionFunc: handleWalletConnection,
        //     disabled: false,
        // },
        // creatorCredits: {
        //     title: 'Creator Credits',
        //     actionTitle: previewAndConsign.creatorCredits?.value ? 'Requested' : 'Request',
        //     value: previewAndConsign.creatorCredits?.value,
        //     loading: previewAndConsign.creatorCredits?.loading,
        //     disabled: true /*!previewAndConsign.creatorWallet?.value || previewAndConsign.creatorCredits?.value === 1*/,
        //     actionFunc: async () => {
        //         dispatch(
        //             consignArtworkActionsCreators.changePreviewAndConsign({
        //                 creatorCredits: {
        //                     checked: false,
        //                     loading: true,
        //                 },
        //             })
        //         );
        //         await new Promise((resolve) => setTimeout(resolve, 2000));
        //         dispatch(
        //             consignArtworkActionsCreators.changePreviewAndConsign({
        //                 creatorCredits: {
        //                     checked: true,
        //                     value: 1,
        //                     loading: false,
        //                 },
        //             })
        //         );
        //     },
        // },
        // creatorContract: {
        //     title: 'Creator Contract',
        //     status: 'Not Created',
        //     actionTitle: previewAndConsign.creatorContract?.value ? 'View' : 'Start',
        //     value: previewAndConsign.creatorContract?.value,
        //     disabled: true /* !previewAndConsign.creatorWallet?.value */,
        //     loading: previewAndConsign.creatorContract?.loading,
        //     actionFunc: async () => {
        //         if (previewAndConsign.creatorContract?.value) {
        //             window.open('https://explorer.vitruveo.xyz/', '_blank');
        //             return;
        //         }

        //         dispatch(
        //             consignArtworkActionsCreators.changePreviewAndConsign({
        //                 creatorContract: {
        //                     checked: false,
        //                     loading: true,
        //                 },
        //             })
        //         );
        //         await new Promise((resolve) => setTimeout(resolve, 2000));
        //         dispatch(
        //             consignArtworkActionsCreators.changePreviewAndConsign({
        //                 creatorContract: {
        //                     checked: true,
        //                     value: '0x1234567890',
        //                     loading: false,
        //                 },
        //             })
        //         );
        //     },
        // },
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Consign"
                title={texts.consignArtworkTitle}
                stepNumber={6}
                backOnclick={() => router.push(`/home/consignArtwork`)}
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
                                        {v.title != 'Artwork Listing' && v.title != 'Creator Wallet' && (
                                            <Box position="relative" left="110px">
                                                <Typography position="absolute" top="-26px">
                                                    {texts.comingSoon}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </PageContainerFooter>
        </form>
    );
};

const ConsignArtworkHOC = () => {
    return (
        <WalletProvider>
            <ConsignArtwork />
        </WalletProvider>
    );
};

export default ConsignArtworkHOC;
