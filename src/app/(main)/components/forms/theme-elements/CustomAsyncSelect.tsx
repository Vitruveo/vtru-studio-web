import React, { memo, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';

const CustomAsyncSelect = styled(AsyncSelect)(({ theme }) => ({
    '& .react-select__control': {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .react-select__menu': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .react-select__option': {
        color: theme.palette.text.primary,
    },
    '& .react-select__option--is-selected': {
        backgroundColor: theme.palette.action.selected,
    },
    '& .react-select__option--is-focused': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .react-select__placeholder': {
        color: theme.palette.text.secondary,
        opacity: '0.8',
    },
    '& .react-select__single-value': {
        color: theme.palette.text.primary,
    },
    '& .react-select__control--is-disabled .react-select__placeholder': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '& .react-select__control--is-disabled .react-select__control': {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
    },
}));

type CustomAsyncSelectDebounceProps = typeof AsyncSelect & {
    handleChange: (value: any) => void;
};

export const CustomAsyncSelectDebounce = memo(({ handleChange, ...props }: CustomAsyncSelectDebounceProps) => {
    const debouncedChangeHandler = useCallback(
        debounce((newValue: any) => {
            handleChange(newValue);
        }, 300),
        [handleChange]
    );

    return <CustomAsyncSelect onChange={debouncedChangeHandler} {...props} />;
});

export default CustomAsyncSelect;
