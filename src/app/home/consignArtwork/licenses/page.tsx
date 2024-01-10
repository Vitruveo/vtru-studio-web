'use client';

import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconTrash } from '@tabler/icons-react';
import { Box, Button, IconButton, MenuItem } from '@mui/material';

import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import MetadataFields from '../components/metadataFields';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

import { LicensesFormErros, LicensesFormValues } from './types';

import { LicensesSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import { licenses } from '../mock';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { licenseThunk } from '@/features/asset/thunks';

const licenseMetadataDomains = [
    { value: 'stream', label: 'Stream v1.0' },
    { value: 'print', label: 'Print v1.0' },
    { value: 'NFT', label: 'NFT v1.0' },
];

const currentStep = 5;

const validateErrorsLisence = ({
    values,
    errors,
    setFieldValue,
}: {
    values: LicensesFormValues;
    errors: LicensesFormErros;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<LicensesFormValues>>;
}) => {
    const fields: Array<keyof LicensesFormValues> = ['licenses'];

    // if (!fields.some((field) => errors[field])) {
    //     values.completedSteps[currentStep] = {
    //         step: currentStep,
    //         errors: false,
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // } else {
    //     values.completedSteps[currentStep] = {
    //         step: currentStep,
    //         errors: true,
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // }
};

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        to: '/home/consignArtwork',
        title: 'Consign Artwork',
    },
    {
        title: 'Licenses',
    },
];

export default function Licenses() {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const [licenseDomain, setLicenseDomain] = useState('stream');

    const router = useRouter();
    const dispatch = useDispatch();
    const { licenses: licensesState } = useSelector((state) => state.asset);

    const { values, errors, setFieldValue, handleSubmit, validateForm } = useFormik<LicensesFormValues>({
        initialValues: {
            licenses: licensesState?.length ? licensesState : licenses,
        },
        validationSchema: LicensesSchemaValidation,
        onSubmit: async (formValues) => {
            await validateForm();
            dispatch(licenseThunk({ licenses: values.licenses }));
            dispatch(
                consignArtworkActionsCreators.changeStatusStep({
                    stepId: 'licenses',
                    status: 'completed',
                })
            );
            router.push(`/home/consignArtwork/termsOfUse`);
        },
    });

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
        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'licenses',
                status: licensesAdded.length > 0 ? 'completed' : 'inProgress',
            })
        );
    }, [licensesAdded, values]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Next"
                title="Consign Artwork"
                stepStatus={licensesAdded.length > 0 ? 'completed' : 'inProgress'}
                stepNumber={3}
                backPathRouter="/home/consignArtwork"
            >
                <Breadcrumb title="Consign Artwork" items={BCrumb} />
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
                    />
                    <Typography my={1} color="error">
                        {typeof errors.licenses === 'string' && errors.licenses}
                    </Typography>
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
            </PageContainerFooter>
        </form>
    );
}
