import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    loading: boolean;
    message: string;
}

const PublishStoreMessage = ({ loading, message }: Props) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#13DFAA' }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: '#EAD391',
                fontWeight: 'bold',
                padding: 1,
                marginBottom: 2,
                marginLeft: 2,
            }}
        >
            <Typography variant="h6" fontWeight="normal" color="GrayText">
                {message}
            </Typography>
        </Box>
    );
};

export default PublishStoreMessage;
