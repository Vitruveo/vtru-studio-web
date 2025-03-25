import { formatCurrency } from '@/utils/formatCurrency';
import { Box, Checkbox, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

interface FormValues {
    general: {
        licenses: {
            minPrice: number;
            maxPrice: number;
            enabled: boolean;
        };
    };
}

export const minPrice = 0;
export const maxPrice = 10_000;
const Licenses = () => {
    const theme = useTheme();
    const { setFieldValue, values } = useFormikContext<FormValues>();
    const fieldNames = {
        minPrice: 'general.licenses.minPrice',
        maxPrice: 'general.licenses.maxPrice',
        enabled: 'general.licenses.enabled',
    };

    useEffect(() => {
        if (!values.general.licenses.enabled) {
            setFieldValue(fieldNames.minPrice, minPrice);
            setFieldValue(fieldNames.maxPrice, minPrice);
        } else if (values.general.licenses.minPrice === minPrice && values.general.licenses.maxPrice === minPrice) {
            setFieldValue(fieldNames.minPrice, minPrice);
            setFieldValue(fieldNames.maxPrice, maxPrice);
        }
    }, [values.general.licenses.enabled]);

    const onChange = (_event: Event | null, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) return;

        const [start, end] = newValue;

        setFieldValue(fieldNames.minPrice, start);
        setFieldValue(fieldNames.maxPrice, end);
    };

    return (
        <Box>
            <Typography variant="h6">Artwork Price</Typography>
            <Box display={'flex'} gap={2} alignItems={'center'}>
                <Slider
                    defaultValue={[minPrice, minPrice]}
                    value={[values.general.licenses.minPrice, values.general.licenses.maxPrice]}
                    step={10}
                    onChange={onChange}
                    valueLabelDisplay="auto"
                    disabled={!values.general.licenses.enabled}
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
                <Checkbox
                    checked={values.general.licenses.enabled}
                    onChange={() => setFieldValue(fieldNames.enabled, !values.general.licenses.enabled)}
                />
            </Box>

            <Stack direction="row" justifyContent="space-between" p={0}>
                <Typography fontSize={11}>{formatCurrency({ value: minPrice })}</Typography>
                <Typography fontSize={11}>{formatCurrency({ value: maxPrice })}</Typography>
            </Stack>
        </Box>
    );
};

export default Licenses;
