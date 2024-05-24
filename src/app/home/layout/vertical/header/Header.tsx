import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons-react';

import { useSelector } from '@/store/hooks';
import { toggleMobileSidebar, toggleSidebar } from '@/features/customizer/slice';
import { Rss } from './Rss';
import Profile from './Profile';
import Language from './Language';
import { ClaimContainer } from '@/app/home/components/Claim/container';
import { WalletProvider } from '@/app/home/components/apps/wallet';

const Header = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    // drawer
    const customizer = useSelector((state) => state.customizer);
    const hasConsign = useSelector((state) => state.asset.contractExplorer?.tx);

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
                    {hasConsign && (
                        <WalletProvider>
                            <ClaimContainer />
                        </WalletProvider>
                    )}
                    <Rss />
                    <Language />

                    <Profile />
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
