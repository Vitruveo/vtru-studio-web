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
import Image from 'next/image';

export default function Home() {
    const { language } = useI18n();
    const dispatch = useDispatch();

    const status = useSelector((state) => state.asset.status);

    const isCompletedProfile = useSelector((state) => state.consignArtwork.isCompletedProfile);
    const customizer = useSelector((state) => state.customizer);

    const texts = {
        title: language['studio.home.title'],
        welcome: language['studio.home.wellcome'],
        transform: language['studio.home.transforming'],
        software: language['studio.home.software'],
        consign: language['studio.home.consign'],
        myProfile: language['studio.home.myProfile'],
    } as { [key: string]: string };

    const isPublished = status === 'preview';

    return (
        <Container
            sx={{
                overflow: 'auto',
                maxHeight: '85vh',
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <PageContainer title={texts.title}>
                <Breadcrumb title={texts.title} />

                <Box maxWidth={800} padding={3} mt={3}>
                    <Box display="flex" flexWrap="wrap" rowGap={1} alignItems="center">
                        <Typography marginRight={1} fontSize="1.7rem" alignSelf="center">
                            {texts.welcome}
                        </Typography>

                        <Image
                            src={'/images/logos/studiologo.png'}
                            alt="bg"
                            width={140}
                            height={50}
                            style={{
                                paddingBlock: 1,
                                maxWidth: '300px',
                                maxHeight: '300px',
                                alignSelf: 'baseline',
                            }}
                        />
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
                            <Link
                                href={
                                    isCompletedProfile
                                        ? isPublished
                                            ? '/home/consignArtwork/consignmentStatus'
                                            : '/home/consignArtwork'
                                        : '/home/myProfile'
                                }
                                passHref
                            >
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
