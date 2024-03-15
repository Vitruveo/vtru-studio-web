'use client';
import React from 'react';
import Image from 'next/image';
import { Grid, Box } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';

export default function AuthLogo() {
    return (
        <Grid
            item
            xs={12}
            sm={12}
            lg={7}
            xl={8}
            sx={{
                position: 'relative',
                '&:before': {
                    content: '""',
                    background: '#F2ECF9',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    opacity: '0.3',
                },
            }}
        >
            <Box position="relative">
                <Box
                    my={2}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    sx={{
                        display: {
                            xs: 'flex',
                            lg: 'none',
                        },
                    }}
                >
                    <Image
                        src={'/images/logos/studiologo.png'}
                        alt="bg"
                        width={200}
                        height={70}
                        style={{
                            maxWidth: '300px',
                            maxHeight: '300px',
                        }}
                    />
                </Box>
                <Box
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height={'calc(100vh - 75px)'}
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'flex',
                        },
                    }}
                >
                    <Box>
                        <Image
                            src={'/images/logos/studiologo.png'}
                            alt="bg"
                            width={700}
                            height={500}
                            style={{
                                width: '100%',
                                maxWidth: '700px',
                                maxHeight: '100px',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}
