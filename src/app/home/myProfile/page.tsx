'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import BlankCard from '../components/shared/BlankCard';
import AccountSettings from './accountSettings';

import { Stack } from '@mui/system';
import {
    changeAvatarThunk,
    generalStorageAvatarThunk,
    saveStepWizardThunk,
    sendRequestUploadThunk,
} from '@/features/user/thunks';
import { userSelector } from '@/features/user';
import { AccountSettingsFormValues } from './types';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';
import { debouncedUsernameValidation } from '../consignArtwork/formschema';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { useI18n } from '@/app/hooks/useI18n';
import { useAvatar } from './useAvatar';
import { useToastr } from '@/app/hooks/useToastr';

export default function ProfileSettings() {
    const toast = useToastr();
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const { avatarSrc } = useAvatar();
    const [resetAvatar, setResetAvatar] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [changeAvatarFile, setChangeAvatarFile] = useState<File>();

    const { isCompletedProfile, goToConsignArtwork } = useSelector((state) => state.consignArtwork);
    const { username, emailDefault, walletDefault, emails, wallets, requestAvatarUpload } = useSelector(
        userSelector(['username', 'emailDefault', 'walletDefault', 'emails', 'wallets', 'requestAvatarUpload'])
    );

    const initialValues = {
        emailDefault: !emailDefault || !emailDefault.length ? emails[0]?.email : emailDefault,
        walletDefault: !walletDefault || !walletDefault.length ? wallets[0]?.address || '' : walletDefault,
        username,
        emails: emails.filter((email) => email.checkedAt),
        wallets,
        creators: [],
        currentCreator: {
            bio: '',
            ethnicity: '',
            gender: '',
            name: '',
            nationality: '',
            profileUrl: '',
            residence: '',
            roles: [],
        },
    };

    const { handleSubmit, handleChange, setFieldValue, setFieldError, setErrors, values, errors } =
        useFormik<AccountSettingsFormValues>({
            initialValues,
            // validationSchema: stepsSchemaValidation,
            onSubmit: onSubmit,
        });

    async function onSubmit(formValues: AccountSettingsFormValues) {
        if (!formValues.username || formValues.username?.length === 0) setUsernameError(texts.usernameRequiredError);
        else {
            dispatch(saveStepWizardThunk({ step: 0, values }));
            dispatch(
                consignArtworkActionsCreators.checkIsCompletedProfile({
                    username: values.username,
                    emails: values.emails,
                    wallets: values.wallets,
                })
            );

            if (resetAvatar) {
                dispatch(changeAvatarThunk({ fileId: '' }));
                toast.display({ message: texts.saveMessage, type: 'success' });

                setTimeout(() => {
                    router.push('/home');
                }, 500);
            } else if (changeAvatarFile) {
                dispatch(
                    sendRequestUploadThunk({
                        mimetype: changeAvatarFile!.type,
                        originalName: changeAvatarFile!.name,
                    })
                );
            } else {
                toast.display({ message: texts.saveMessage, type: 'success' });

                setTimeout(() => {
                    router.push('/home');
                }, 500);
            }
        }
    }

    useEffect(() => {
        if (requestAvatarUpload.status === 'ready') {
            dispatch(
                generalStorageAvatarThunk({
                    file: changeAvatarFile!,
                    path: requestAvatarUpload.path,
                    url: requestAvatarUpload.url,
                    transactionId: requestAvatarUpload.transactionId,
                })
            );

            toast.display({ message: texts.saveMessage, type: 'success' });

            setTimeout(() => {
                router.push('/home');
            }, 500);
        }
    }, [requestAvatarUpload.status]);

    useEffect(() => {
        if (!isCompletedProfile && goToConsignArtwork) {
            const fields = {
                username: {
                    translation: texts.usernameTitle,
                    isValid: !!values.username,
                },
                emails: {
                    translation: texts.emailsTitle,
                    isValid: !!values.emails.length,
                },

                wallets: {
                    translation: texts.walletsTitle,
                    isValid: !!values.wallets.length,
                },
            };

            const invalidFields = Object.entries(fields).filter(([key, value]) => !value.isValid);

            dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(false));
            toast.display({
                type: 'warning',
                message: (
                    <Box>
                        {`${texts.accessConsignMessage}`}
                        <Box>
                            Fill in the fields: {`${invalidFields.map(([key, value]) => value.translation).join(', ')}`}
                        </Box>
                    </Box>
                ),
            });
        }
    }, [isCompletedProfile, goToConsignArtwork]);

    const texts = {
        title: language['studio.myProfile.title'],
        subtitle: language['studio.myProfile.subtitle'],
        home: language['studio.myProfile.home'],
        emailsTitle: language['studio.myProfile.form.emails.title'],
        walletsTitle: language['studio.myProfile.form.wallets.title'],
        usernameTitle: language['studio.myProfile.form.username.title'],
        usernamePlaceholder: language['studio.myProfile.form.username.placeholder'],
        saveMessage: language['studio.myProfile.saveMessage'],
        usernameRequiredError: language['studio.myProfile.form.usernameRequired.error'],
        accessConsignMessage: language['studio.myProfile.accessConsignMessage'],
        profileTitle: language['studio.myProfile.form.profile.title'],
        profileResetButton: language['studio.myProfile.form.profile.reset.button'],
        profileUploadButton: language['studio.myProfile.form.profile.upload.button'],
        profileDescription: language['studio.myProfile.form.profile.description'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.home,
        },
        {
            title: texts.title,
        },
    ];

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);
        if (e.target.value === username) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (resetAvatar) setResetAvatar(false);

        const file = event.target.files?.[0];

        if (file) {
            const fileSize = file.size / 1024;
            if (fileSize > 800) {
                toast.display({ type: 'warning', message: 'File size is too big' });
            } else {
                setChangeAvatarFile(file);
            }
        }
    };

    const handleOnClickReset = () => {
        setResetAvatar(true);
    };

    const isNewAvatar = resetAvatar
        ? '/images/profile/profileDefault.png'
        : changeAvatarFile instanceof File
          ? URL.createObjectURL(changeAvatarFile)
          : avatarSrc;

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter backPathRouter="/home" title={texts.title}>
                <Box margin="auto 0" marginBottom={10} display="relative">
                    <Breadcrumb title={texts.title} items={BCrumb} />

                    <Box my={3}>
                        <Typography variant="h5" fontWeight="normal" color="GrayText">
                            {texts.subtitle}
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <BlankCard>
                                <CardContent sx={{ height: { xs: 'auto', lg: '500px' } }}>
                                    <Box my={2} maxWidth={250}>
                                        <Box mb={2}>
                                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                                {texts.usernameTitle}
                                            </Typography>
                                        </Box>
                                        <CustomTextField
                                            placeholder={texts.usernamePlaceholder}
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
                                    <Box my={3}>
                                        <Typography variant="subtitle1" fontWeight={600} component="label" mb={3}>
                                            {texts.profileTitle}
                                        </Typography>
                                        <Box textAlign="center" display="flex" justifyContent="center">
                                            <Box>
                                                <Avatar
                                                    src={isNewAvatar}
                                                    alt={'user1'}
                                                    sx={{
                                                        width: 120,
                                                        height: 120,
                                                        margin: '0 auto',
                                                    }}
                                                />
                                                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                                                    <Button
                                                        onClick={handleOnClickReset}
                                                        variant="outlined"
                                                        color="error"
                                                    >
                                                        {texts.profileResetButton}
                                                    </Button>
                                                    <Button variant="contained" color="primary" component="label">
                                                        {texts.profileUploadButton}
                                                        <input
                                                            onChange={handleFileChange}
                                                            hidden
                                                            accept="image/*"
                                                            type="file"
                                                        />
                                                    </Button>
                                                </Stack>
                                                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                                                    {texts.profileDescription}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                        <Grid item xs={12} lg={6} width="50%">
                            <BlankCard>
                                <CardContent
                                    sx={{ height: { xs: 'auto', lg: '500px' } }}
                                    style={{ overflowY: 'auto', maxHeight: '535px' }}
                                >
                                    <AccountSettings
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
                </Box>
            </PageContainerFooter>
        </form>
    );
}
