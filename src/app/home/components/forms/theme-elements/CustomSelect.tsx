import React from 'react';
import { Select, SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSelect = styled((props: SelectProps & { children: React.ReactNode }) => (
    <Select {...props}>{props.children}</Select>
))(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[200],
    },
}));

export default CustomSelect;
