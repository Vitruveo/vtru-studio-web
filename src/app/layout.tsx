'use client';

import { useEffect } from 'react';
import cookie from 'cookiejs';
import { useRouter } from 'next/navigation';
import { NextAppDirEmotionCacheProvider } from '@/app/common/theme/EmotionCache';
import { configTheme } from '@/app/common/theme/Theme';
import '@/utils/i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { Direction, Shadows, ThemeProvider, createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Inter } from 'next/font/google';
import 'toastr/build/toastr.min.css';
import 'react-tiny-fab/dist/styles.css';

import Providers from '@/store/Provider';
import CustomizedSnackbar from './common/toastr';
import { useToastr } from './hooks/useToastr';
import { useDispatch, useSelector } from '@/store/hooks';
import { getMeThunk } from '@/features/user/thunks';
import { getFeaturesThunk } from '@/features/features/thunks';
import { userActionsCreators } from '@/features/user/slice';

const inter = Inter({ subsets: ['latin'] });

const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = configTheme();
    const toastr = useToastr();
    const dispatch = useDispatch();
    const router = useRouter();
    const token = useSelector((state) => state.user?.token);

    const cookieEmailLogged = cookie.get('loggedEmail') as string | null;
    const stateEmailLogged = useSelector((state) => state.user?.login?.email);

    const handleLogout = () => {
        setTimeout(() => {
            router.push('/login');
        }, 1000);
        dispatch(userActionsCreators.logout());
    };

    useEffect(() => {
        const checkToken = async () => {
            const auth = cookie.get('auth');

            if (auth) {
                const response = await dispatch(getMeThunk());
                if (response) router.push('/home');
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        if ((cookieEmailLogged || stateEmailLogged) && token) {
            dispatch(getFeaturesThunk());
            const featuresInterval = setInterval(() => {
                dispatch(getFeaturesThunk());
            }, 60000);

            return () => {
                clearInterval(featuresInterval);
            };
        }
    }, [token]);

    useEffect(() => {
        if ((!cookieEmailLogged || !cookieEmailLogged.length) && (!stateEmailLogged || !stateEmailLogged.length)) {
            cookie.remove('auth');
            handleLogout();
        }
    }, [cookieEmailLogged, stateEmailLogged]);

    return (
        <>
            <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
                <ThemeProvider
                    theme={createTheme({
                        direction: theme.defaultTheme.direction as Direction,
                        palette: {
                            primary: {
                                main: '#ff0066',
                                light: '#FEFEFE',
                                dark: '#9e0643',
                                contrastText: '#FEFEFE',
                            },
                            secondary: {
                                main: '#59D6A9',
                                light: '#93E2BF',
                                dark: '#2AA077',
                                contrastText: '#ffffff',
                            },
                            success: {
                                main: '#13DEB9',
                                light: '#E6FFFA',
                                dark: '#02b3a9',
                                contrastText: '#333333',
                            },
                            info: {
                                main: '#539BFF',
                                light: '#EBF3FE',
                                dark: '#1682d4',
                                contrastText: '#ffffff',
                            },
                            error: {
                                main: '#FA896B',
                                light: '#FDEDE8',
                                dark: '#f3704d',
                                contrastText: '#ffffff',
                            },
                            warning: {
                                main: '#FFAE1F',
                                light: '#FEF5E5',
                                dark: '#ae8e59',
                                contrastText: '#ffffff',
                            },
                            grey: {
                                100: '#F2F6FA',
                                200: '#EAEFF4',
                                300: '#DFE5EF',
                                400: '#7C8FAC',
                                500: '#5A6A85',
                                600: '#2A3547',
                            },
                            text: {
                                primary: '#2A3547',
                                secondary: '#2A3547',
                            },
                            action: {
                                disabledBackground: 'rgba(73,82,88,0.12)',
                                disabled: '#333333',
                                hoverOpacity: 0.02,
                                hover: '#f6f9fc',
                            },
                            divider: '#e5eaef',
                        },
                        typography: theme.baseMode.typography as TypographyOptions,
                        shadows: theme.baseMode.shadows as Shadows,
                        shape: {
                            borderRadius: theme.baseMode.shape.borderRadius,
                        },
                    })}
                >
                    <CssBaseline />
                    {children}
                    <CustomizedSnackbar
                        open={toastr.data.open}
                        type={toastr.data.type}
                        message={toastr.data.message}
                        setOpentate={toastr.setState}
                    />
                </ThemeProvider>
            </NextAppDirEmotionCacheProvider>
        </>
    );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ overflow: 'hidden' }} className={inter.className}>
                <Providers>
                    <MyApp>{children}</MyApp>
                </Providers>
            </body>
        </html>
    );
}
