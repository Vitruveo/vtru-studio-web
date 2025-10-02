'use client';
import { Box, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

function LetsView() {
    return (
        <Grid
            height="70vh"
            alignContent="center"
            justifyContent="center"
            display="grid"
            minWidth={{ xl: '400px', lg: '400px', sm: '500px' }}
        >
            <Box
                textAlign="center"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Typography marginTop={5} fontSize="1.2rem" mb={1}>
                    Your gateway to sustainable income through digital art
                </Typography>

                <Typography marginTop={3} fontSize="1.2rem" mb={1}>
                    Simple and easy for you to upload, standardize and consign your artwork so it reaches a wider
                    audience
                </Typography>

                <Typography marginTop={3} marginBottom={3} fontSize="1.2rem" mb={1}>
                    Your journey begins here
                </Typography>
                <Box marginTop={3}>
                    <Link href={'/login'} passHref>
                        <Button
                            style={{ width: 200, height: 50, fontSize: '1.2rem', fontWeight: 700 }}
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Grid>
    );
}

export default LetsView;
