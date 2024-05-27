import { Button, Stack, Typography } from '@mui/material';

interface Props {
    data: {
        value: string;
        symbol: string;
        disabled: boolean;
        isConnected: boolean;
    };
    actions: {
        onClaim: () => void;
        onConnect: () => void;
    };
}

export const ClaimComponent = ({ data, actions }: Props) => {
    const { value, symbol, disabled, isConnected } = data;
    const { onClaim, onConnect } = actions;
    return (
        <Stack direction="row" gap={1} alignItems="center">
            <Typography>
                {value} <strong>{symbol}</strong>
            </Typography>
            <Button size="small" variant="contained" disabled={disabled} onClick={onClaim}>
                Claim
            </Button>

            {!isConnected && (
                <Button size="small" variant="contained" onClick={onConnect}>
                    Connect
                </Button>
            )}
        </Stack>
    );
};
