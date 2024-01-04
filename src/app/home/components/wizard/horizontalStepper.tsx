import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { CompletedSteps } from './types';
import { StepLabel, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    children: JSX.Element | JSX.Element[];
    steps: any[];
    activeStep: number;
    handleReset: (event: React.SyntheticEvent | Event) => void;
    handleStep: (value: number) => void;
    completedSteps?: CompletedSteps;
}

const HorizontalStepper = ({ children, steps, activeStep, completedSteps, handleReset, handleStep }: Props) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const step = index + 1;
                    const error = completedSteps?.[step] || (false as any);

                    return (
                        <Step completed={error === false} key={label.key}>
                            <StepButton
                                icon={error === true && <ErrorOutlineIcon color="error" />}
                                onClick={() => handleStep(index)}
                            >
                                <Typography color={error === true ? 'error' : ''}>{label.title}</Typography>
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    {/* <Box>{finalStep}</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 3 }}>
                        <Button variant="contained">Finished</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box> */}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>{children}</Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export default HorizontalStepper;
