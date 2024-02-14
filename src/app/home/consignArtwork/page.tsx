'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Grid, Typography, useTheme } from '@mui/material';

import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { StepId, StepStatus } from '@/features/consignArtwork/types';
import { publishThunk } from '@/features/asset/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';

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

    const status = useSelector((state) => state.asset.status);
    const { completedSteps } = useSelector((state) => state.consignArtwork);

    const checkAllCompletedSteps = Object.values(completedSteps)
        .filter((v) => !v.optional)
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

    const handleChangePage = (page: StepId, stepStatus: StepStatus) => {
        router.push(`${pathname}/${page}`);
    };

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        router.push('/home/consignArtwork/consignmentStatus');
    };

    const successColor = '#93C47D';
    const warningColor = '#F6B26B';

    const grayColor = theme.palette.text.disabled;

    useEffect(() => {
        if (!status.length) dispatch(publishThunk({ status: 'draft' }));
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
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Grid marginBottom={10} item xs={12} lg={6}>
                    <Box>
                        <Typography variant="h6" fontWeight="normal" color="GrayText">
                            {texts.consignArtworkSubtitle}
                        </Typography>
                    </Box>
                    <Box maxWidth={700} p={2}>
                        {Object.values(completedSteps).map((v) => (
                            <Grid alignItems="center" justifyContent="space-between" container key={v.stepId}>
                                <Grid item>
                                    <Typography
                                        title={`${language[v.stepName] as string} ${
                                            v.optional ? ` (${texts.optional})` : ''
                                        } `}
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            width: 310,
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
                                            disabled={status === 'published' || status === 'preview'}
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
                    <CustomizedSnackbar
                        type={toastr.type}
                        open={toastr.open}
                        message={toastr.message}
                        setOpentate={setToastr}
                    />
                </Grid>
            </PageContainerFooter>
        </form>
    );
};

export default ConsignArtwork;
