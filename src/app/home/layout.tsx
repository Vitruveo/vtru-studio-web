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
import { addAllowList, findEmailInAllowList } from '@/features/allowList/requests';
import { userActionsCreators } from '@/features/user/slice';
import { useToastr } from '../hooks/useToastr';
import { AxiosError } from 'axios';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '30px',
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

const PageFooterWrapper = styled('div')(() => ({
    display: 'flex',
    overflowX: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

interface Props {
    children: React.ReactNode;
}

const isValidToken = (token: string) => {
    // Sua lógica de validação do token aqui
    return token !== null && token !== undefined && token !== '';
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const toast = useToastr();
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const customizer = useSelector((state) => state.customizer);
    const email = useSelector((state) => state.user.login.email);
    const canConsignArtwork = useSelector((state) => state.user.canConsignArtwork);

    useEffect(() => {
        if (!isValidToken(token)) {
            router.push('/login');
        }
    }, [token, router]);

    useEffect(() => {
        if (!canConsignArtwork) {
            router.push('/home')
        }
    }, [canConsignArtwork])

    useEffect(() => {
        if (!webSocketService.socket) {
            (async () => {
                dispatch(connectWebSocketThunk());
                dispatch(loginWebSocketThunk());
            })();
        }
    }, [webSocketService]);

    useEffect(() => {
        if (token && email) {
            (async () => {
                try {
                    // await findEmailInAllowList(email); // remove temporary
                    dispatch(userActionsCreators.setCanConsignArtwork(true));
                } catch (e) {
                    const error = e as AxiosError;
                    if (error.response?.status === 404) {
                        dispatch(userActionsCreators.setCanConsignArtwork(false));
                    } else {
                        toast.display({ type: 'error', message: 'Something went wrong! Try again later.' });
                    }
                }
            })();
        }
    }, [email]);

    const theme = useTheme();

    if (!isValidToken(token)) return <div />;

    return (
        <MainWrapper>
            <title>Dashboard</title>
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}
            {customizer.isHorizontal ? '' : <Sidebar />}
            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
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
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}
                {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
                {/* PageContent */}
                {customizer.isHorizontal ? <Navigation /> : ''}
                <Box
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* PageContent */}
                    {/* ------------------------------------------- */}

                    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                        {/* <Outlet /> */}
                        {children}
                        {/* <Index /> */}
                    </Box>

                    {/* ------------------------------------------- */}
                    {/* End Page */}
                    {/* ------------------------------------------- */}
                </Box>
            </PageFooterWrapper>
        </MainWrapper>
    );
}
