'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// components
import { useDispatch, useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '../components/container/PageContainer';
import BlankCard from '../components/shared/BlankCard';
import AccountSettings from './accountSettings';

import { Stack } from '@mui/system';
import { FooterForm } from '../components/footerForm';
import { saveStepWizardThunk } from '@/features/user/thunks';
import { userSelector } from '@/features/user';
import { AccountSettingsFormValues } from './types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';
import { debouncedUsernameValidation } from '../consignArtwork/formschema';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { useI18n } from '@/app/hooks/useI18n';

export default function ProfileSettings() {
    const [usernameError, setUsernameError] = useState('');
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { username, emails, wallets } = useSelector(userSelector(['username', 'emails', 'wallets']));
    const { isCompletedProfile, goToConsignArtwork } = useSelector((state) => state.consignArtwork);

    const dispatch = useDispatch();
    const router = useRouter();

    const { language } = useI18n();

    const texts = {
        title: language['studio.myProfile.title'],
        subtitle: language['studio.myProfile.subtitle'],
        home: language['studio.myProfile.home'],
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

    const { handleSubmit, handleChange, setFieldValue, setFieldError, setErrors, values, errors } =
        useFormik<AccountSettingsFormValues>({
            initialValues: {
                username,
                emails,
                wallets,
            },
            // validationSchema: stepsSchemaValidation,
            onSubmit: async (formValues) => {
                if (!formValues.username || formValues.username?.length === 0)
                    setUsernameError(texts.usernameRequiredError);
                else {
                    await dispatch(saveStepWizardThunk({ step: 0, values }));
                    dispatch(
                        consignArtworkActionsCreators.checkIsCompletedProfile({
                            username: values.username,
                            emails: values.emails,
                            wallets: values.wallets,
                        })
                    );

                    setToastr({
                        open: true,
                        type: 'success',
                        message: texts.saveMessage,
                    });

                    setTimeout(() => {
                        router.push('/home');
                    }, 500);
                }
            },
        });

    useEffect(() => {
        if (!isCompletedProfile && goToConsignArtwork) {
            dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(false));
            setToastr({
                open: true,
                type: 'warning',
                message: texts.accessConsignMessage,
            });
        }
    }, [isCompletedProfile, goToConsignArtwork]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);
        if (e.target.value === username) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter backPathRouter="/home" title={texts.title}>
                <Box margin="auto 0" display="relative">
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
                                                    src={'/images/profile/profileDefault.png'}
                                                    alt={'user1'}
                                                    sx={{
                                                        width: 120,
                                                        height: 120,
                                                        margin: '0 auto',
                                                    }}
                                                />
                                                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                                                    <Button variant="outlined" color="error">
                                                        {texts.profileResetButton}
                                                    </Button>
                                                    <Button variant="contained" color="primary" component="label">
                                                        {texts.profileUploadButton}
                                                        <input hidden accept="image/*" multiple type="file" />
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

                <CustomizedSnackbar
                    type={toastr.type}
                    open={toastr.open}
                    message={toastr.message}
                    setOpentate={setToastr}
                />
            </PageContainerFooter>
        </form>
    );
}
