import React, { memo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import { debounce } from 'lodash';

const CustomTextField = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
    },
}));

export const CustomTextFieldYellow = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
    borderColor: `yellow !important`,
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        borderColor: `yellow !important`,
        opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        borderColor: `yellow !important`,
        opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: `yellow !important`,
    },
}));

interface CustomTextFieldDebounceProps extends TextFieldProps<'outlined'> {
    value?: string;
    handleChange: (value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const CustomTextFieldDebounce = memo(({ value, handleChange, ...props }: CustomTextFieldDebounceProps) => {
    const debouncedChangeHandler = useCallback(
        debounce((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            handleChange(event);
        }, 300),
        [handleChange]
    );

    return <CustomTextField defaultValue={value} onChange={debouncedChangeHandler} {...props} />;
});

export default CustomTextField;
