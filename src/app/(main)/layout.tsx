'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Header from './layout/vertical/header/Header';
import Sidebar from './layout/vertical/sidebar/Sidebar';
import Navigation from './layout/horizontal/navbar/Navigation';
import HorizontalHeader from './layout/horizontal/header/Header';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import webSocketService from '@/services/websocket';
import { connectWebSocketThunk, loginWebSocketThunk } from '@/features/ws/thunks';
import { userSelector } from '@/features/user';
import LoadingOverlay from './components/loadingOverlay';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageFooterWrapper = styled('div')(() => ({
    display: 'flex',
    overflowX: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

const isValidToken = (token: string) => {
    return token !== null && token !== undefined && token !== '';
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const isLoading = useSelector((state) => state.asset.isLoading);
    const isSubmittingFiles = useSelector((state) => state.stores.isSubmittingFiles);
    const customizer = useSelector((state) => state.customizer);

    const { generalVault } = useSelector(userSelector(['generalVault']));

    useEffect(() => {
        if (!isValidToken(token)) {
            router.push('/login');
        }
    }, [token, router]);

    useEffect(() => {
        if (!webSocketService.socket) {
            (async () => {
                dispatch(connectWebSocketThunk());
                dispatch(loginWebSocketThunk());
            })();
        }
    }, [webSocketService]);

    useEffect(() => {
        if (generalVault) {
            router.push('/profile');
        }
    }, [generalVault]);

    // useEffect(() => {
    //     if (token && email) {
    //         (async () => {
    //             try {
    //                 // await findEmailInAllowList(email); // remove temporary
    //                 dispatch(userActionsCreators.setCanConsignArtwork(true));
    //             } catch (e) {
    //                 const error = e as AxiosError;
    //                 if (error.response?.status === 404) {
    //                     dispatch(userActionsCreators.setCanConsignArtwork(false));
    //                 } else {
    //                     toast.display({ type: 'error', message: 'Something went wrong! Try again later.' });
    //                 }
    //             }
    //         })();
    //     }
    // }, [email]);

    const theme = useTheme();

    if (!isValidToken(token)) return <div />;

    return (
        <MainWrapper>
            {(isLoading || isSubmittingFiles) && <LoadingOverlay hasprogress={false} />}
            <title>Dashboard</title>

            {customizer.isHorizontal ? '' : <Sidebar />}

            <PageFooterWrapper
                className="page-wrapper"
                sx={{
                    ...(customizer.isCollapse && {
                        [theme.breakpoints.up('lg')]: {
                            ml: `${customizer.MiniSidebarWidth}px`,
                        },
                    }),
                }}
            >
                {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}

                {customizer.isHorizontal ? <Navigation /> : ''}
                <Box
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
                </Box>
            </PageFooterWrapper>
        </MainWrapper>
    );
}
