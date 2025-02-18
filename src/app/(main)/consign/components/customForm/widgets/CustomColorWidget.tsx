import { convertRGBToHex } from '@/utils/convertColors';
import { Box } from '@mui/material';
import { WidgetProps } from '@rjsf/utils';
import { FocusEvent, useRef } from 'react';
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
