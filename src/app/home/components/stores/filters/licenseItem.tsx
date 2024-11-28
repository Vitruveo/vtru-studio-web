import { formatCurrency } from '@/utils/formatCurrency';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { useState } from 'react';

export const minPrice = 0;
export const maxPrice = 10000;
const Licenses = () => {
    const theme = useTheme();
    const { setFieldValue } = useFormikContext();
    const fieldNames = {
        minPrice: 'general.licenses.minPrice',
        maxPrice: 'general.licenses.maxPrice',
    };
    // TODO: add redux to datas dinamically
    const [price, setPrice] = useState({ min: 0, max: 10000 });
    const max = 100000;
    const reseted = 1;

    const onChange = (_event: Event | null, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) return;

        const [start, end] = newValue;

        setPrice({
            min: start,
            max: end === max ? max : end,
        });
        setFieldValue(fieldNames.minPrice, start);
        setFieldValue(fieldNames.maxPrice, end === max ? max : end);
    };

    return (
        <Box>
            <Typography variant="h6">Artwork Price</Typography>
            <Slider
                key={reseted}
                defaultValue={[minPrice, minPrice]}
                value={[price.min, price.max === max ? minPrice : price.max]}
                step={10}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                sx={{
                    color: theme.palette.primary.main,
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                    },
                }}
            />
            <Stack direction="row" justifyContent="space-between" p={0}>
                <Typography fontSize={11}>{formatCurrency({ value: minPrice })}</Typography>
                <Typography fontSize={11}>{formatCurrency({ value: maxPrice })}</Typography>
            </Stack>
        </Box>
    );
};

export default Licenses;
