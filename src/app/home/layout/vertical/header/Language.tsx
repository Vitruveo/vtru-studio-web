import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector, useDispatch } from '@/store/hooks';
// import { setLanguage } from '@/store/customizer/CustomizerSlice';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { setLanguage } from '@/features/customizer/slice';
// import { AppState } from '@/store';

const Languages = [
    {
        flagname: 'English (US)',
        icon: '/images/flag/icon-flag-en-us.png',
        value: 'en_US',
    },
    {
        flagname: 'Português PT-BR',
        icon: '/images/flag/icon-flag-br.png',
        value: 'pt_BR',
    },
];

const Language = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const customizer = useSelector((state) => state.customizer);

    const currentLang = Languages.find((_lang) => _lang.value === customizer.currentLanguage) || Languages[1];
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        i18n.changeLanguage(customizer.currentLanguage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar src={currentLang.icon} alt={currentLang.value} sx={{ width: 30, height: 30 }} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                {Languages.map((option, index) => (
                    <MenuItem key={index} sx={{ py: 2, px: 3 }} onClick={() => dispatch(setLanguage(option.value))}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={option.icon} alt={option.icon} sx={{ width: 20, height: 20 }} />
                            <Typography> {option.flagname}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default Language;
