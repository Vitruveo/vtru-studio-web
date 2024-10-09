import { Button, CircularProgress, Stack, Typography, Popover, Box, useMediaQuery, Theme } from '@mui/material';
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
        onConnect: () => void;
        onDisconnect: () => void;
        openStakModal: () => void;
    };
}

export const ClaimComponent = ({ data, actions }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const { value, symbol, disabled, isConnected, address, vaultTransactionHash, loading, isBlocked } = data;
    const { onConnect, onDisconnect, openStakModal } = actions;
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Stack direction={smUp ? 'row' : 'column'} gap={1} alignItems="center">
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
            <Box display={'flex'} gap={1}>
                <Button size="small" variant="contained" disabled={disabled} onClick={openStakModal}>
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
                    <Button
                        sx={{
                            background: 'linear-gradient(to right, #FF0066, #9966FF)',
                            color: '#fff',
                            '&:hover': {
                                background: 'linear-gradient(to right, #cc0052, #7a52cc)',
                            },
                        }}
                        size="small"
                        variant="contained"
                        onClick={onConnect}
                    >
                        Connect
                    </Button>
                )}
            </Box>
        </Stack>
    );
};
