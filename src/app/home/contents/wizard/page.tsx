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
import { useDispatch } from '@/store/hooks';
import { assetStorageThunk, sendRequestUploadThunk } from '@/features/user/thunks';

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
    const {
        requestAssetUpload: { transactionId, url },
    } = useSelector(userSelector(['requestAssetUpload']));

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const uploadAvatar = async () => {
            dispatch(sendRequestUploadThunk({ originalName: values.profile!.name, mimetype: values.profile!.type }));
        };

        if (activeStep === 1 && values.profile) uploadAvatar();
    }, [activeStep]);

    useEffect(() => {
        if (transactionId && url && values.profile) {
            console.log({ transactionId, url });

            dispatch(
                assetStorageThunk({
                    url,
                    file: values.profile,
                })
            );
        }
    }, [transactionId, url]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (value: number) => {
        setActiveStep(value);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const {
        handleSubmit,
        handleChange,
        resetForm,
        submitForm,
        setFieldValue,
        setFieldError,
        setErrors,
        values,
        errors,
    } = useFormik<StepsFormValues>({
        initialValues: {
            username: '',
            profile: undefined,
            emails: emailsCreator.emails.map((item) => ({
                email: item.email,
                sentCode: false,
                checkedAt: item.checkedAt ? true : false,
            })),
            wallets: [],
            asset: undefined,
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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <PageContainer title="Wizard" description="this is Wizard">
            <Breadcrumb title="Wizard Application" />
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
