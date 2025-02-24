import { useState } from 'react';
import { Box, Typography, TextField, Button, FormHelperText, Chip, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';

interface FormValues {
    portfolio: {
        wallets: string[];
    };
}

const validateCryptoAddress = (address: string): boolean => {
    const patterns = [
        /^0x[a-fA-F0-9]{40}$/, // Ethereum, Binance Smart Chain, etc.
        /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/, // Bitcoin
        /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/, // Bitcoin Bech32
        /^[A-Za-z0-9]{42}$/, // Solana
    ];

    return patterns.some((pattern) => pattern.test(address));
};

export const handleFormatWallet = (addressF?: string) => {
    if (addressF && validateCryptoAddress(addressF)) {
        return `${addressF.substring(0, 6)}...${addressF.substring(addressF.length - 4)}`;
    }
    return addressF;
};

const Portfolio = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const theme = useTheme();
    const { values, setFieldValue } = useFormikContext<FormValues>();

    const value = values?.portfolio?.wallets ?? [];

    const handleChange = (newValues: string[]) => {
        const invalidWallets = newValues.filter((wallet) => !validateCryptoAddress(wallet));
        if (invalidWallets.length > 0) {
            setError(`Invalid address: ${invalidWallets.join(', ')}`);
            return;
        }

        setError(null);
        setFieldValue('portfolio.wallets', newValues);
    };

    const handleAddOption = () => {
        if (inputValue.trim() === '') {
            setError('Invalid input: Address cannot be empty.');
            return;
        }

        if (value.includes(inputValue)) {
            setError(`This address is already added: ${handleFormatWallet(inputValue)}`);
            return;
        }
        handleChange([...value, inputValue]);
        setInputValue('');
    };

    const handleRemoveOption = (itemToRemove: string) => {
        handleChange(value.filter((item) => item !== itemToRemove));
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Wallet address</Typography>
                <Box>
                    <Box display="flex" gap={1}>
                        <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} size="small" />

                        <Button variant="contained" color="primary" onClick={handleAddOption}>
                            Add
                        </Button>
                    </Box>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                    <Box maxHeight={150} overflow="auto" marginTop={1} display="flex" flexWrap="wrap" gap={1}>
                        {value.map((item) => (
                            <Chip
                                key={item}
                                label={handleFormatWallet(item)}
                                onDelete={() => handleRemoveOption(item)}
                                sx={{
                                    backgroundColor: theme.palette.action.selected,
                                    color: theme.palette.text.primary,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Portfolio;
