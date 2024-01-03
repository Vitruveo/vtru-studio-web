'use client';
import React from 'react';

import Box from '@mui/material/Box';
import { Button, CardContent, Grid, Stack, Typography } from '@mui/material';
import BlankCard from '@/app/home/components/shared/BlankCard';
import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { FooterForm } from '@/app/home/components/footerForm';
import { useRouter } from 'next/navigation';

const checkSteps = [
    {
        stepId: 'assetMedia',
        stepName: 'Asset Media',
        status: 'completed',
        statusName: 'Completed',
    },
    {
        stepId: 'assetMetadata',
        stepName: 'Asset Metadata',
        status: 'inProgress',
        statusName: 'In Progress',
    },
    {
        stepId: 'licenses',
        stepName: 'Licenses',
        status: 'notStarted',
        statusName: 'Not Started',
    },
    {
        stepId: 'termsOfUse',
        stepName: 'Terms of Use',
        status: 'notStarted',
        statusName: 'Not Started',
    },
];

const ConsignArtwork = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <PageContainer title="Wizard" description="this is Wizard">
            <Breadcrumb title="Consign Artwork" />
            <Grid item xs={12} lg={6}>
                <Box my={3}>
                    <Typography variant="h6" fontWeight="normal" color="GrayText">
                        Complete all tasks and publish your artwork
                    </Typography>
                </Box>
                <Box maxWidth={700} my={3}>
                    <BlankCard>
                        <CardContent>
                            {checkSteps.map((v) => (
                                <Grid alignItems="center" justifyContent="space-between" container key={v.stepId}>
                                    <Grid item>
                                        <Typography my={2} variant="h6" fontWeight="normal" color="GrayText">
                                            {v.stepName}
                                        </Typography>
                                    </Grid>
                                    <Grid display="flex" width={300} item>
                                        <Box width={130}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color={
                                                    (v.status === 'completed' && 'success') ||
                                                    (v.status === 'notStarted' && 'inherit') ||
                                                    'warning'
                                                }
                                                fullWidth
                                            >
                                                {v.statusName}
                                            </Button>
                                        </Box>
                                        <Box width={100} marginLeft={1}>
                                            <Button color="info" size="small" variant="contained" fullWidth>
                                                {v.status !== 'notStarted' ? 'Edit' : 'Start'}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}

                            <Stack direction="row" spacing={2} flexDirection="row-reverse">
                                <Button disabled style={{ width: 120 }} color="primary" variant="contained">
                                    Publish
                                </Button>
                                <Button onClick={handleBackClick} variant="text">
                                    Back
                                </Button>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Box>
            </Grid>
        </PageContainer>
    );
};

export default ConsignArtwork;
