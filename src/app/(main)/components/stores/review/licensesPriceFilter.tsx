import { formatCurrency } from '@/utils/formatCurrency';
import { Box, Typography } from '@mui/material';

interface LicensesPriceFilterProps {
    content: { [key: string]: string };
}

export const LicensesPriceFilter = ({ content }: LicensesPriceFilterProps) => {
    if (!content.enabled) return null;
    return (
        <Box>
            {Object.entries(content)
                .filter(([key, _value]) => key !== 'enabled')
                .map(([key, value]) => (
                    <Box key={key} alignItems="center">
                        <Typography variant="body1">
                            {key === 'minPrice' ? 'Minimum price' : 'Maximum price'}{' '}
                            {formatCurrency({ value: Number(value) })}
                        </Typography>
                    </Box>
                ))}
        </Box>
    );
};
