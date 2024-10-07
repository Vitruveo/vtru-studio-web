import { FC } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';
import { useSelector } from '@/store/hooks';

const Logo = () => {
    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();

    const LinkStyled = styled(Link)(() => ({
        height: customizer.TopbarHeight,
        width: customizer.isMobileSidebar
            ? '190px'
            : customizer.isCollapse && !customizer.isSidebarHover
              ? '40px'
              : '190px',
        overflow: 'hidden',
        display: 'block',
        color: theme.palette.text.primary,
    }));

    const checkSidebar = customizer.isCollapse && !customizer.isSidebarHover;

    if (customizer.activeDir === 'ltr') {
        return (
            <LinkStyled style={{ textDecoration: 'none' }} href="/home">
                {customizer.activeMode === 'dark' ? (
                    <Box display="flex" marginTop={2} alignItems="center">
                        <Image src={'/images/logos/XIBIT-logo_light.png'} alt="logo" height={40} width={120} priority />
                    </Box>
                ) : (
                    <Box display="flex" marginTop={1} alignItems="center">
                        <Image
                            style={{ display: checkSidebar ? 'none' : '' }}
                            src={'/images/logos/XIBIT-logo_light.png'}
                            alt="logo"
                            height={40}
                            width={120}
                            priority
                        />
                        <Image
                            style={{ display: checkSidebar ? '' : 'none' }}
                            src={'/images/logos/XIBIT-logo_light.png'}
                            alt="logo"
                            height={40}
                            width={120}
                            priority
                        />
                    </Box>
                )}
            </LinkStyled>
        );
    }

    return (
        <LinkStyled href="/home">
            {customizer.activeMode === 'dark' ? (
                <Box display="flex" marginTop={2} alignItems="center">
                    <Image
                        style={{ marginRight: '5px' }}
                        src={'/images/logos/newlogo.png'}
                        alt="logo"
                        height={35}
                        width={100}
                        priority
                    />
                    <Image
                        style={{ marginRight: '5px' }}
                        src={'/images/logos/newFullLogo.png'}
                        alt="logo"
                        height={25}
                        width={150}
                        priority
                    />
                </Box>
            ) : (
                <Box display="flex" marginTop={2} alignItems="center">
                    <Image
                        style={{ marginRight: '5px' }}
                        src={'/images/logos/newlogo.png'}
                        alt="logo"
                        height={35}
                        width={100}
                        priority
                    />
                    <Image
                        style={{ marginRight: '5px' }}
                        src={'/images/logos/newFullLogo.png'}
                        alt="logo"
                        height={25}
                        width={150}
                        priority
                    />
                </Box>
            )}
        </LinkStyled>
    );
};

export default Logo;
