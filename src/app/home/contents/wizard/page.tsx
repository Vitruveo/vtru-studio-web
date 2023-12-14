'use client';
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Stack } from '@mui/material';

import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import HorizontalStepper from '@/app/home/components/wizard/HorizontalStepper';
import FinalStep from '@/app/home/components/wizard/FinalStep';
import FirstStep from '@/app/home/components/wizard/FirstStep';
import SecondStep from '@/app/home/components/wizard/SecondStep';
import ThirdStep from '@/app/home/components/wizard/ThirdStep';
import { Wallet } from '@/app/home/components/apps/wallet';
import { StepsFormValues } from '../../components/wizard/types';
import { stepsSchemaValidation } from './formschema';
import { metaDataDefinitions } from './mock';

const steps = [
  {
    key: 'Creator: account',
    render: FirstStep,
    title: (
      <div>
        Creator <br /> account
      </div>
    ),
  },
  {
    key: 'Assets Upload',
    render: SecondStep,
    title: (
      <div>
        Asset <br /> upload{' '}
      </div>
    ),
  },
  {
    key: 'Assets Metadata',
    render: ThirdStep,
    title: (
      <div>
        Asset <br /> metadata{' '}
      </div>
    ),
  },
];

export default function Wizard() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (value: number) => {
    setActiveStep(value);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { handleSubmit, handleChange, resetForm, setFieldValue, setFieldError, setErrors, values, errors } =
    useFormik<StepsFormValues>({
      initialValues: {
        username: '',
        profile: undefined,
        email: '',
        wallet: '',
        file: undefined,
        assetMetadata: metaDataDefinitions,
        completedSteps: {},
        definition: '',
      },
      validationSchema: stepsSchemaValidation,
      onSubmit: async (formValues) => {},
    });

  return (
    <PageContainer title="Wizard" description="this is Wizard">
      <Breadcrumb title="Wizard Application" />
      <HorizontalStepper
        steps={steps}
        handleReset={handleReset}
        handleStep={handleStep}
        activeStep={activeStep}
        finalStep={<FinalStep />}
        completedSteps={values.completedSteps}>
        <Wallet>
          {steps.map(
            (item, index) =>
              activeStep === index && (
                <>
                  <item.render
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
                </>
              ),
          )}
        </Wallet>
      </HorizontalStepper>
    </PageContainer>
  );
}
