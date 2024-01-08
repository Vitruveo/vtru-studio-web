import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { IconTrash, IconPlus } from '@tabler/icons-react';

import { WalletProvider } from '@/app/home/components/apps/wallet';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { verifyCodeThunk } from '@/features/user/thunks';

import CustomTextField from '../forms/theme-elements/CustomTextField';
import { StepsFormValues, StepsProps } from './types';
import Wallet from './wallet';
import { debouncedUsernameValidation } from '../../consignArtwork/formschema';
import { userSelector } from '@/features/user';
import { sendEmailThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';

import { codesVtruApi } from '@/services/codes';

import { FormikErrors } from 'formik';

const currentStep = 1;

export const validateErrorsCreatorAccount = ({
    values,
    usernameError,
    errors,
    setFieldValue,
}: {
    values: StepsFormValues;
    usernameError?: string;
    errors: FormikErrors<StepsFormValues>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<StepsFormValues>>;
}) => {
    const fields: Array<keyof StepsFormValues> = ['wallets', 'emails', 'username'];

    // if (!fields.some((field) => errors[field]) && !usernameError) {
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

    const [usernameError, setUsernameError] = useState('');

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const checkCurrentUserName = useSelector(userSelector(['username']));
    const dispatch = useDispatch();

    const handleSendCodeEmail = useCallback(
        async (emailSend: string) => {
            const res = await dispatch(sendEmailThunk({ email: emailSend }));

            if (codesVtruApi.success.user.includes(res.code)) {
                setFieldValue(
                    'emails',
                    values.emails.map((item) => (item.email === emailSend ? { ...item, sentCode: true } : item))
                );
                setToastr({
                    open: true,
                    type: 'success',
                    message: 'verification code sent to email',
                });
            } else {
                setToastr({
                    open: true,
                    type: 'error',
                    message: 'error sending verification code to email',
                });
            }
        },
        [values.emails]
    );

    const handleVerifyCode =
        (emailVerify: string) => async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            try {
                if (e.target.value.length === 6) {
                    const res = await dispatch(verifyCodeThunk({ code: e.target.value, email: emailVerify }));
                    if (codesVtruApi.success.user.includes(res.code)) {
                        setFieldValue(
                            'emails',
                            values.emails.map((item) =>
                                item.email === emailVerify ? { ...item, checkedAt: new Date() } : item
                            )
                        );
                        setToastr({
                            open: true,
                            type: 'success',
                            message: 'email verified',
                        });
                    }
                }
            } catch (error) {
                setToastr({
                    open: true,
                    type: 'error',
                    message: 'error verifying code',
                });
            }
        };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checkCurrentUserName.username === e.target.value) return;

        if (handleChange) handleChange(e);

        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    const handleChangeEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }, []);

    const handleAddEmail = useCallback(async () => {
        validateErrorsCreatorAccount({ values, errors, setFieldValue, usernameError });
    }, [setFieldValue, values.emails, email]);

    const handleDeleteEmail = useCallback(
        (emailDelet: string) => {
            setFieldValue(
                `emails`,
                values.emails.filter((v) => v.email !== emailDelet)
            );
        },
        [setFieldValue, values.emails]
    );

    useEffect(() => {
        const fields: Array<keyof StepsFormValues> = ['wallets', 'emails', 'username'];

        // if (!fields.some((field) => errors[field]) && !usernameError) {
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
    }, [values.wallets, values.emails, values.username, usernameError, errors]);

    return (
        <Stack sx={{ width: '100%' }}>
            <Box minWidth={600} display="flex" flexDirection="column" my={3} gap={1}>
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
                        error={!!errors.username || !!usernameError}
                        helperText={errors.username || usernameError}
                    />
                </Box>

                <Box>
                    <Stack my={2} direction="row" display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight={600} component="label">
                            Emails
                        </Typography>
                    </Stack>
                    <Box width="100%" display="flex">
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
                <Box display="flex" flexDirection="column" my={2} gap={2}>
                    {values.emails.slice().map((item) => (
                        <Box key={item.email}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" paddingY={1}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    {!item.checkedAt && (
                                        <IconButton onClick={(e) => handleDeleteEmail(item.email)}>
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
                                            onChange={handleVerifyCode(item.email)}
                                            size="small"
                                            id="verificationCode"
                                            variant="outlined"
                                            placeholder="type a code..."
                                        />

                                        <Button onClick={() => handleSendCodeEmail(item.email)}>Resend code</Button>
                                        <Typography variant="caption" color="primary"></Typography>
                                    </Box>
                                ) : (
                                    <Button onClick={() => handleSendCodeEmail(item.email)}>Verify now</Button>
                                )}
                            </Box>
                            <Divider />
                        </Box>
                    ))}
                </Box>
                <Box display="flex" flexDirection="column">
                    <Stack my={2} direction="row" display="flex" alignItems="center" justifyContent="space-between">
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
