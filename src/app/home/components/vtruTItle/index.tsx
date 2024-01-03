'use client';

import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { Saira } from 'next/font/google';

const saira = Saira({ weight: '400', subsets: ['latin'] });

export default function VtruTitle({
    login,
    vtru = 'h2',
    studio = 'h1',
    copy = 'h1',
    vtruRem = '',
    studioRem = '',
    copyRem = '2.5rem',
}: {
    login?: boolean;
    vtru?: Variant;
    studio?: Variant;
    copy?: Variant;
    vtruRem?: string;
    studioRem?: string;
    copyRem?: string;
}) {
    return (
        <Typography display="inline">
            <Typography
                style={{ fontSize: login ? '3em' : vtruRem }}
                fontWeight="normal"
                variant={vtru}
                display="inline"
            >
                VTRU
            </Typography>
            <Typography
                style={{ fontSize: login ? '4em' : studioRem }}
                variant={studio}
                fontWeight="bold"
                display="inline"
            >
                Studio
            </Typography>
            <Typography
                variant={copy}
                fontWeight="400"
                style={{ fontSize: login ? '6rem' : copyRem, fontFamily: saira.style.fontFamily }}
                color="primary"
                display="inline"
            >
                &alpha;
            </Typography>
        </Typography>
    );
}
