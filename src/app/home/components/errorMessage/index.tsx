import { Box, Typography } from '@mui/material';

interface ErrorMessageProps {
    message: string;
}
export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#FA896B',
                margin: '10px 0',
                padding: 1,
            }}
        >
            <Typography variant="h6" fontWeight="normal" color="white" sx={{ whiteSpace: 'pre-wrap' }}>
                {message}
            </Typography>
        </Box>
    );
}
