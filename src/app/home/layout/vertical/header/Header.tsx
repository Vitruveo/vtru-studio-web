import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons-react';
import Profile from './Profile';
import Language from './Language';

import MobileRightSidebar from './MobileRightSidebar';
import { useDispatch } from 'react-redux';
import { toggleMobileSidebar, toggleSidebar } from '@/features/customizer/slice';
import { useSelector } from '@/store/hooks';
import { GENERAL_STORAGE_URL } from '@/constants/asset';

const Header = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    // drawer
    const customizer = useSelector((state) => state.customizer);

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: customizer.TopbarHeight,
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                {/* ------------------------------------------- */}
                {/* Toggle Button Sidebar */}
                {/* ------------------------------------------- */}
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
                >
                    <IconMenu2 size="20" />
                </IconButton>

                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={() => {
                            window.open(`${GENERAL_STORAGE_URL}/rss.xml`, '_blank');
                        }}
                    >
                        <Image
                            src="/images/icons/rss.png"
                            width={30}
                            height={30}
                            alt=""
                            style={{ borderRadius: 30, cursor: 'pointer' }}
                        />
                    </IconButton>
                    <Language />

                    <Profile />
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
