'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Grid, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

import Box from '@mui/material/Box';
import AssetMediaPreview from '@/app/(main)/consign/components/assetMediaPreview';
import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { StepId } from '@/features/consign/types';
import { getAssetThunk, publishThunk } from '@/features/asset/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import Comments from './components/comments';

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
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);
    const selectedAsset = useSelector((state) => state.user.selectedAsset);
    const { completedSteps } = useSelector((state) => state.consignArtwork);
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);

    const checkAllCompletedSteps = Object.values(completedSteps)
        .filter((v) => !v.optional && v.stepId !== 'reviewAndConsign')
        .every((v) => v.status === 'completed');

    const texts = {
        homeTitle: language['studio.home.title'],
        stepPublishMessageSuccess: language['studio.consignArtwork.stepPublishMessageSuccess'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        consignArtworkSubtitle: language['studio.consignArtwork.subtitle'],
        optional: language['studio.consignArtwork.optional'],
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

    const handleChangePage = (page: StepId) => {
        router.push(`${pathname}/${page}`);
    };

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        router.push(`${pathname}/reviewAndConsign`);
    };

    const successColor = '#93C47D';
    const warningColor = '#F6B26B';

    const grayColor = theme.palette.text.disabled;
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const smUp = useMediaQuery((them: Theme) => them.breakpoints.up('sm'));
    const xs = useMediaQuery((them: Theme) => them.breakpoints.up('xs'));

    useEffect(() => {
        dispatch(getAssetThunk(selectedAsset));
    }, []);

    useEffect(() => {
        if (checkAllCompletedSteps) {
            router.prefetch(`${pathname}/reviewAndConsign`);
        }

        Object.values(completedSteps).forEach((step) => {
            router.prefetch(`${pathname}/${step.stepId}`);
        });
        if (!status?.length) dispatch(publishThunk({ status: 'draft' }));
    }, [status]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitDisabled={!checkAllCompletedSteps}
                backPathRouter="/home"
                title={texts.consignArtworkTitle}
                submitText={(language['studio.consignArtwork.publishButton'] as TranslateFunction)({
                    data: { status },
                })}
                hasSubmitButton={!hasContract}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />
                <Box ml={2}>
                    <Comments assetId={selectedAsset} />
                </Box>
                <Grid container>
                    <Grid item md={12} lg={6}>
                        <Box marginBottom={2}>
                            <Stack pl={2}>
                                <Typography variant="h6" fontWeight="normal" color="GrayText">
                                    {texts.consignArtworkSubtitle}
                                </Typography>
                            </Stack>
                            <Box p={2}>
                                {Object.values(completedSteps).map((v) => {
                                    return (
                                        <Grid
                                            sx={{ alignItems: 'center!important' }}
                                            container
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            key={v.stepId}
                                        >
                                            <Grid item lg={5} xl={4}>
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
                                            <Grid display="flex" flexWrap="wrap" item lg={7} xl={8}>
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
                                                        disabled={v.stepId === 'reviewAndConsign'}
                                                        onClick={() => handleChangePage(v.stepId)}
                                                        size="small"
                                                        variant="contained"
                                                        fullWidth
                                                    >
                                                        {hasContract
                                                            ? ['licenses', 'assetMetadata'].includes(v.stepId)
                                                                ? 'View/Edit'
                                                                : 'View'
                                                            : (
                                                                  language[
                                                                      'studio.consignArtwork.stepButton'
                                                                  ] as TranslateFunction
                                                              )({
                                                                  status: v.status,
                                                              })}
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={12} lg={6}>
                        <AssetMediaPreview />
                    </Grid>
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
