import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';

import { StepsFormValues, StepsProps } from './types';

import MetadataFields from './metadataFields';
import { FormikErrors } from 'formik';

const currentStep = 4;

export const validateErrorsCreatorMetadata = ({
    values,
    errors,
    setFieldValue,
}: {
    values: StepsFormValues;
    errors: FormikErrors<StepsFormValues>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<StepsFormValues>>;
}) => {
    const fields: Array<keyof StepsFormValues> = ['creatorMetadata'];

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
};

const SixthStep = ({
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setErrors,
    setFieldError,
}: StepsProps) => {
    useEffect(() => {
        validateErrorsCreatorMetadata({ values, errors, setFieldValue });
    }, [errors, values.creatorMetadata]);

    return (
        <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
            <MetadataFields
                formkFieldPathChange="creatorMetadata.creatorMetadataDefinitions"
                values={values}
                errors={errors}
                metadataDefinitions={values.creatorMetadata?.creatorMetadataDefinitions}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setErrors={setErrors}
                setFieldError={setFieldError}
            />
        </Grid>
    );
};

export default SixthStep;
