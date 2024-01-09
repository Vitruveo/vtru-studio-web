'use client';
import React from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Grid, Typography, useTheme } from '@mui/material';

import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { StepId, StepStatus } from '@/features/consignArtwork/types';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        title: 'Consign Artwork',
    },
];

const ConsignArtwork = () => {
    const pathname = usePathname();
    const router = useRouter();

    const theme = useTheme();
    const dispatch = useDispatch();

    const { completedSteps } = useSelector((state) => state.consignArtwork);

    const checkAllCompletedSteps = Object.values(completedSteps).every((v) => v.status === 'completed');

    const handleChangePage = (page: StepId, stepStatus: StepStatus) => {
        router.push(`${pathname}/${page}`);
        if (stepStatus === 'notStarted') {
            setTimeout(() => {
                dispatch(consignArtworkActionsCreators.changeStatusStep({ stepId: page, status: 'inProgress' }));
            }, 1000);
        }
    };

    const successColor = '#93C47D';
    const warningColor = '#F6B26B';
    const grayColor = theme.palette.text.disabled;

    return (
        <PageContainerFooter
            submitDisabled={!checkAllCompletedSteps}
            backPathRouter="/home"
            title="Consign Artwork"
            description="this is Wizard"
            submitText="Publish"
        >
            <Breadcrumb title="Consign Artwork" items={BCrumb} />
            <Grid item xs={12} lg={6}>
                <Box>
                    <Typography variant="h6" fontWeight="normal" color="GrayText">
                        Complete all tasks and publish your artwork
                    </Typography>
                </Box>
                <Box maxWidth={700} p={2}>
                    {Object.values(completedSteps).map((v) => (
                        <Grid alignItems="center" justifyContent="space-between" container key={v.stepId}>
                            <Grid item>
                                <Typography my={2} variant="h6" fontWeight="normal" color="GrayText">
                                    {v.stepName}
                                </Typography>
                            </Grid>
                            <Grid display="flex" flexWrap="wrap" width={300} item>
                                <Box width={100} display="flex" alignItems="center">
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
                                        {v.statusName}
                                    </Box>
                                </Box>
                                <Box width={100} marginLeft={1}>
                                    <Button
                                        onClick={() => handleChangePage(v.stepId, v.status)}
                                        size="small"
                                        variant="contained"
                                        fullWidth
                                    >
                                        {v.status !== 'notStarted' ? 'Edit' : 'Start'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Grid>
        </PageContainerFooter>
    );
};

export default ConsignArtwork;
