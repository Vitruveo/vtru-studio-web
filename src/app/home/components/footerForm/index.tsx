'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack } from '@mui/material';

export function FooterForm({
    submitText,
    submitDisabled,
    backPathRouter,
    backOnclick,
}: {
    submitText?: string;
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
        <Box
            display="flex"
            marginTop="auto"
            flexDirection="column"
            flexGrow={1}
            position="relative"
            bgcolor="#fff"
            my={4}
        >
            <Stack direction="row" spacing={2} flexDirection="row-reverse">
                <Button
                    disabled={submitDisabled}
                    type="submit"
                    style={{ width: 120 }}
                    color="primary"
                    variant="contained"
                >
                    {submitText || 'Save'}
                </Button>
                <Button onClick={handleBackClick} variant="text">
                    Back
                </Button>
            </Stack>
        </Box>
    );
}
