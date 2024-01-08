'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import webSocketService from '@/services/websocket';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/home/components/container/PageContainer';

import { Button, Container } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';
import { useSelector } from '@/store/hooks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';

export default function Home() {
    const dispatch = useDispatch();
    const isCompletedProfile = useSelector((state) => state.consignArtwork.isCompletedProfile);
    const customizer = useSelector((state) => state.customizer);

    return (
        <Container
            sx={{
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <PageContainer title="Home" description="this is Dashboard">
                <Breadcrumb title="Home" />
                <Box maxWidth={800} padding={3} mt={3}>
                    <Box>
                        <Typography variant="h2" display="inline">
                            Welcome to <VtruTitle vtru="h3" studio="h2" copyRem="3rem" />
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            Congrats on being selected as a Vitruveo Genesis Artist 🎉
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            Vitruveo is transforming Web3 art, and that means all-new software like this “Alpha” version
                            of vtruStudio. Alpha means the software is not fully ready and you’re helping us test it so
                            it can be improved.
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            The software currently has two features you can access with the buttons below:
                        </Typography>
                    </Box>
                    <Grid marginTop={3} container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Link href="/home/myProfile" passHref>
                                <Button variant="contained" fullWidth>
                                    My Profile
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Link href={isCompletedProfile ? '/home/consignArtwork' : '/home/myProfile'} passHref>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(true))
                                    }
                                    fullWidth
                                >
                                    Consign Artwork
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </Container>
    );
}
