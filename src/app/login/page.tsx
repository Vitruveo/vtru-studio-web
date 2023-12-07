'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/home/components/container/PageContainer';

import AuthLogo from '@/app/login/components/AuthLogo';
import AuthLogin from '@/app/login/components/authLogin/container';

export default function Login() {
  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <AuthLogo />
        <Grid item xs={12} sm={12} lg={5} xl={4} display="flex" justifyContent="center" alignItems="center">
          <Box flex={1} p={{ xs: 4, sm: 4, md: 10, lg: 10, xl: 10 }}>
            <AuthLogin />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
