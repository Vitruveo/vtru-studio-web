import React, { useCallback, useState } from 'react';
import { ValidationError } from 'yup';
import { AxiosError } from 'axios';
import { IconTrash } from '@tabler/icons-react';
import { Box, Button, IconButton, Radio, Theme, Typography, useMediaQuery, RadioGroup } from '@mui/material';
import { addCreatorEmailThunk, sendEmailThunk, verifyCodeThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';
import { codesVtruApi } from '@/services/codes';
import { useI18n } from '@/app/hooks/useI18n';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { validateEmailFormValue } from '../consignArtwork/formschema';
import { checkCreatorEmailExist } from '@/features/user/requests';
import { CreatorEmailExistApiRes } from '@/features/user/types';
import { EmailFormValues } from './types';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';

interface AddEmailsProps {
    emails: EmailFormValues[];
    emailDefault?: string;
    setFieldValue: (field: string, value: any) => void;
}

const AddEmails = ({ emails, emailDefault, setFieldValue }: AddEmailsProps) => {
    const [email, setEmail] = useState('');
    const [emailSendCode, setEmailSendCode] = useState<EmailFormValues>();

    const [emailError, setEmailError] = useState('');

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
    const checkDefaultEmail = !emailDefault || !emailDefault.length ? emails[0]?.email : emailDefault;

    const { language } = useI18n();

    const texts = {
        emailsTitle: language['studio.myProfile.form.emails.title'],
        deleteButton: language['studio.myProfile.form.delete.button'],
        verifyButton: language['studio.myProfile.form.verify.button'],
        addEmailsPlaceholder: language['studio.myProfile.form.addEmails.placeholder'],
        walletsTitle: language['studio.myProfile.form.wallets.title'],
        codePlaceholder: language['studio.myProfile.form.code.placeholder'],
        emailsExistError: language['studio.myProfile.form.emailsExists.error'],
        verificationCodeSuccess: language['studio.myProfile.verificationCodeSentMessageSuccess'],
        verificationCodeError: language['studio.myProfile.verificationCodeSentMessageError'],
        emailVerificationSuccess: language['studio.myProfile.emailVerificationMessageSuccess'],
        emailVerificationError: language['studio.myProfile.emailVerificationMessageError'],
    } as { [key: string]: string };

    const dispatch = useDispatch();

    const handleSendCodeEmail = useCallback(
        async (emailSend: string) => {
            const res = await dispatch(sendEmailThunk({ email: emailSend }));

            if (codesVtruApi.success.user.includes(res.code)) {
                setToastr({
                    open: true,
                    type: 'success',
                    message: texts.verificationCodeSuccess,
                });
            } else {
                setToastr({
                    open: true,
                    type: 'error',
                    message: texts.verificationCodeError,
                });
            }
        },
        [emails]
    );

    const handleVerifyCode =
        (emailVerify: string) => async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            try {
                if (e.target.value.length === 6) {
                    const res = await dispatch(verifyCodeThunk({ code: e.target.value, email: emailVerify }));
                    if (codesVtruApi.success.user.includes(res.code)) {
                        setFieldValue('emails', [
                            ...emails,
                            { email: emailVerify, checkedAt: new Date(), sentCode: true },
                        ]);
                        setEmail('');
                        setEmailSendCode(undefined);
                        setToastr({
                            open: true,
                            type: 'success',
                            message: texts.emailVerificationSuccess,
                        });
                    }
                }
            } catch (error) {
                setToastr({
                    open: true,
                    type: 'error',
                    message: texts.emailVerificationError,
                });
            }
        };

    const handleChangeEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toLowerCase();
        setEmail(e.target.value);
    }, []);

    const handleAddEmail = useCallback(async () => {
        if (emailSendCode) {
            handleSendCodeEmail(emailSendCode.email);
        } else {
            if (emails.some((item) => item.email === email)) {
                setEmailError(texts.emailsExistError);
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
                setEmailError(texts.emailsExistError);
            } catch (error) {
                if (
                    codesVtruApi.notfound.user.includes(
                        (error as AxiosError<CreatorEmailExistApiRes>).response?.data?.code as string
                    )
                ) {
                    await dispatch(addCreatorEmailThunk({ email }));
                    setEmailSendCode({ email, checkedAt: null, sentCode: true });
                    setToastr({
                        open: true,
                        type: 'success',
                        message: texts.verificationCodeSuccess,
                    });
                    setEmailError('');
                }
            }
        }
    }, [setFieldValue, emails, email, emailSendCode]);

    const handleDeleteEmail = useCallback(
        (emailDelet: string) => {
            setFieldValue(
                `emails`,
                emails.filter((v) => v.email !== emailDelet)
            );
        },
        [setFieldValue, emails]
    );

    const handleEmailDefaultChange = (val: string) => {
        setFieldValue('emailDefault', val);
    };

    return (
        <Box maxWidth={!xl ? 300 : 400} display="flex" flexDirection="column" my={2}>
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <Typography variant="subtitle1" fontWeight={600} style={{ width: '70%' }}>
                    Emails
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} style={{ width: '20%', textAlign: 'center' }}>
                    Default
                </Typography>
                <Box width="10%" /> {/* Espaço reservado para a coluna da lixeira */}
            </Box>
            <RadioGroup
                defaultValue={checkDefaultEmail}
                aria-label="options"
                name="emailDefault"
                onChange={(v) => handleEmailDefaultChange(v.target.value)}
            >
                {emails.slice().map((item) => (
                    <Box key={item.email} display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
                        <Typography variant="body1" style={{ width: '70%' }}>
                            {item.email}
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center" width="20%">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                style={{ margin: 0, padding: 0 }}
                            >
                                <Radio sx={{ padding: 0 }} value={item.email} />
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                            <IconButton
                                disabled={item.email === emailDefault}
                                sx={{ padding: 0, margin: 0 }}
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEmail(item.email);
                                }}
                            >
                                <IconTrash
                                    color={item.email === emailDefault ? '#A9A9A9' : 'red'}
                                    size="16"
                                    stroke={1.5}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </RadioGroup>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <CustomTextField
                    style={{ width: '70%' }}
                    type="email"
                    value={email}
                    onChange={handleChangeEmailInput}
                    size="small"
                    fullWidth
                    FormHelperTextProps={{
                        style: {
                            position: 'absolute',
                            bottom: '-22px',
                            left: 0,
                            fontSize: '0.75rem',
                        },
                    }}
                    variant="outlined"
                    placeholder={texts.addEmailsPlaceholder}
                    error={!!emailError}
                    helperText={emailError}
                />
                <Box width="30%" display="flex" justifyContent="center">
                    <Button
                        style={{ width: '85%', marginLeft: '10%' }}
                        size="small"
                        variant="contained"
                        onClick={handleAddEmail}
                    >
                        {emailSendCode ? 'Send Code' : 'Add'}
                    </Button>
                </Box>
            </Box>
            {emailSendCode && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography
                        color="GrayText"
                        style={{
                            width: '35%',
                        }}
                    >
                        Verification Code
                    </Typography>
                    <CustomTextField
                        style={{ width: '35%' }}
                        fullWidth
                        onChange={handleVerifyCode(emailSendCode?.email)}
                        size="small"
                        id="verificationCode"
                        variant="outlined"
                    />
                    <Box width="30%" display="flex" justifyContent="center">
                        <Button
                            style={{ width: '85%', marginLeft: '10%' }}
                            size="small"
                            variant="contained"
                            onClick={handleAddEmail}
                        >
                            {texts.verifyButton}
                        </Button>
                    </Box>
                </Box>
            )}
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </Box>
    );
};

export default AddEmails;
