import { Box } from '@mui/material';
import { WidgetProps } from '@rjsf/utils';
import { FocusEvent, useRef } from 'react';

const convertRGBToHex = (rgb: number[]) => {
    return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
};

const convertHexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

export const CustomColorWidget = (props: WidgetProps) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    const debouncedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            props.onChange(value);
        }, 300);
    };

    const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        props.onFocus(props.id, e.target.value);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        props.onBlur(props.id, e.target.value);
    };

    return (
        <Box width="100%">
            <input
                onBlur={onBlur}
                onFocus={onFocus}
                style={{ width: '100%' }}
                onChange={debouncedChange}
                value={Array.isArray(props.value) ? convertRGBToHex(props.value) : props.value}
                type="color"
            />
        </Box>
    );
};
