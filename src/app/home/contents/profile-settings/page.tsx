'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// components
import { useDispatch } from '@/store/hooks';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import BlankCard from '../../components/shared/BlankCard';
import AccountSettings from './accountSettings';

// images
import { Stack } from '@mui/system';
import { FooterForm } from '../../components/footerForm';
import { saveStepWizardThunk } from '@/features/user/thunks';
import { userSelector } from '@/features/user';
import { AccountSettingsFormValues } from './types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { debouncedUsernameValidation } from '../consignArtwork/formschema';

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        title: 'Profile',
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
                await dispatch(saveStepWizardThunk({ step: 0, values }));

                setToastr({
                    open: true,
                    type: 'success',
                    message: 'Data saved successfully',
                });

                setTimeout(() => {
                    router.push('/home');
                }, 500);
            },
        });

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);
        if (e.target.value === username) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    return (
        <PageContainer title="Profile Settings" description="this is Account Settings">
            <form onSubmit={handleSubmit}>
                <FooterForm backPathRouter="/home">
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
                                        <Box my={3}>
                                            <Typography color="textSecondary" mb={3}>
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
                </FooterForm>
            </form>
        </PageContainer>
    );
}
