'use client';

import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';

export default function VtruTitle({
    login,
    vtru = 'h2',
    studio = 'h1',
    copy = 'h1',
    copyRem = '2.5rem',
}: {
    login?: boolean;
    vtru?: Variant;
    studio?: Variant;
    copy?: Variant;
    copyRem?: string;
}) {
    const style = login ? { fontSize: '4em' } : {};
    return (
        <Typography display="inline">
            <Typography style={style} fontWeight="400" variant={vtru} display="inline">
                vtru
            </Typography>
            <Typography style={style} variant={studio} fontWeight="bold" display="inline">
                Studio
            </Typography>
            <Typography
                variant={copy}
                fontWeight="400"
                style={{ ...style, fontSize: login ? '6rem' : copyRem, fontFamily: 'Saira' }}
                color="primary"
                display="inline"
            >
                &alpha;
            </Typography>
        </Typography>
    );
}
