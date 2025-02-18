import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    loading: boolean;
    message: string;
    type: 'warning' | 'error';
}

const PublishStoreMessage = ({ loading, message, type }: Props) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#FF0066' }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: type === 'warning' ? '#EAD391' : '#FA896B',
                fontWeight: 'bold',
                padding: 1,
                marginBottom: 2,
                marginLeft: 2,
            }}
        >
            <Typography variant="h6" fontWeight="normal" color={type === 'warning' ? 'GrayText' : 'white'}>
                {message}
            </Typography>
        </Box>
    );
};

export default PublishStoreMessage;
