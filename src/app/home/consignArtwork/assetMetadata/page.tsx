'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from '@/store/hooks';

import { StepsFormValues } from '../types';
import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import MetadataFields from '../components/metadataFields';

import { AssetMetadataFormErros, AssetMetadataFormValues } from './types';
import { assetSelector } from '@/features/asset';
import { AssetMetadataSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

const currentStep = 3;

const validateErrorsAssetMetadata = ({
    values,
    errors,
    setFieldValue,
}: {
    values: AssetMetadataFormValues;
    errors: AssetMetadataFormErros;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMetadataFormErros>;
}) => {
    const fields: Array<keyof StepsFormValues> = ['assetMetadata'];

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
        title: 'Consign Artwork',
    },
];

export default function AssetMetadata() {
    const { assetMetadata } = useSelector((state) => state.asset);

    const { values, errors, setFieldValue } = useFormik<AssetMetadataFormValues>({
        initialValues: {
            assetMetadata,
        },
        validationSchema: AssetMetadataSchemaValidation,
        onSubmit: async (formValues) => {},
    });

    useEffect(() => {
        validateErrorsAssetMetadata({ values, errors, setFieldValue });
    }, [errors, values.assetMetadata]);

    return (
        <PageContainerFooter title="Consign Artwork" backPathRouter="/home/consignArtwork">
            <Breadcrumb title="Consign Artwork" items={BCrumb} />
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
                />
            </Grid>
        </PageContainerFooter>
    );
}
