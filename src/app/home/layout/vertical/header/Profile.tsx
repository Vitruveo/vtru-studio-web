import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';

import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from '@mui/material';

import { useDispatch } from '@/store/hooks';

import * as dropdownData from './data';
import { userActionsCreators } from '@/features/user/slice';
import { userSelector } from '@/features/user';
import { useI18n } from '@/app/hooks/useI18n';
import { useAvatar } from '@/app/home/myProfile/useAvatar';

const Profile = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);

    const router = useRouter();
    const { avatarSrc } = useAvatar();
    const dispatch = useDispatch();

    const { language } = useI18n();

    const texts = {
        title: language['studio.userAccount.title'],
        creator: language['studio.userAccount.creator'],
        logout: language['studio.userAccount.logout.button'],
        usernameNotFound: language['studio.userAccount.usernameNotFound'],
    } as { [key: string]: string };

    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleLogout = () => {
        setTimeout(() => {
            router.push('/login');
        }, 1000);
        dispatch(userActionsCreators.logout());
    };

    const { username } = useSelector(userSelector(['username']));

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={avatarSrc}
                    alt={'ProfileImg'}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '360px',
                        p: 4,
                    },
                }}
            >
                <Typography variant="h5">{texts.title}</Typography>
                <Stack direction="row" py={3} spacing={2} alignItems="center">
                    <Avatar src={avatarSrc} alt={'ProfileImg'} sx={{ width: 95, height: 95 }} />
                    <Box>
                        <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                            {username || texts.usernameNotFound}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {texts.creator}
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
                {dropdownData.profile.map((profile) => (
                    <Box key={profile.title}>
                        <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                            <Link href={profile.href}>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        width="45px"
                                        height="45px"
                                        bgcolor="primary.light"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink="0"
                                    >
                                        <Avatar
                                            src={profile.icon}
                                            alt={profile.icon}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 0,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight={600}
                                            color="textPrimary"
                                            className="text-hover"
                                            noWrap
                                            sx={{
                                                width: '240px',
                                            }}
                                        >
                                            {language[profile.title] as string}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                            sx={{
                                                width: '240px',
                                            }}
                                            noWrap
                                        >
                                            {language[profile.subtitle] as string}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Link>
                        </Box>
                    </Box>
                ))}
                <Box mt={2}>
                    <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
                        {texts.logout}
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
