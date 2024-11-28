import { useI18n } from '@/app/hooks/useI18n';
import { useSelector } from '@/store/hooks';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';

interface Props {
    name: string;
    onClick: (color: string) => void;
    afterPrecisionChange?: (value: number) => void;
}

export const minPrecision = 0;
export const maxPrecision = 100;

export function InputColor({ name, onClick, afterPrecisionChange }: Props) {
    const theme = useTheme();
    const { language } = useI18n();
    const inputRef = useRef<HTMLInputElement>(null);
    // TODO: change to dinamic values
    const defaultPrecisionValue = 0.7;
    const reseted = 1;

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
                        key={reseted}
                        defaultValue={defaultPrecisionValue * 100}
                        onChange={onChange}
                        min={minPrecision}
                        max={maxPrecision}
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
                    }}
                >
                    Add
                </Button>
            </Box>
        </Stack>
    );
}
