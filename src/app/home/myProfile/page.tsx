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

// images
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

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        title: 'My Profile',
    },
];

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

    const { handleSubmit, handleChange, setFieldValue, setFieldError, setErrors, values, errors } =
        useFormik<AccountSettingsFormValues>({
            initialValues: {
                username,
                emails,
                wallets,
            },
            // validationSchema: stepsSchemaValidation,
            onSubmit: async (formValues) => {
                if (!formValues.username || formValues.username?.length === 0) setUsernameError('Username is required');
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
                        message: 'Data saved successfully',
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
                message:
                    'To access the consign artwork, it is necessary to fill in all the mandatory fields in the user profile',
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
            <PageContainerFooter backPathRouter="/home" title="My Profile" description="this is Account Settings">
                <Box margin="auto 0" display="relative">
                    <Breadcrumb title="My Profile" items={BCrumb} />

                    <Box my={3}>
                        <Typography variant="h5" fontWeight="normal" color="GrayText">
                            Customize your Vitruveo profile with multiple email and wallet addresses.
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <BlankCard>
                                <CardContent sx={{ height: { xs: 'auto', lg: '500px' } }}>
                                    <Box my={2} maxWidth={250}>
                                        <Box mb={2}>
                                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                                Username
                                            </Typography>
                                        </Box>
                                        <CustomTextField
                                            placeholder="Enter username"
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
                                            Change your profile picture from here
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
                                                        Reset
                                                    </Button>
                                                    <Button variant="contained" color="primary" component="label">
                                                        Upload
                                                        <input hidden accept="image/*" multiple type="file" />
                                                    </Button>
                                                </Stack>
                                                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                                                    Allowed JPG, GIF or PNG. Max size of 800K
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
