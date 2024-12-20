import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
    message?: string;
    size?: number;
    hasprogress?: boolean;
}

export default function LoadingOverlay({ message, size = 150, hasprogress = true }: LoadingOverlayProps) {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(0, 0, 0, 0.5)"
            zIndex={9999}
        >
            {message && (
                <Typography variant="h2" color="white">
                    {message}
                </Typography>
            )}
            {hasprogress && <CircularProgress color="primary" size={size} />}
        </Box>
    );
}
