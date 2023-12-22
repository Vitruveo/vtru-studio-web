'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box, Button, Stack } from '@mui/material';

import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import HorizontalStepper from '@/app/home/components/wizard/horizontalStepper';
import FinalStep from '@/app/home/components/wizard/finalStep';
import FirstStep from '@/app/home/components/wizard/firstStep';
import SecondStep from '@/app/home/components/wizard/secondStep';
import ThirdStep from '@/app/home/components/wizard/thirdStep';
import FourthStep from '@/app/home/components/wizard/fourthStep';
import FifthStep from '@/app/home/components/wizard/fifthStep';
import SixthStep from '@/app/home/components/wizard/sixthStep';

import { StepsFormValues } from '../../components/wizard/types';
import { stepsSchemaValidation } from './formschema';
import { assetMetadataDefinitions, assetMetadataDomains, creatorMetadataDefinitions, licenses } from './mock';

import { userSelector } from '@/features/user';
import { saveStepWizardThunk, sendRequestUploadThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';
import { assetStorageThunk } from '@/features/asset/thunks';
import SeventhStep from '../../components/wizard/seventhStep';

const steps = [
    {
        key: 'Creator: account',
        render: FirstStep,
        title: (
            <span>
                Creator <br /> account
            </span>
        ),
    },
    {
        key: 'Assets Upload',
        render: SecondStep,
        title: (
            <span>
                Asset <br /> upload{' '}
            </span>
        ),
    },
    {
        key: 'Asset Metadata',
        render: ThirdStep,
        title: (
            <span>
                Asset <br /> metadata{' '}
            </span>
        ),
    },

    {
        key: 'Creator Metadata',
        render: FourthStep,
        title: (
            <span>
                Creator <br /> metadata{' '}
            </span>
        ),
    },

    {
        key: 'License',
        render: FifthStep,
        title: 'License',
    },

    {
        key: 'Contract',
        render: SixthStep,
        title: 'Contract',
    },

    {
        key: 'Publish',
        render: SeventhStep,
        title: 'Publish',
    },
];

export default function Wizard() {
    const dispatch = useDispatch();

    const emailsCreator = useSelector(userSelector(['emails']));
    const { requestAssetUpload } = useSelector(userSelector(['requestAssetUpload']));
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const uploadAsset = async () => {
            return Promise.all(
                Object.entries(values.asset.formats).map(async ([key, format]) => {
                    if (format.transactionId) return;

                    if (format.file) {
                        const response = await dispatch(
                            sendRequestUploadThunk({
                                originalName: format.file.name,
                                mimetype: format.file.type,
                            })
                        );

                        console.log(response, key, format);

                        setFieldValue(`asset.formats.${key}.transactionId`, response.transaction);

                        return;
                    }
                })
            );
        };

        if (activeStep === 2 && values.asset.file) uploadAsset();
    }, [activeStep]);

    useEffect(() => {
        const requestAssetUploadNotUsed = requestAssetUpload.filter(
            (item) => item.transactionId && item.url && !item.usedAt
        );
        if (!requestAssetUploadNotUsed.length) return console.log('no requestAssetUploadNotUsed');

        requestAssetUploadNotUsed.forEach(async (item) => {
            const format = Object.values(values.asset.formats).find(
                (formatItem) => formatItem.transactionId === item.transactionId
            );
            if (!format) return console.log('no format');

            dispatch(
                assetStorageThunk({
                    url: item.url,
                    file: format.file!,
                    transactionId: format.transactionId!,
                })
            );
        });
    }, [requestAssetUpload, activeStep]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const { username, emails, wallets } = useSelector(userSelector(['username', 'emails', 'wallets']));

    const {
        handleSubmit,
        handleChange,
        resetForm,
        submitForm,
        validateForm,
        setFieldValue,
        setFieldError,
        setErrors,
        values,
        errors,
    } = useFormik<StepsFormValues>({
        initialValues: {
            username: username,
            profile: undefined,
            emails: emails,
            wallets: wallets,
            asset: {
                file: undefined,
                formats: {
                    display: { file: undefined, customFile: undefined, transactionId: undefined },
                    exhibition: { file: undefined, customFile: undefined, transactionId: undefined },
                    preview: { file: undefined, customFile: undefined, transactionId: undefined },
                },
            },
            contract: false,
            assetMetadata: {
                assetMetadataDomains,
                assetMetadataDefinitions,
            },
            creatorMetadata: {
                creatorMetadataDefinitions,
            },
            licenses,
            completedSteps: {},
            definition: '',
        },
        validationSchema: stepsSchemaValidation,
        onSubmit: async (formValues) => {},
    });

    const handleStep = async (value: number) => {
        await validateForm();
        dispatch(saveStepWizardThunk({ step: activeStep, values }));
        setActiveStep(value);
    };

    const handleNext = async () => {
        await validateForm();
        dispatch(saveStepWizardThunk({ step: activeStep, values }));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <PageContainer title="Wizard" description="this is Wizard">
            <Breadcrumb title="Genesis Wizard" />
            <HorizontalStepper
                steps={steps}
                handleReset={handleReset}
                handleStep={handleStep}
                activeStep={activeStep}
                finalStep={<FinalStep />}
                completedSteps={values.completedSteps}
            >
                <Box>
                    {steps.map(
                        (item, index) =>
                            activeStep === index && (
                                <React.Fragment key={index}>
                                    <item.render
                                        key={index}
                                        values={values}
                                        errors={errors}
                                        setFieldError={setFieldError}
                                        setErrors={setErrors}
                                        setFieldValue={setFieldValue}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                    />
                                    <Stack direction="row" justifyContent="center" gap={5}>
                                        {index !== 0 && (
                                            <Button fullWidth color="primary" variant="outlined" onClick={handleBack}>
                                                Previous
                                            </Button>
                                        )}
                                        <Button fullWidth color="primary" variant="contained" onClick={handleNext}>
                                            Next
                                        </Button>
                                    </Stack>
                                </React.Fragment>
                            )
                    )}
                </Box>
            </HorizontalStepper>
        </PageContainer>
    );
}
