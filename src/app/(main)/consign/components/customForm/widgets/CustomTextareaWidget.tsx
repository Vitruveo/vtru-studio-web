import { TextareaAutosize, useTheme } from '@mui/material';
import { WidgetProps } from '@rjsf/utils';
import { FocusEvent } from 'react';

export const CustomTextareaWidget = (props: WidgetProps) => {
    const theme = useTheme();

    const onBlur = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
        props.onBlur(props.id, e.target.value);
    };

    const onFocus = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
        props.onFocus(props.id, e.target.value);
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.target.value);
    };

    return (
        <TextareaAutosize
            minRows={4}
            color="primary"
            id={props.id}
            value={props.value}
            required={props.required}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            style={{
                backgroundColor: theme.palette.background.paper,
                width: '100%',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(1),
                fontSize: theme.typography.fontSize,
                fontFamily: theme.typography.fontFamily,
                ...props.style,
            }}
        />
    );
};
