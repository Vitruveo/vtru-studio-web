import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconTrash } from '@tabler/icons-react';
import { Box, Button, IconButton, MenuItem } from '@mui/material';

import { StepsFormValues, StepsProps } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import MetadataFields from './metadataFields';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { FormikErrors } from 'formik';

export const licenseMetadataDomains = [
    { value: 'stream', label: 'Stream v1.0' },
    { value: 'print', label: 'Print v1.0' },
    { value: 'NFT', label: 'NFT v1.0' },
];

const currentStep = 5;

export const validateErrorsLisence = ({
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
    const fields: Array<keyof StepsFormValues> = ['licenses'];

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

const FifthStep = ({
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setErrors,
    setFieldError,
}: StepsProps) => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [licenseDomain, setLicenseDomain] = useState('stream');

    const licensesAdded = values.licenses.filter((v) => v.added);

    const findIndexLicense = values.licenses.findIndex((license) => license.domain === licenseDomain);
    const licenseMetadataDefinitions = values.licenses[findIndexLicense]?.licenseMetadataDefinitions;

    const handleAddLicense = () => {
        if (!values.licenses[findIndexLicense]?.added) {
            setFieldValue(`licenses[${findIndexLicense}].added`, true);
        } else {
            setToastr({
                type: 'error',
                open: true,
                message: 'License already added',
            });
        }
    };

    const handleRemoveLicense = (domain: string) => {
        setFieldValue(`licenses[${values.licenses.findIndex((license) => license.domain === domain)}].added`, false);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLicenseDomain(e.target.value);
    };

    useEffect(() => {
        validateErrorsLisence({ values, errors, setFieldValue });
    }, [errors, values.licenses]);

    return (
        <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
            <Grid marginBottom={2}>
                <Typography variant="subtitle1" fontWeight={600} component="label">
                    License
                </Typography>
                <Box display="flex" alignItems="center" width="100%">
                    <CustomSelect
                        defaultValue="stream"
                        size="small"
                        name="domain"
                        onChange={handleChangeInput}
                        fullWidth
                        variant="outlined"
                    >
                        {licenseMetadataDomains?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Box>
            </Grid>
            <MetadataFields
                key={licenseDomain}
                formkFieldPathChange={`licenses[${findIndexLicense}].licenseMetadataDefinitions`}
                values={values}
                errors={errors}
                metadataDefinitions={licenseMetadataDefinitions}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setErrors={setErrors}
                setFieldError={setFieldError}
            />
            <Box my={2}>
                <Button size="small" fullWidth color="primary" variant="contained" onClick={handleAddLicense}>
                    Add license
                </Button>
            </Box>
            {licensesAdded.length > 0 && (
                <Box my={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label">
                        Added licenses
                    </Typography>
                    {licensesAdded.map((license, index) => (
                        <Box display="flex" alignItems="center" key={index}>
                            <IconButton onClick={(e) => handleRemoveLicense(license.domain)}>
                                <IconTrash color="red" size="16" stroke={1.5} />
                            </IconButton>
                            <Box>{license.title}</Box>
                        </Box>
                    ))}
                </Box>
            )}
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </Grid>
    );
};

export default FifthStep;
