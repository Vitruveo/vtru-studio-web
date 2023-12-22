import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';

import { StepsProps } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import MetadataFields from './metadataFields';

const SixthStep = ({
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setErrors,
    setFieldError,
}: StepsProps) => {
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
