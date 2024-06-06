import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { EXPLORER_URL } from '@/constants/explorer';

interface Props {
    data: {
        value: string;
        symbol: string;
        disabled: boolean;
        isConnected: boolean;
        address: `0x${string}` | undefined;
        vaultTransactionHash: string | null;
        loading: boolean;
        isBlocked: boolean;
    };
    actions: {
        onClaim: () => void;
        onConnect: () => void;
    };
}

export const ClaimComponent = ({ data, actions }: Props) => {
    const { value, symbol, disabled, isConnected, address, vaultTransactionHash, loading, isBlocked } = data;
    const { onClaim, onConnect } = actions;
    return (
        <Stack direction="row" gap={1} alignItems="center">
            {isConnected && isBlocked && <Typography color="red">Your funds are on temporary hold</Typography>}
            {vaultTransactionHash ? (
                <a
                    href={`${EXPLORER_URL}/tx/${vaultTransactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'black' }}
                >
                    {value} <strong>{symbol}</strong>
                </a>
            ) : (
                <Typography>
                    {value} <strong>{symbol}</strong>
                </Typography>
            )}
            <Button size="small" variant="contained" disabled={disabled} onClick={onClaim}>
                Claim {loading && <CircularProgress size={16} style={{ marginLeft: 10 }} />}
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
