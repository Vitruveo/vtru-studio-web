'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

export default function DoneConsign() {
    const customizer = useSelector((state) => state.customizer);

    return (
        <Container
            sx={{
                overflow: 'auto',
                maxHeight: '85vh',
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <ul>
                <li>Signing media files using C2PA standard </li>
                <li>Uploading media files to IPFS decentralized storage</li>
                <li>Publishing metadata to IPFS decentralized storage</li>
                <li>Consigning artwork to Vitruveo blockchain</li>
                <li>Generating artwork listing</li>
                <li>🎉 Your artwork is ready! View</li>
            </ul>
        </Container>
    );
}
