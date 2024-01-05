'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack } from '@mui/material';

export function FooterForm({
    submitText,
    children,
    submitDisabled,
    backPathRouter,
    backOnclick,
}: {
    submitText?: string;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    backPathRouter?: string;
    backOnclick?: () => void;
    saveOnClick?: () => void;
}) {
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
                {children}
            </Box>
            <Box margin="auto 0" display="flex" flexDirection="column" flexGrow={1} position="relative" bgcolor="#fff">
                <Stack direction="row" spacing={4} flexDirection="row-reverse">
                    <Button
                        disabled={submitDisabled}
                        type="submit"
                        style={{ width: 120, marginLeft: '10px' }}
                        color="primary"
                        variant="contained"
                    >
                        {submitText || 'Save'}
                    </Button>
                    <Button style={{ width: 120 }} variant="outlined" color="error" onClick={handleBackClick}>
                        Back
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
