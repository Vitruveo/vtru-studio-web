'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/home/components/container/PageContainer';

import { Button, Container } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';
import { useDispatch, useSelector } from '@/store/hooks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { useI18n } from '../hooks/useI18n';

export default function Home() {
    const { language } = useI18n();
    const dispatch = useDispatch();

    const isCompletedProfile = useSelector((state) => state.consignArtwork.isCompletedProfile);
    const customizer = useSelector((state) => state.customizer);

    const texts = {
        title: language['studio.home.title'],
        welcome: language['studio.home.wellcome'],
        congrats: language['studio.home.congrats'],
        transform: language['studio.home.transforming'],
        software: language['studio.home.software'],
        consign: language['studio.home.consign'],
        myProfile: language['studio.home.myProfile'],
    } as { [key: string]: string };

    return (
        <Container
            sx={{
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <PageContainer title={texts.title}>
                <Breadcrumb title={texts.title} />

                <Box maxWidth={800} padding={3} mt={3}>
                    <Box>
                        <Typography variant="h2" display="inline">
                            {texts.welcome} <VtruTitle vtru="h3" studio="h2" copyRem="3rem" />
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            {texts.congrats} 🎉
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            {texts.transform}
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" color="primary">
                            {texts.software}
                        </Typography>
                    </Box>
                    <Grid marginTop={3} container spacing={2}>
                        <Grid item xs={12} sm={6} md={3.5}>
                            <Link href="/home/myProfile" passHref>
                                <Button variant="contained" fullWidth>
                                    {texts.myProfile}
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3.5}>
                            <Link href={isCompletedProfile ? '/home/consignArtwork' : '/home/myProfile'} passHref>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(true))
                                    }
                                    fullWidth
                                >
                                    {texts.consign}
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </Container>
    );
}
