'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/home/components/container/PageContainer';

import { Button } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';

export default function Home() {
    return (
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
                        Vitruveo is transforming Web3 art, and that means all-new software like this “Alpha” version of
                        vtruStudio. Alpha means the software is not fully ready and you’re helping us test it so it can
                        be improved.
                    </Typography>
                </Box>
                <Box marginTop={4}>
                    <Typography variant="h4" color="primary">
                        The software currently has two features you can access with the buttons below:
                    </Typography>
                </Box>
                <Grid marginTop={3} container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Link href="/home/contents/profile-settings" passHref>
                            <Button variant="contained" fullWidth>
                                My Profile
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Link href="/home/contents/wizard/consignArtwork" passHref>
                            <Button variant="contained" fullWidth>
                                Consign Artwork
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
