'use client';

import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';

export default function VtruTitle({
    login,
    vtru = 'h2',
    studio = 'h1',
    copy = 'h1',
}: {
    login?: boolean;
    vtru?: Variant;
    studio?: Variant;
    copy?: Variant;
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
            <Typography style={style} color="primary" variant={copy} display="inline">
                &copy;
            </Typography>
        </Typography>
    );
}
