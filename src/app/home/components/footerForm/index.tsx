'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { StepStatus } from '@/features/consignArtwork/types';

export interface FooterFormProps {
    submitText?: string;
    progress?: number;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    backPathRouter: string;
    stepStatus?: StepStatus;
    stepNumber?: number;
    backOnclick?: () => void;
    saveOnClick?: () => void;
}

export function FooterForm({
    submitText,
    children,
    submitDisabled,
    backPathRouter,
    stepStatus,
    stepNumber,
    backOnclick,
}: FooterFormProps) {
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
            <Box marginBottom={5} minHeight={stepStatus ? '77vh' : '80vh'} flexGrow={1}>
                <Container
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    {children}
                </Container>
            </Box>

            {stepStatus && stepStatus === 'completed' ? (
                <Box
                    width="100%"
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    height={30}
                    bgcolor="#B6D7A8"
                >
                    <Typography variant="h6" fontWeight="normal">
                        This step has been{' '}
                        <Typography display="inline" fontWeight={600}>
                            Completed
                        </Typography>
                    </Typography>
                </Box>
            ) : (
                <Box
                    width="100%"
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    height={30}
                    bgcolor="#F6B26B"
                >
                    <Typography variant="h6" fontWeight="normal">
                        This step is{' '}
                        <Typography display="inline" fontWeight={600}>
                            In Progress
                        </Typography>{' '}
                        and is not yet complete
                    </Typography>
                </Box>
            )}

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
                {stepNumber ? (
                    <Box marginInline={4} display="flex" alignItems="center" justifyContent="space-between">
                        {stepNumber && (
                            <Typography flexDirection="row" fontWeight="400" variant="h4">
                                Step {stepNumber} of 4
                            </Typography>
                        )}

                        <Stack direction="row" alignItems="center" spacing={4} flexDirection="row-reverse">
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
                                <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                    Back
                                </Typography>
                            </Link>
                        </Stack>
                    </Box>
                ) : (
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
                            <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                Back
                            </Typography>
                        </Link>
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
