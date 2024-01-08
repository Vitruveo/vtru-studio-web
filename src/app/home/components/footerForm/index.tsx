'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useSelector } from '@/store/hooks';

export interface FooterFormProps {
    submitText?: string;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    backPathRouter: string;
    backOnclick?: () => void;
    saveOnClick?: () => void;
}

export function FooterForm({ submitText, children, submitDisabled, backPathRouter, backOnclick }: FooterFormProps) {
    const theme = useTheme();
    const customizer = useSelector((state) => state.customizer);
    const router = useRouter();

    const handleBackClick = () => {
        if (backOnclick) backOnclick();
        if (backPathRouter) {
            router.push(backPathRouter);
        } else {
            router.back();
        }
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box marginBottom={5} minHeight="80vh" flexGrow={1}>
                <Container
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    {children}
                </Container>
            </Box>
            <Box
                height="8.2vh"
                justifyContent="center"
                boxSizing="border-box"
                display="flex"
                flexDirection="column"
                flexGrow={1}
                position="relative"
                bgcolor={'#EFEFEF'}
            >
                <Stack marginInline={4} direction="row" alignItems="center" spacing={4} flexDirection="row-reverse">
                    <Button
                        disabled={submitDisabled}
                        type="submit"
                        style={{ width: 120, marginLeft: '20px' }}
                        color="primary"
                        variant="contained"
                    >
                        {submitText || 'Save'}
                    </Button>

                    <Link href={backPathRouter} className="hover-text-primary">
                        <Typography variant="subtitle2" color="textPrimary" className="text-hover">
                            Back
                        </Typography>
                    </Link>

                    {/* <Link >
                        <Button variant="contained" fullWidth>
                            Back
                        </Button>
                    </Link> */}
                    {/* <Button style={{ width: 120 }} variant="outlined" color="error" onClick={handleBackClick}>
                        Back
                    </Button> */}
                </Stack>
            </Box>
        </Box>
    );
}
