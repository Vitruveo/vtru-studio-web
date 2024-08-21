import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
    title?: string;
    showProgress?: boolean;
}
export default function LoadingOverlay({ title, showProgress = false }: LoadingOverlayProps) {
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
            {title && (
                <Typography variant="h2" color="white">
                    {title}
                </Typography>
            )}
            {showProgress && <CircularProgress color="primary" size={150} />}
        </Box>
    );
}
