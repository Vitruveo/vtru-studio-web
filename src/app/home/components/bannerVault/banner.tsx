import { Box } from '@mui/material';

export default function BannerVault() {
    return (
        <Box
            sx={{
                backgroundColor: '#EAD391',
                fontWeight: 'bold',
                padding: 1,
            }}
        >
            If you are a new user, funds will be held in your Creator Vault for 5 days after a sale. After that you may
            Claim the funds from any wallet in your account.
        </Box>
    );
}
