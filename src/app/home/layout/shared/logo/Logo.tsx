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

    if (customizer.activeDir === 'ltr') {
        return (
            <LinkStyled style={{ textDecoration: 'none' }} href="/home">
                {customizer.activeMode === 'dark' ? (
                    <Box display="flex" marginTop={2} alignItems="center">
                        <Image
                            style={{ marginRight: '5px' }}
                            src={'/images/logos/logo-icon-vtru.png'}
                            alt="logo"
                            height={40}
                            width={40}
                            priority
                        />

                        <VtruTitle vtru="h5" studio="h3" copy="h3" copyRem="2.5rem" />
                    </Box>
                ) : (
                    <Box display="flex" marginTop={2} alignItems="center">
                        <Image
                            style={{ marginRight: '5px' }}
                            src={'/images/logos/logo-icon-vtru.png'}
                            alt="logo"
                            height={40}
                            width={40}
                            priority
                        />

                        <VtruTitle vtru="h5" studio="h3" copy="h3" copyRem="2.5rem" />
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
                        src={'/images/logos/logo-icon-vtru.png'}
                        alt="logo"
                        height={40}
                        width={40}
                        priority
                    />

                    <VtruTitle vtru="h5" studio="h3" copy="h3" copyRem="2.5rem" />
                </Box>
            ) : (
                <Box display="flex" marginTop={2} alignItems="center">
                    <Image
                        style={{ marginRight: '5px' }}
                        src={'/images/logos/logo-icon-vtru.png'}
                        alt="logo"
                        height={40}
                        width={40}
                        priority
                    />

                    <VtruTitle vtru="h5" studio="h3" copy="h3" copyRem="2.5rem" />
                </Box>
            )}
        </LinkStyled>
    );
};

export default Logo;
