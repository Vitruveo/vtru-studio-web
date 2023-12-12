'use client';
import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import PageContainer from '@/app/home/components/container/PageContainer';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import HorizontalStepper from '@/app/home/components/wizard/HorizontalStepper';
import FinalStep from '@/app/home/components/wizard/FinalStep';
import FirstStep from '@/app/home/components/wizard/FirstStep';
import SecondStep from '@/app/home/components/wizard/SecondStep';
import { Wallet } from '@/app/home/components/apps/wallet';

export default function Wizard() {
  const steps = [
    {
      key: 'Creator: account',
      render: <FirstStep />,
      title: (
        <div>
          Creator <br /> account
        </div>
      ),
    },
    {
      key: 'Assets Upload',
      render: <SecondStep />,
      title: (
        <div>
          Asset <br /> upload{' '}
        </div>
      ),
    },
    {
      key: 'Assets Metadata',
      render: <FirstStep />,
      title: (
        <div>
          Asset <br /> metadata{' '}
        </div>
      ),
    },
    {
      key: 'Sign Media',
      render: <FirstStep />,
      title: (
        <div>
          Asset <br /> signature{' '}
        </div>
      ),
    },
    {
      key: 'Licenses',
      render: <FirstStep />,
      title: (
        <div>
          Asset
          <br /> licenses
        </div>
      ),
    },
    {
      key: 'Creator Profile',
      render: <FirstStep />,
      title: (
        <div>
          Creator <br /> profile{' '}
        </div>
      ),
    },
    {
      key: 'TruID Verification',
      render: <FirstStep />,
      title: (
        <div>
          Creator <br /> verification{' '}
        </div>
      ),
    },
    {
      key: 'Creator Agreement',
      render: <FirstStep />,
      title: (
        <div>
          Creator <br /> agreement{' '}
        </div>
      ),
    },
    {
      key: 'Publish',
      render: <FirstStep />,
      title: (
        <div>
          Asset
          <br /> publish
        </div>
      ),
    },
    {
      key: 'Asset Listing',
      render: <FirstStep />,
      title: (
        <div>
          Asset <br /> listing{' '}
        </div>
      ),
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer title="Wizard" description="this is Wizard">
      <Breadcrumb title="Wizard Application" />
      <HorizontalStepper steps={steps} handleReset={handleReset} activeStep={activeStep} finalStep={<FinalStep />}>
        <Wallet>
          {steps.map(
            (item, index) =>
              activeStep === index && (
                <>
                  {item.render}
                  <Stack direction="row" justifyContent="center" gap={5}>
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
