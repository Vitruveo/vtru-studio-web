import { FC } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';

const Logo = () => {
    const customizer = {
        activeDir: 'ltr',
        activeMode: 'light', // This can be light or dark
        activeTheme: 'BLUE_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
        SidebarWidth: 270,
        MiniSidebarWidth: 87,
        TopbarHeight: 60,
        isLayout: 'full', // This can be full or boxed
        isCollapse: false, // to make sidebar Mini by default
        isSidebarHover: false,
        isMobileSidebar: false,
        isHorizontal: false,
        isLanguage: 'en',
        isCardShadow: true,
        borderRadius: 7,
    };

    const theme = useTheme();

    const LinkStyled = styled(Link)(() => ({
        height: customizer.TopbarHeight,
        width: customizer.isCollapse ? '40px' : '190px',
        overflow: 'hidden',
        display: 'block',
        color: theme.palette.text.primary,
    }));

    if (customizer.activeDir === 'ltr') {
        return (
            <LinkStyled style={{ textDecoration: 'none' }} href="/home">
                {customizer.activeMode === 'dark' ? (
                    <Image
                        src="/images/logos/light-logo.svg"
                        alt="logo"
                        height={customizer.TopbarHeight}
                        width={174}
                        priority
                    />
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
                <Image
                    src="/images/logos/dark-rtl-logo.svg"
                    alt="logo"
                    height={customizer.TopbarHeight}
                    width={174}
                    priority
                />
            ) : (
                <Image
                    src="/images/logos/light-logo-rtl.svg"
                    alt="logo"
                    height={customizer.TopbarHeight}
                    width={174}
                    priority
                />
            )}
        </LinkStyled>
    );
};

export default Logo;
