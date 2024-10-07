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
import AllProjectsMenu from './AllProjectsMenu';

const Header = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const smUp = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
    const dispatch = useDispatch();

    // drawer
    const customizer = useSelector((state) => state.customizer);
    const generalVault = useSelector((state) => state.user.generalVault?.transactionHash);
    const vault = useSelector((state) => state.user.vault?.transactionHash);

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
                    style={{ padding: '0' }}
                    aria-label="menu"
                    onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
                >
                    <IconMenu2 size="20" />
                </IconButton>

                <Box width="100%" display="flex" justifyContent="right">
                    <Stack direction="row" alignItems="center">
                        {smUp && <AllProjectsMenu />}
                        {(generalVault || vault) && (
                            <Box sx={{ marginInline: 0.5 }}>
                                <WalletProvider>
                                    <ClaimContainer />
                                </WalletProvider>
                            </Box>
                        )}
                    </Stack>
                    <Stack direction={smUp ? 'row' : 'column-reverse'} alignItems="center">
                        <Rss />
                        <Language />
                        <Profile />
                    </Stack>
                </Box>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
