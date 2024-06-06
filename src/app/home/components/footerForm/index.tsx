'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Theme, Typography, useTheme } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { StepStatus } from '@/features/consignArtwork/types';
import { useI18n } from '@/app/hooks/useI18n';

export interface FooterFormProps {
    maxHeight?: string;
    submitText?: string;
    progress?: number;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    backPathRouter?: string;
    stepStatus?: StepStatus;
    stepNumber?: number;
    backOnclick?: () => void;
    saveOnClick?: () => void;
    secondaryText?: string;
    hasBackButton?: boolean;
    hasSubmitButton?: boolean;
    display?: boolean;
}

export function FooterForm({
    maxHeight,
    submitText,
    children,
    submitDisabled,
    backPathRouter,
    stepStatus,
    stepNumber,
    backOnclick,
    secondaryText,
    hasBackButton = true,
    hasSubmitButton,
    display = true,
}: FooterFormProps) {
    const theme = useTheme();

    const customizer = useSelector((state) => state.customizer);
    const router = useRouter();

    const { language } = useI18n();

    const texts = {
        thisStep: language['studio.footer.thisStep'],
        completed: language['studio.footer.completed'],
        inProgress: language['studio.footer.inProgress'],
        notYet: language['studio.footer.notYet'],
        step: language['studio.footer.step'],
        of: language['studio.footer.of'],
        save: language['studio.footer.save'],
        back: language['studio.footer.back'],
    } as { [key: string]: string };

    const handleBackClick = () => {
        if (backOnclick) {
            backOnclick();
        } else {
            if (backPathRouter) {
                router.push(backPathRouter);
            } else {
                router.back();
            }
        }
    };

    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    return (
        <Box position="relative" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Container
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                        height:
                            maxHeight ||
                            (lgUp
                                ? `calc(100vh - ${stepStatus ? '170px' : '150px'})`
                                : `calc(100vh - ${stepStatus ? '160px' : '140px'})`),
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {children}
                </Container>
            </Box>

            <Stack marginTop="auto" position={lgUp ? 'sticky' : 'fixed'} bottom={0} right={0} width="100%">
                {stepStatus && stepStatus === 'completed' && (
                    <Box
                        height={25}
                        width="100%"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        padding={1}
                        bgcolor="#B6D7A8"
                    >
                        <Typography textAlign="center" fontSize="0.9rem" fontWeight="normal">
                            {texts.thisStep}{' '}
                            <Typography fontSize="0.9rem" display="inline" fontWeight={600}>
                                {texts.completed}
                            </Typography>
                        </Typography>
                    </Box>
                )}
                {stepStatus && stepStatus !== 'completed' && (
                    <Box
                        height={25}
                        width="100%"
                        textAlign="center"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        padding={0.5}
                        bgcolor="#F6B26B"
                    >
                        <Typography fontSize="0.9rem" fontWeight="normal">
                            {texts.thisStep}{' '}
                            <Typography fontSize="0.9rem" display="inline" fontWeight={600}>
                                {texts.inProgress}
                            </Typography>{' '}
                        </Typography>
                    </Box>
                )}

                <Box
                    justifyContent="center"
                    boxSizing="border-box"
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    height={80}
                    bgcolor={'#EFEFEF'}
                >
                    {stepNumber ? (
                        <Box marginInline={4} display="flex" alignItems="center" justifyContent="space-between">
                            {stepNumber && (
                                <Typography flexDirection="row" fontWeight="400" fontSize="1.1rem">
                                    {texts.step} {stepNumber} {texts.of} 6
                                </Typography>
                            )}

                            <Stack direction="row" alignItems="center" spacing={4} flexDirection="row-reverse">
                                <Button
                                    size="large"
                                    disabled={submitDisabled}
                                    type="submit"
                                    style={{ marginLeft: '20px', whiteSpace: 'nowrap', minWidth: 120 }}
                                    color="primary"
                                    variant="contained"
                                    sx={!display ? { display: 'none' } : {}}
                                >
                                    {submitText || 'Save'}
                                </Button>
                                {hasBackButton && (
                                    <Button
                                        size="large"
                                        onClick={!backPathRouter ? handleBackClick : undefined}
                                        variant="text"
                                    >
                                        <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                            {texts.back}
                                        </Typography>
                                    </Button>
                                )}
                            </Stack>
                        </Box>
                    ) : (
                        <Stack
                            marginInline={4}
                            direction="row"
                            alignItems="center"
                            spacing={4}
                            flexDirection="row-reverse"
                        >
                            {hasSubmitButton && (
                                <Button
                                    size="large"
                                    disabled={submitDisabled}
                                    type="submit"
                                    style={{ minWidth: 120, marginLeft: '20px' }}
                                    color="primary"
                                    variant="contained"
                                >
                                    {submitText || texts.save}
                                </Button>
                            )}

                            {hasBackButton && (
                                <Link href={backPathRouter || '/home'} className="hover-text-primary">
                                    <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                        {secondaryText || texts.back}
                                    </Typography>
                                </Link>
                            )}
                        </Stack>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}
