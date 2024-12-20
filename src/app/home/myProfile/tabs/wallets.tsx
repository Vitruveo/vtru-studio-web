import React from 'react';
import { CardContent, Grid } from '@mui/material';

import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import AccountSettings from '../accountSettings';

type WalletsProps = ProfileTabsGeneralProps;

const Wallets = ({
    values,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    setFieldError,
    setErrors,
}: WalletsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6} width="100%">
                <BlankCard>
                    <CardContent
                        sx={{ height: { xs: 'auto', lg: '500px' } }}
                        style={{ overflowY: 'auto', maxHeight: '535px' }}
                    >
                        <AccountSettings
                            type="wallets"
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

export default Wallets;
