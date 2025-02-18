import { useI18n } from '@/app/hooks/useI18n';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { useRef } from 'react';

interface Props {
    name: string;
    onClick: (color: string) => void;
    afterPrecisionChange?: (value: number) => void;
}

interface FormValues {
    context: {
        precision: number;
        colors: string[];
    };
}

export const minPrecision = 0;
export const maxPrecision = 100;
export function InputColor({ name, onClick, afterPrecisionChange }: Props) {
    const { values } = useFormikContext<FormValues>();
    const theme = useTheme();
    const { language } = useI18n();
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultPrecisionValue = 0.7;

    const handleAddColor = () => {
        if (inputRef.current) {
            onClick(inputRef.current.value);
        }
    };

    const onChange = (_event: Event, newValue: number | number[]) => {
        afterPrecisionChange?.((newValue as number) / 100);
    };

    return (
        <Stack gap={2}>
            <Box>
                <Typography>{language['search.assetFilter.context.title.colors.precision'] as string}</Typography>
                <Box px={1}>
                    <Slider
                        defaultValue={defaultPrecisionValue * 100}
                        value={values.context.precision * 100 || 0}
                        onChange={onChange}
                        min={minPrecision}
                        max={maxPrecision}
                        disabled={values.context.colors.length === 0}
                        step={10}
                        valueLabelDisplay="auto"
                        sx={{
                            color: theme.palette.primary.main,
                            '& .MuiSlider-valueLabel': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.common.white,
                            },
                        }}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontSize={11}>{minPrecision + '%'}</Typography>
                        <Typography fontSize={11}>{maxPrecision + '%'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="space-between">
                <input ref={inputRef} type="color" id={name} name={name} />
                <Button
                    onClick={handleAddColor}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Add
                </Button>
            </Box>
        </Stack>
    );
}
