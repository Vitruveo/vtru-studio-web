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
import FifthStep from '@/app/home/components/wizard/fifthStep';

import { StepsFormValues } from '../../components/wizard/types';
import { stepsSchemaValidation } from './formschema';
import { metadataDefinitions, metadataDomains } from './mock';

import { userSelector } from '@/features/user';
import { saveStepWizardThunk, sendRequestUploadThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';

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
        key: 'Assets Metadata',
        render: ThirdStep,
        title: (
            <span>
                Asset <br /> metadata{' '}
            </span>
        ),
    },

    {
        key: 'License',
        render: ThirdStep,
        title: 'License',
    },

    {
        key: 'Contract',
        render: FifthStep,
        title: 'Contract',
    },

    {
        key: 'Publish',
        render: ThirdStep,
        title: 'Publish',
    },
];

export default function Wizard() {
    const dispatch = useDispatch();

    const emailsCreator = useSelector(userSelector(['emails']));
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const uploadAsset = async () => {
            Object.values(values.asset.formats).forEach((format) => {
                if (format.file) {
                    dispatch(
                        sendRequestUploadThunk({
                            originalName: format.file.name,
                            mimetype: format.file.type,
                        })
                    );

                    return;
                }

                dispatch(
                    sendRequestUploadThunk({
                        originalName: values.asset.file!.name,
                        mimetype: values.asset.file!.type,
                    })
                );
            });
        };

        if (activeStep === 2 && values.asset.file) uploadAsset();
    }, [activeStep]);

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
                    display: { height: 100, width: 100, scale: 1, file: undefined, area: undefined },
                    exhibition: { height: 300, width: 300, scale: 1, file: undefined, area: undefined },
                    preview: { height: 500, width: 500, scale: 1, file: undefined, area: undefined },
                },
            },
            contract: false,
            assetMetadata: {
                metadataDomains,
                metadataDefinitions,
            },
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
                                    <Stack direction="row" justifyContent="center" gap={5} marginTop={10}>
                                        {index !== 0 && (
                                            <Button color="primary" variant="outlined" onClick={handleBack}>
                                                Previous
                                            </Button>
                                        )}
                                        <Button color="primary" variant="contained" onClick={handleNext}>
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
