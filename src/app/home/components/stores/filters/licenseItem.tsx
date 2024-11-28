import { formatCurrency } from '@/utils/formatCurrency';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormikContext } from 'formik';

interface FormValues {
    general: {
        licenses: {
            minPrice: number;
            maxPrice: number;
        };
    };
}

export const minPrice = 0;
export const maxPrice = 10000;
const Licenses = () => {
    const theme = useTheme();
    const { setFieldValue, values } = useFormikContext<FormValues>();
    const fieldNames = {
        minPrice: 'general.licenses.minPrice',
        maxPrice: 'general.licenses.maxPrice',
    };

    const onChange = (_event: Event | null, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) return;

        const [start, end] = newValue;

        setFieldValue(fieldNames.minPrice, start);
        setFieldValue(fieldNames.maxPrice, end);
    };

    return (
        <Box>
            <Typography variant="h6">Artwork Price</Typography>
            <Slider
                defaultValue={[minPrice, minPrice]}
                value={[values.general.licenses.minPrice, values.general.licenses.maxPrice]}
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
