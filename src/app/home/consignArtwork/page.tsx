'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

import Box from '@mui/material/Box';
import AssetMediaPreview from '@/app/home/consignArtwork/components/assetMediaPreview';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { StepId, StepStatus } from '@/features/consignArtwork/types';
import { publishThunk } from '@/features/asset/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import { CompletedConsignPage } from '@/app/home/consignArtwork/components/completedConsignPage/CompletedConsignPage';

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
    const { completedSteps, artworkListing } = useSelector((state) => state.consignArtwork);

    const checkAllCompletedSteps = Object.values(completedSteps)
        .filter((v) => !v.optional && v.stepId !== 'reviewAndConsign')
        .every((v) => v.status === 'completed');

    const texts = {
        homeTitle: language['studio.home.title'],
        stepPublishMessageSuccess: language['studio.consignArtwork.stepPublishMessageSuccess'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        consignArtworkSubtitle: language['studio.consignArtwork.subtitle'],
        consignArtworkSubtitleLink: language['studio.consignArtwork.subtitle.link'],
        optional: language['studio.consignArtwork.optional'],
        moreInformation: language['studio.consignArtwork.subtitle.moreInformation'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            title: texts.consignArtworkTitle,
        },
    ];

    const handleChangePage = (page: StepId, stepStatus: StepStatus) => {
        router.push(`${pathname}/${page}`);
    };

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        if (status === 'draft' || status === 'preview') router.push(`${pathname}/reviewAndConsign`);
        else {
            router.push(`${pathname}/consignmentStatus`);
        }
    };

    const successColor = '#93C47D';
    const warningColor = '#F6B26B';

    const grayColor = theme.palette.text.disabled;
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const smUp = useMediaQuery((them: Theme) => them.breakpoints.up('sm'));
    const xs = useMediaQuery((them: Theme) => them.breakpoints.up('xs'));

    useEffect(() => {
        if (checkAllCompletedSteps) {
            router.prefetch(`${pathname}/consignmentStatus`);
            router.prefetch(`${pathname}/reviewAndConsign`);
        }

        Object.values(completedSteps).forEach((step) => {
            router.prefetch(`${pathname}/${step.stepId}`);
        });
        if (!status?.length) dispatch(publishThunk({ status: 'draft' }));
    }, [status]);

    // TODO: PUT THIS IN REDUX STORE
    const isConsignCompleted = previewAndConsign.artworkListing?.checked || !!artworkListing  /*Object.values(previewAndConsign).every((v) => v.checked == true)*/;

    if (isConsignCompleted) {
        return <CompletedConsignPage />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitDisabled={!checkAllCompletedSteps}
                backPathRouter="/home"
                title={texts.consignArtworkTitle}
                submitText={(language['studio.consignArtwork.publishButton'] as TranslateFunction)({
                    data: { status },
                })}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />

                <Grid display="flex" flexWrap="wrap" marginBottom={6} item xs={12} lg={6}>
                    <Box marginBottom={2}>
                        <Box>
                            <Typography variant="h6" fontWeight="normal" color="GrayText">
                                {texts.consignArtworkSubtitle}
                                <Typography variant="h6" fontWeight="normal" color="GrayText">
                                    {texts.moreInformation}{' '}
                                    <Typography
                                        variant="h6"
                                        display="inline"
                                        style={{
                                            fontWeight: 400,
                                            color: '#007BFF',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                        }}
                                        onClick={() => window.open('https://dreamer.vitruveo.xyz/', '_blank')}
                                    >
                                        {texts.consignArtworkSubtitleLink}
                                    </Typography>
                                </Typography>
                            </Typography>
                        </Box>
                        <Box maxWidth={700} p={2}>
                            {Object.values(completedSteps).map((v) => (
                                <Grid
                                    sx={{ alignItems: 'center!important' }}
                                    container
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    key={v.stepId}
                                >
                                    <Grid item>
                                        <Typography
                                            title={`${language[v.stepName] as string} ${
                                                v.optional ? ` (${texts.optional})` : ''
                                            } `}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: xL || smUp || xs ? 300 : 130,
                                            }}
                                            my={2}
                                            variant="h6"
                                            fontWeight="normal"
                                            color="GrayText"
                                        >
                                            {language[v.stepName] as string}
                                            {v.optional ? ` (${texts.optional})` : ''}
                                        </Typography>
                                    </Grid>
                                    <Grid display="flex" flexWrap="wrap" width={350} item>
                                        <Box width={110} display="flex" alignItems="center">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                height="100%"
                                                width="100%"
                                                color="white"
                                                bgcolor={
                                                    (v.status === 'completed' && successColor) ||
                                                    (v.status === 'notStarted' && grayColor) ||
                                                    warningColor
                                                }
                                            >
                                                {language[v.statusName] as string}
                                            </Box>
                                        </Box>
                                        <Box width={100} marginLeft={1}>
                                            <Button
                                                style={{ opacity: v.stepId === 'reviewAndConsign' ? 0 : 1 }}
                                                disabled={
                                                    v.stepId === 'reviewAndConsign' ||
                                                    status === 'published' ||
                                                    status === 'preview'
                                                }
                                                onClick={() => handleChangePage(v.stepId, v.status)}
                                                size="small"
                                                variant="contained"
                                                fullWidth
                                            >
                                                {(language['studio.consignArtwork.stepButton'] as TranslateFunction)({
                                                    status: v.status,
                                                })}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" justifyContent={!xL ? 'flex-start' : 'center'}>
                        <AssetMediaPreview />
                    </Box>
                </Grid>
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
