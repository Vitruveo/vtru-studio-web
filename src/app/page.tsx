'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(main)/components/container/PageContainer';

import AuthLogo from '@/app/login/components/AuthLogo';
import LetsVitru from '@/app/letsVitruveo/container';

export default function LetsVitruveo() {
    return (
        <PageContainer title="home" description="Lets Vitruveo">
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                <AuthLogo />
                <Grid item xs={12} sm={12} lg={5} xl={4} display="flex" justifyContent="center" alignItems="center">
                    <Box p={4}>
                        <LetsVitru />
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
