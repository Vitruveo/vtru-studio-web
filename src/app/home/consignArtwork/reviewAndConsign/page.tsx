'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { useAccount, useContractRead, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';

import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { WalletProvider } from '../../components/apps/wallet';
import { updateAssetStep } from '@/features/asset/requests';
import { useCookies } from 'react-cookie';

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
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const [cookies, setCookie] = useCookies(['token']);

    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const pathname = usePathname();
    const router = useRouter();

    const { language } = useI18n();

    const theme = useTheme();
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.asset);
    const { previewAndConsign } = useSelector((state) => state.consignArtwork);

    useEffect(() => {
        if (openConnectModal && connectWallet) {
            openConnectModal();
            setConnectWallet(false);
        }
        return () => {
            disconnectAsync();
        };
    }, [connectWallet, openConnectModal]);

    useEffect(() => {
        if (isConnected && address) {
            dispatch(
                consignArtworkActionsCreators.changePreviewAndConsign({
                    creatorWallet: {
                        checked: true,
                        value: address,
                    },
                })
            );
        }
    }, [isConnected, address]);

    const handleAddWallet = async () => {
        if (isConnected) await disconnectAsync();
        setConnectWallet(true);
    };

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

    // TODO: VERIFICAR SE A CHAMADA A API ESTÁ SENDO FEITO DA MANEIRA CORRETA
    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        router.push(`/home/consignArtwork/DoneConsign`);
    };

    const grayColor = theme.palette.text.disabled;

    // DISABLED FOR NOW
    const handleWalletConnection = () => {
        if (previewAndConsign.creatorWallet?.value) {
            dispatch(
                consignArtworkActionsCreators.changePreviewAndConsign({
                    creatorWallet: {
                        value: '',
                        checked: false,
                    },
                })
            );
            disconnectAsync();
            return;
        }
        handleAddWallet();
    };

    const handlePreview = () => {
        setCookie('token', localStorage.getItem('token'), { path: '/', domain: window.location.hostname });
        window.open('https://www.google.com', '_blank');
        dispatch(
            consignArtworkActionsCreators.changePreviewAndConsign({
                artworkListing: {
                    checked: true,
                },
            })
        );
    };

    const consignSteps: ConsignStepsProps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.preview,
            actionFunc: handlePreview,
        },
        creatorWallet: {
            title: 'Creator Wallet',
            actionTitle: previewAndConsign.creatorWallet?.value ? 'Disconnect' : 'Connect',
            value:
                previewAndConsign.creatorWallet?.value &&
                previewAndConsign.creatorWallet?.value.slice(0, 6) +
                    '...' +
                    previewAndConsign.creatorWallet?.value.slice(-4),
            actionFunc: () => {},
            disabled: true,
        },
        creatorCredits: {
            title: 'Creator Credits',
            actionTitle: previewAndConsign.creatorCredits?.value ? 'Requested' : 'Request',
            value: previewAndConsign.creatorCredits?.value,
            loading: previewAndConsign.creatorCredits?.loading,
            disabled: true /*!previewAndConsign.creatorWallet?.value || previewAndConsign.creatorCredits?.value === 1*/,
            actionFunc: async () => {
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorCredits: {
                            checked: false,
                            loading: true,
                        },
                    })
                );
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorCredits: {
                            checked: true,
                            value: 1,
                            loading: false,
                        },
                    })
                );
            },
        },
        creatorContract: {
            title: 'Creator Contract',
            status: 'Not Created',
            actionTitle: previewAndConsign.creatorContract?.value ? 'View' : 'Start',
            value: previewAndConsign.creatorContract?.value,
            disabled: true /* !previewAndConsign.creatorWallet?.value */,
            loading: previewAndConsign.creatorContract?.loading,
            actionFunc: async () => {
                if (previewAndConsign.creatorContract?.value) {
                    window.open('https://explorer.vitruveo.xyz/', '_blank');
                    return;
                }

                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorContract: {
                            checked: false,
                            loading: true,
                        },
                    })
                );
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(
                    consignArtworkActionsCreators.changePreviewAndConsign({
                        creatorContract: {
                            checked: true,
                            value: '0x1234567890',
                            loading: false,
                        },
                    })
                );
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Consign"
                title={texts.consignArtworkTitle}
                stepNumber={6}
                backOnclick={() => router.push(`/home/consignArtwork`)}
                submitDisabled={
                    !previewAndConsign.artworkListing
                        ?.checked /* Object.values(previewAndConsign).some((v) => !v.checked) */
                }
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
                                                disabled={
                                                    v?.disabled ||
                                                    v?.loading ||
                                                    status === 'published' ||
                                                    status === 'preview'
                                                }
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
                                        {v.title != 'Artwork Listing' && (
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

const ConsignArtworkHOC = () => {
    return (
        <WalletProvider>
            <ConsignArtwork />
        </WalletProvider>
    );
};

export default ConsignArtworkHOC;
