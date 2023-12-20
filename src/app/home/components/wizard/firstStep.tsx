import React, { useCallback, useEffect, useState } from 'react';

import { ValidationError } from 'yup';

import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { IconTrash, IconPlus } from '@tabler/icons-react';

import { WalletProvider } from '@/app/home/components/apps/wallet';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { checkCreatorEmailExist } from '@/features/user/requests';

import CustomTextField from '../forms/theme-elements/CustomTextField';
import { StepsFormValues, StepsProps } from './types';
import Wallet from './wallet';
import { debouncedUsernameValidation, validateEmailFormValue } from '../../contents/wizard/formschema';

const currentStep = 1;

const FirstStep = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    setErrors,
    setFieldError,
}: StepsProps) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const handleSendCodeEmail = useCallback((emailSend: string, index: number) => {
        setToastr({
            open: true,
            type: 'success',
            message: 'verification code sent to email',
        });
    }, []);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);

        debouncedUsernameValidation(e.target.value, () =>
            setErrors({ ...errors, username: 'Username already exists' })
        );
    };

    const handleChangeEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }, []);

    const handleAddEmail = useCallback(async () => {
        if (values.emails.some((item) => item.email === email)) {
            setEmailError('Email already exists');
            return;
        }
        try {
            await validateEmailFormValue.validate({ email });
        } catch (error) {
            setEmailError((error as ValidationError).errors[0]);
            return;
        }
        try {
            await checkCreatorEmailExist({ email });
            setEmailError('Email already exists');
        } catch (error) {
            setFieldValue('emails', [{ email, checkedAt: null, sentCode: false }, ...values.emails]);
            setEmail('');
            setEmailError('');
        }
    }, [setFieldValue, values.emails, email]);

    const handleDeleteEmail = useCallback(
        (index: number) => {
            setFieldValue(
                `emails`,
                values.emails.filter((v, i) => i !== index)
            );
        },
        [setFieldValue, values.emails]
    );

    useEffect(() => {
        const fields: Array<keyof StepsFormValues> = ['wallets', 'emails', 'username'];

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
    }, [values.wallets, values.emails, values.username, errors]);

    return (
        <Stack sx={{ width: '100%' }}>
            <Box minWidth={600} display="flex" flexDirection="column" my={3} gap={4} p={2}>
                <Box>
                    <Stack my={1} direction="row" display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight={600} component="label">
                            Username
                        </Typography>
                    </Stack>
                    <CustomTextField
                        placeholder="type a username..."
                        size="small"
                        id="username"
                        variant="outlined"
                        fullWidth
                        value={values.username}
                        onChange={handleUsernameChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                </Box>

                <Box>
                    <Stack my={1} direction="row" display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight={600} component="label">
                            Emails
                        </Typography>
                    </Stack>
                    <Box width="100%" display="flex" alignItems="baseline" gap={1}>
                        <CustomTextField
                            value={email}
                            onChange={handleChangeEmailInput}
                            size="small"
                            fullWidth
                            variant="outlined"
                            placeholder="type a email..."
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <IconButton color="primary" onClick={handleAddEmail}>
                            <IconPlus />
                        </IconButton>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    {values.emails
                        .slice()
                        .sort((a, b) => {
                            const dateA = a.checkedAt ? new Date(a.checkedAt).getTime() : 0;
                            const dateB = b.checkedAt ? new Date(b.checkedAt).getTime() : 0;
                            return dateB - dateA;
                        })
                        .map((item, index) => (
                            <Box key={item.email}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" paddingY={1}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {!item.checkedAt && (
                                            <IconButton onClick={(e) => handleDeleteEmail(index)}>
                                                <IconTrash color="red" size="16" stroke={1.5} />
                                            </IconButton>
                                        )}
                                        <Typography>{item.email}</Typography>
                                    </Box>
                                    {item.checkedAt ? (
                                        <Typography color="success.main">Verified email</Typography>
                                    ) : item.sentCode ? (
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="flex-end"
                                            justifyContent="flex-end"
                                        >
                                            <CustomTextField
                                                size="small"
                                                id="verificationCode"
                                                variant="outlined"
                                                placeholder="type a code..."
                                            />
                                            <Typography variant="caption" color="primary">
                                                Resend code
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Button onClick={() => handleSendCodeEmail(item.email, index)}>
                                            Verify now
                                        </Button>
                                    )}
                                </Box>
                                <Divider />
                            </Box>
                        ))}
                </Box>
                <Box display="flex" flexDirection="column">
                    <Stack my={1} direction="row" display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight={600} component="label">
                            Wallets
                        </Typography>
                    </Stack>
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
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </Stack>
    );
};

export default FirstStep;
