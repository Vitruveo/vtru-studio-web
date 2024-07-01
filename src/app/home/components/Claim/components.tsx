import { Button, CircularProgress, Stack, Typography, Popover } from '@mui/material';
import { EXPLORER_URL } from '@/constants/explorer';
import { useState } from 'react';

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
        onDisconnect: () => void;
    };
}

export const ClaimComponent = ({ data, actions }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const { value, symbol, disabled, isConnected, address, vaultTransactionHash, loading, isBlocked } = data;
    const { onClaim, onConnect, onDisconnect } = actions;
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Stack direction="row" gap={1} alignItems="center">
            {isConnected && isBlocked && <Typography color="red">Account blocked — fund claims disabled</Typography>}
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
                <>
                    <Button onClick={handleClick}>
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </Button>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Button size="small" variant="contained" onClick={onDisconnect}>
                            Disconnect
                        </Button>
                    </Popover>
                </>
            )}

            {!isConnected && (
                <Button size="small" variant="contained" onClick={onConnect}>
                    Connect
                </Button>
            )}
        </Stack>
    );
};
