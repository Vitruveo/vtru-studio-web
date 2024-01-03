'use client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';

// components
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import BlankCard from '../../components/shared/BlankCard';
import AccountSettings from './accountSettings';

// images
import { Stack } from '@mui/system';
import { FooterForm } from '../../components/footerForm';
import { saveStepWizardThunk } from '@/features/user/thunks';

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
    const [location, setLocation] = React.useState('india');

    const handleChange1 = (event: any) => {
        setLocation(event.target.value);
    };

    const [language, setLanguage] = React.useState('english');

    const handleChange2 = (event: any) => {
        setLanguage(event.target.value);
    };

    return (
        <PageContainer title="Profile Settings" description="this is Account Settings">
            <Box width="80vw" display="relative">
                <Breadcrumb title="My Profile" items={BCrumb} />

                <Box my={3}>
                    <Typography variant="h5" fontWeight="normal" color="GrayText">
                        Customize your Vitruveo profile with multiple email and wallet addresses.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <BlankCard>
                            <CardContent>
                                <AccountSettings />
                            </CardContent>
                        </BlankCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <BlankCard>
                            <CardContent>
                                <Typography variant="h5" mb={1}>
                                    Change Profile
                                </Typography>
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
                                            <Button variant="contained" color="primary" component="label">
                                                Upload
                                                <input hidden accept="image/*" multiple type="file" />
                                            </Button>
                                            <Button variant="outlined" color="error">
                                                Reset
                                            </Button>
                                        </Stack>
                                        <Typography variant="subtitle1" color="textSecondary" mb={4}>
                                            Allowed JPG, GIF or PNG. Max size of 800K
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
