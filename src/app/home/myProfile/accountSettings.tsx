import React from 'react';
import { Stack, Box } from '@mui/material';
import { WalletProvider } from '@/app/home/components/apps/wallet';
import { AccountSettingsProps } from './types';
import Wallet from './wallet';
import AddEmails from './addEmails';
import Socials from './Socials';

const AccountSettings = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setFieldValue,
    setFieldError,
}: AccountSettingsProps) => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Socials />
                <AddEmails emails={values.emails} emailDefault={values.emailDefault} setFieldValue={setFieldValue} />
                <Box display="flex" flexDirection="column">
                    <WalletProvider>
                        <Wallet
                            values={values}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setErrors={setErrors}
                            setFieldError={setFieldError}
                        />
                    </WalletProvider>
                </Box>
            </Box>
        </Stack>
    );
};

export default AccountSettings;
