import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconArrowBarToLeft, IconArrowBarToRight, IconMenu2 } from '@tabler/icons-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

import { useSelector } from '@/store/hooks';
import { toggleMobileSidebar, toggleSidebar } from '@/features/customizer/slice';
import { Rss } from './Rss';
import Language from './Language';
import { ClaimContainer } from '@/app/(main)/components/Claim/container';
import { WalletProvider } from '@/app/(main)/components/apps/wallet';
import AllProjectsMenu from './AllProjectsMenu';

const Header = () => {
    const dispatch = useDispatch();
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const smUp = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        window.open('https://about.xibit.app', '_blank');
    };

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
                    {!lgUp ? (
                        <IconArrowBarToRight />
                    ) : customizer.isCollapse ? (
                        <IconArrowBarToRight />
                    ) : (
                        <IconArrowBarToLeft />
                    )}
                </IconButton>
                {!lgUp && <AllProjectsMenu />}

                <Box width="100%" display="flex" justifyContent={lgUp || smUp ? 'right' : 'space-between'}>
                    <Stack
                        sx={lgUp || smUp ? {} : { flex: 2 }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {lgUp && <AllProjectsMenu />}
                        {(generalVault || vault) && (
                            <Box sx={lgUp || smUp ? { marginRight: 7 } : {}}>
                                <WalletProvider>
                                    <ClaimContainer />
                                </WalletProvider>
                            </Box>
                        )}
                    </Stack>
                    <IconButton onClick={handleOpen} sx={{ position: 'relative' }}>
                        <IconMenu2 width={35} height={35} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ position: 'absolute', left: '91%', top: '4%' }}
                    >
                        <MenuItem onClick={handleClick}>About Xibit</MenuItem>
                        <MenuItem disabled>Buy VUSD</MenuItem>
                        <MenuItem>
                            <Rss />
                        </MenuItem>
                        <MenuItem>
                            <Language />
                        </MenuItem>
                    </Menu>
                </Box>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
