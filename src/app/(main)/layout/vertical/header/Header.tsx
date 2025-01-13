import { useDispatch } from 'react-redux';
import { IconArrowBarToLeft, IconArrowBarToRight } from '@tabler/icons-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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
import Image from 'next/image';

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
                    <Stack direction={smUp ? 'row' : 'column-reverse'} alignItems="center">
                        <IconButton
                            size="small"
                            aria-label="more"
                            id="long-button"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <Image
                                src="/images/icons/xibit-icon-redondo-darkmode.png"
                                width={35}
                                height={35}
                                alt=""
                                style={{ cursor: 'pointer' }}
                            />
                        </IconButton>
                        <Rss />
                        <Language />
                    </Stack>
                </Box>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
