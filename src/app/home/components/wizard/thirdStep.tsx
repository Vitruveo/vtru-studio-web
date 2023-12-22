import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';

import { StepsFormValues, StepsProps } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import MetadataFields from './metadataFields';

const currentStep = 3;

const ThirdStep = ({
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setErrors,
    setFieldError,
}: StepsProps) => {
    useEffect(() => {
        const fields: Array<keyof StepsFormValues> = ['assetMetadata'];

        if (!fields.some((field) => errors[field])) {
            values.completedSteps[currentStep] = {
                step: currentStep,
                errors: false,
            };
            setFieldValue('completedSteps', { ...values.completedSteps });
        } else {
            values.completedSteps[currentStep] = {
                step: currentStep,
                errors: true,
            };
            setFieldValue('completedSteps', { ...values.completedSteps });
        }
    }, [errors, values.assetMetadata]);
    return (
        <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
            <Grid marginBottom={2}>
                <Typography variant="subtitle1" fontWeight={600} component="label">
                    Domain
                </Typography>
                <CustomSelect defaultValue="artwork" size="small" name="domain" fullWidth variant="outlined">
                    {values.assetMetadata?.assetMetadataDomains?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </Grid>
            <MetadataFields
                formkFieldPathChange="assetMetadata.assetMetadataDefinitions"
                values={values}
                errors={errors}
                metadataDefinitions={values.assetMetadata?.assetMetadataDefinitions}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setErrors={setErrors}
                setFieldError={setFieldError}
            />
        </Grid>
    );
};

export default ThirdStep;
