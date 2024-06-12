import { AssetSliceState } from '@/features/asset/types';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import { IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

interface ConsignMessageProps {
    validateConsign: AssetSliceState['validateConsign'];
    message: string;
}

const ConsignMessage = ({ validateConsign, message }: ConsignMessageProps) => {
    const { status } = validateConsign;
    const [copyText, setCopyText] = useState<string>('Copy');
    const handleCopyErrorMessage = () => {
        navigator.clipboard.writeText(message || '').then(() => {
            setCopyText('Copied');
            setTimeout(() => {
                setCopyText('Copy');
            }, 5000);
        });
    };

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#13DFAA' }} />
            </Box>
        );
    }
    if (status === 'success') {
        return (
            <Box
                sx={{
                    backgroundColor: '#EAD391',
                    fontWeight: 'bold',
                    padding: 1,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h6" fontWeight="normal" color="GrayText">
                    {message}
                </Typography>
            </Box>
        );
    }
    if (status === 'error') {
        return (
            <Box
                sx={{
                    backgroundColor: '#FA896B',
                    fontWeight: 'bold',
                    padding: 1,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h6" fontWeight="normal" color="white">
                    {validateConsign.message}
                    <Tooltip title={copyText} placement="top">
                        <IconCopy onClick={handleCopyErrorMessage} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Typography>
            </Box>
        );
    }
};

export default ConsignMessage;
