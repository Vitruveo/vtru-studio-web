'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Divider, Stack } from '@mui/material';

export function FooterForm({
    backRouter = '',
    backOnclick,
    saveOnClick,
}: {
    backRouter?: string;
    backOnclick?: () => void;
    saveOnClick?: () => void;
}) {
    const router = useRouter();

    const handleBackClick = () => {
        if (backOnclick) backOnclick();
        if (backRouter) {
            router.push(backRouter);
        } else {
            router.back();
        }
    };

    return (
        <Box position="fixed" bottom={0} width="83vw" bgcolor="#fff" p={2} borderTop={1} borderColor="divider">
            <Stack direction="row" spacing={2} flexDirection="row-reverse">
                <Button onClick={saveOnClick} style={{ width: 120 }} color="primary" variant="contained">
                    Save
                </Button>
                <Button onClick={handleBackClick} variant="text">
                    Back
                </Button>
            </Stack>
        </Box>
    );
}
