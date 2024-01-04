'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Grid, Typography, useTheme } from '@mui/material';

import { userSelector } from '@/features/user';
import { assetSelector } from '@/features/asset';

import Box from '@mui/material/Box';

import BlankCard from '@/app/home/components/shared/BlankCard';
import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { FooterForm } from '@/app/home/components/footerForm';

import { StepsFormValues } from '@/app/home/components/wizard/types';

import { assetMetadataDefinitions, assetMetadataDomains, creatorMetadataDefinitions, licenses } from '../mock';
import { stepsSchemaValidation } from '../formschema';

const ConsignArtwork = () => {
    // const pathname = usePathname();
    // const router = useRouter();

    const theme = useTheme();

    const values = {
        completedSteps: {
            assetMedia: {
                stepId: 'assetMedia',
                stepName: 'Asset Media',
                status: 'completed',
                statusName: 'Completed',
            },
            assetMetadata: {
                stepId: 'assetMetadata',
                stepName: 'Asset Metadata',
                status: 'inProgress',
                statusName: 'In Progress',
            },
            licenses: {
                stepId: 'licenses',
                stepName: 'Licenses',
                status: 'notStarted',
                statusName: 'Not Started',
            },
            termsOfUse: {
                stepId: 'termsOfUse',
                stepName: 'Terms of Use',
                status: 'notStarted',
                statusName: 'Not Started',
            },
        },
    };

    // const { username, emails, wallets, requestAssetUpload } = useSelector(
    //     userSelector(['username', 'emails', 'wallets', 'requestAssetUpload'])
    // );

    // const {
    //     status,
    //     assetMetadata,
    //     creatorMetadata,
    //     licenses: licensesState,
    //     contract,
    // } = useSelector(assetSelector(['assetMetadata', 'creatorMetadata', 'licenses', 'contract', 'status']));

    // const { handleSubmit, handleChange, validateForm, setFieldValue, setFieldError, setErrors, values, errors } =
    //     useFormik<StepsFormValues>({
    //         initialValues: {
    //             username: username,
    //             profile: undefined,
    //             emails: emails,
    //             wallets: wallets,
    //             asset: {
    //                 file: undefined,
    //                 formats: {
    //                     display: { file: undefined, customFile: undefined, transactionId: undefined },
    //                     exhibition: { file: undefined, customFile: undefined, transactionId: undefined },
    //                     preview: { file: undefined, customFile: undefined, transactionId: undefined },
    //                 },
    //             },
    //             contract: contract || false,
    //             assetMetadata: {
    //                 assetMetadataDomains,
    //                 assetMetadataDefinitions: assetMetadata?.assetMetadataDefinitions.length
    //                     ? assetMetadata.assetMetadataDefinitions
    //                     : assetMetadataDefinitions,
    //             },
    //             creatorMetadata: {
    //                 creatorMetadataDefinitions: creatorMetadata?.creatorMetadataDefinitions.length
    //                     ? creatorMetadata.creatorMetadataDefinitions
    //                     : creatorMetadataDefinitions,
    //             },
    //             licenses: licensesState?.length ? licensesState : licenses,
    //             status: status || 'draft',
    //             completedSteps: {
    //                 assetMedia: {
    //                     stepId: 'assetMedia',
    //                     stepName: 'Asset Media',
    //                     status: 'completed',
    //                     statusName: 'Completed',
    //                 },
    //                 assetMetadata: {
    //                     stepId: 'assetMetadata',
    //                     stepName: 'Asset Metadata',
    //                     status: 'inProgress',
    //                     statusName: 'In Progress',
    //                 },
    //                 licenses: {
    //                     stepId: 'licenses',
    //                     stepName: 'Licenses',
    //                     status: 'notStarted',
    //                     statusName: 'Not Started',
    //                 },
    //                 termsOfUse: {
    //                     stepId: 'termsOfUse',
    //                     stepName: 'Terms of Use',
    //                     status: 'notStarted',
    //                     statusName: 'Not Started',
    //                 },
    //             },
    //             definition: '',
    //         },
    //         validationSchema: stepsSchemaValidation,
    //         onSubmit: async (formValues) => {},
    //     });

    const handleChangePage = (page: string) => {
        // router.push(`${pathname}/${page}`, {
        //     values,
        //     errors,
        //     setFieldError,
        //     setErrors,
        //     setFieldValue,
        //     handleChange,
        //     handleSubmit,
        // });
    };

    const successColor = theme.palette.success.main;
    const warningColor = theme.palette.warning.main;
    const grayColor = theme.palette.text.disabled;

    return (
        <PageContainer title="Wizard" description="this is Wizard">
            <Breadcrumb title="Consign Artwork" />
            <Grid item xs={12} lg={6}>
                <Box>
                    <Typography variant="h6" fontWeight="normal" color="GrayText">
                        Complete all tasks and publish your artwork
                    </Typography>
                </Box>
                <Box maxWidth={700} p={2}>
                    {Object.values(values.completedSteps).map((v: any) => (
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
                                        onClick={() => handleChangePage(v.stepId)}
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
            <Box position="absolute" alignSelf="flex-end" bottom={0} right={25}>
                <FooterForm submitDisabled submitText="Publish" />
            </Box>
        </PageContainer>
    );
};

export default ConsignArtwork;
