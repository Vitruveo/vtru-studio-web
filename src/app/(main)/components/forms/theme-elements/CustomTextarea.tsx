import { memo, useCallback } from 'react';
import { darken, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    outline: 'none',
    boxShadow: 'none',
    '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
    },
}));

export const CustomTextarea = memo(
    ({ value, minRows, handleChange }: { value?: string; minRows?: number; handleChange: (value: string) => void }) => {
        const debouncedChangeHandler = useCallback(
            debounce((event) => {
                handleChange(event.target.value);
            }, 300),
            [handleChange]
        );

        return <StyledTextarea defaultValue={value} minRows={minRows} onChange={debouncedChangeHandler} />;
    }
);
