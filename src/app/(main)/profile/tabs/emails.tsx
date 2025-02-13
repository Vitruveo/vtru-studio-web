import React from 'react';
import { CardContent, Grid } from '@mui/material';

import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import AccountSettings from '../accountSettings';

type EmailsProps = ProfileTabsGeneralProps;

const Emails = ({
    values,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    setFieldError,
    setErrors,
}: EmailsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6} width="100%">
                <BlankCard>
                    <CardContent
                        sx={{ height: { xs: 'auto', lg: '470px' } }}
                        style={{ overflowY: 'auto', maxHeight: '535px' }}
                    >
                        <AccountSettings
                            type="emails"
                            values={values}
                            errors={errors}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setErrors={setErrors}
                            setFieldError={setFieldError}
                            setFieldValue={setFieldValue}
                        />
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default Emails;
