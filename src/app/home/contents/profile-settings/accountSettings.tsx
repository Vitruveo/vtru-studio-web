import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ValidationError } from 'yup';

import Box from '@mui/material/Box';
import { Button, Stack, Typography } from '@mui/material';

import { WalletProvider } from '@/app/home/components/apps/wallet';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { addCreatorEmailThunk, verifyCodeThunk } from '@/features/user/thunks';

import { AccountSettingsProps } from './types';

import { debouncedUsernameValidation, validateEmailFormValue } from '../wizard/formschema';
import { sendEmailThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';
import { checkCreatorEmailExist } from '@/features/user/requests';
import { codesVtruApi } from '@/services/codes';
import { AxiosError } from 'axios';
import { CreatorEmailExistApiRes } from '@/features/user/types';

import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import Wallet from '../../components/wizard/wallet';

import { userSelector } from '@/features/user';

const AccountSettings = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setFieldValue,
    setFieldError,
}: AccountSettingsProps) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [usernameError, setUsernameError] = useState('');

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { username } = useSelector(userSelector(['username']));

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
        if (handleChange) handleChange(e);
        if (e.target.value === username) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
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
            if (
                codesVtruApi.notfound.user.includes(
                    (error as AxiosError<CreatorEmailExistApiRes>).response?.data?.code as string
                )
            ) {
                await dispatch(addCreatorEmailThunk({ email }));
                setFieldValue('emails', [...values.emails, { email, checkedAt: null, sentCode: true }]);
                setEmail('');
                setEmailError('');
            }
        }
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

    return (
        <Stack sx={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Box maxWidth={450}>
                    <Box mb={2}>
                        <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                            Username
                        </Typography>
                    </Box>

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

                <Box maxWidth={450} display="flex" flexDirection="column" my={2}>
                    <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                        Emails
                    </Typography>

                    {values.emails.slice().map((item) => (
                        <Box
                            key={item.email}
                            flexWrap="wrap"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            gap={1}
                        >
                            <Typography
                                color="GrayText"
                                title={item.email}
                                style={{
                                    maxWidth: '70%',
                                    minWidth: '200px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.email}
                            </Typography>

                            {item.checkedAt ? (
                                <Button
                                    size="small"
                                    variant="contained"
                                    style={{ width: '105px' }}
                                    onClick={() => handleDeleteEmail(item.email)}
                                >
                                    Delete
                                </Button>
                            ) : item.sentCode ? (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-end"
                                    justifyContent="flex-end"
                                >
                                    <CustomTextField
                                        style={{ width: 120 }}
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
                                <Button
                                    style={{ width: '105px' }}
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleSendCodeEmail(item.email)}
                                >
                                    Resend code
                                </Button>
                            )}
                        </Box>
                    ))}

                    <Box width="100%" display="flex" alignItems="center">
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
                        <Box>
                            <Button
                                style={{ marginLeft: '10px', width: '105px' }}
                                size="small"
                                variant="contained"
                                onClick={handleAddEmail}
                            >
                                Verify
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box my={1} display="flex" flexDirection="column">
                    <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                        Wallets
                    </Typography>

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

export default AccountSettings;
