import { Button, Stack, Typography } from '@mui/material';
import { EXPLORER_URL } from '@/constants/explorer';

interface Props {
    data: {
        value: string;
        symbol: string;
        disabled: boolean;
        isConnected: boolean;
        address: `0x${string}` | undefined;
        vaultTransactionHash: string | null;
    };
    actions: {
        onClaim: () => void;
        onConnect: () => void;
    };
}

export const ClaimComponent = ({ data, actions }: Props) => {
    const { value, symbol, disabled, isConnected, address, vaultTransactionHash } = data;
    const { onClaim, onConnect } = actions;
    return (
        <Stack direction="row" gap={1} alignItems="center">
            {vaultTransactionHash ? (
                <a href={`${EXPLORER_URL}/tx/${vaultTransactionHash}`} target="_blank" rel="noreferrer">
                    {value} <strong>{symbol}</strong>
                </a>
            ) : (
                <Typography>
                    {value} <strong>{symbol}</strong>
                </Typography>
            )}
            <Button size="small" variant="contained" disabled={disabled} onClick={onClaim}>
                Claim
            </Button>
            {isConnected && address && (
                <Typography>
                    {address.slice(0, 6)}...{address.slice(-4)}
                </Typography>
            )}

            {!isConnected && (
                <Button size="small" variant="contained" onClick={onConnect}>
                    Connect
                </Button>
            )}
        </Stack>
    );
};
