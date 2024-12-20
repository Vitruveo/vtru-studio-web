import React, { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, CardContent, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField, { CustomTextFieldDebounce } from '../../components/forms/theme-elements/CustomTextField';
import { BASE_URL_SEARCH } from '@/constants/search';
import { useSelector } from '@/store/hooks';
import { userSelector } from '@/features/user';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import AccountSettings from '../accountSettings';

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
    handleChange,
    handleSubmit,
    setFieldError,
    setErrors,
}: IdentityProps) => {
    const [copySearchMessage, setCopySearchMessage] = useState('Copy my search URL');

    const { _id } = useSelector(userSelector(['_id']));

    const handleCopySearchUrl = () => {
        navigator.clipboard.writeText(`${BASE_URL_SEARCH}/?creatorId=${_id}`);
        setCopySearchMessage('Copied!');
        setTimeout(() => {
            setCopySearchMessage('Copy my search URL');
        }, 2_000);
    };

    const handleMyWebsiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue('myWebsite', !e.target.value.length ? null : e.target.value);
    };

    return (
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
                        <Box maxWidth={250}>
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
                            <Button variant="contained" onClick={handleCopySearchUrl}>
                                {copySearchMessage}
                            </Button>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default Identity;
