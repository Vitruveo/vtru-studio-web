import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, CardContent, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField, { CustomTextFieldDebounce } from '../../components/forms/theme-elements/CustomTextField';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { NODE_ENV } from '@/constants/api';
import { useSelector } from '@/store/hooks';
import { userSelector } from '@/features/user';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';

export interface IdentityProps extends ProfileTabsGeneralProps {
    usernameError: string;
    isNewAvatar: string;
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOnClickReset: () => void;
}

const Identity = ({
    usernameError,
    isNewAvatar,
    texts,
    values,
    errors,
    handleUsernameChange,
    handleFileChange,
    handleOnClickReset,
    setFieldValue,
}: IdentityProps) => {
    const [copySearchMessage, setCopySearchMessage] = useState('Copy my search URL');
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchRedirects = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setSearchUrl(rowData.data[NODE_ENV].xibit.search_url);
        };
        fetchRedirects();
    }, []);

    const { _id } = useSelector(userSelector(['_id']));

    const handleCopySearchUrl = () => {
        navigator.clipboard.writeText(`${searchUrl}/?creatorId=${_id}`);
        setCopySearchMessage('Copied!');
        setTimeout(() => {
            setCopySearchMessage('Copy my search URL');
        }, 2_000);
    };

    const handleMyWebsiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue('myWebsite', !e.target.value.length ? null : e.target.value);
    };

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue('displayName', !e.target.value.length ? null : e.target.value);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '470px' } }}>
                        <Box>
                            <Box my={2} maxWidth={300}>
                                <Box mb={1}>
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
                            <Box my={2} maxWidth={300}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Display Name
                                    </Typography>
                                </Box>
                                <CustomTextFieldDebounce
                                    size="small"
                                    name="displayName"
                                    variant="outlined"
                                    fullWidth
                                    value={values.displayName}
                                    handleChange={handleDisplayNameChange}
                                />
                            </Box>
                            <Box my={2} maxWidth={300}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Profile Link
                                    </Typography>
                                </Box>
                                <CustomTextFieldDebounce
                                    size="small"
                                    name="myWebsite"
                                    variant="outlined"
                                    fullWidth
                                    value={values.myWebsite}
                                    handleChange={handleMyWebsiteChange}
                                    error={!!errors.myWebsite}
                                    helperText={errors.myWebsite}
                                />
                            </Box>
                            <Box my={3} maxWidth={300}>
                                <Box mb={1}>
                                    <Button variant="contained" onClick={handleCopySearchUrl}>
                                        {copySearchMessage}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '470px' } }}>
                        <Box my={2}>
                            <Typography variant="subtitle1" fontWeight={600} component="label" mb={3}>
                                {texts.profileTitle}
                            </Typography>
                            <Box my={3} textAlign="center" display="flex" justifyContent="center">
                                <Box>
                                    <Avatar
                                        src={isNewAvatar}
                                        alt={'user1'}
                                        sx={{
                                            backgroundColor: '#ffffcc',
                                            width: 120,
                                            height: 120,
                                            margin: '0 auto',
                                        }}
                                    />
                                    <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                                        <Button onClick={handleOnClickReset} variant="outlined" color="error">
                                            {texts.profileResetButton}
                                        </Button>
                                        <Button variant="contained" color="primary" component="label">
                                            {texts.profileUploadButton}
                                            <input onChange={handleFileChange} hidden accept="image/*" type="file" />
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
        </Grid>
    );
};

export default Identity;
