import { Typography, RadioGroup, Radio, IconButton, Box, useMediaQuery, Theme, TextFieldProps, ButtonProps, Button } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { ChangeEvent } from 'react';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

export interface AccountDataListProps {
    title: string;
    defaultValue: string;
    onItemSelect?: (value: ChangeEvent<HTMLInputElement>) => void;
    items: AccountDataListItemProps[];
    children?: React.ReactNode;
}

export interface AccountDataListItemProps {
    label: string;
    value: string;
    isDisabled?: boolean;
    onDelete?: () => void;
}

export const AccountDataList = ({ title, defaultValue, onItemSelect, items, children }: AccountDataListProps) => {
    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Box maxWidth={!xl ? 300 : 400} display="flex" flexDirection="column" my={2}>
            <Box display="flex" justifyContent="flex-start" mb={2}>
                <Typography variant="subtitle1" fontWeight={600} style={{ width: '70%' }}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} style={{ width: '20%', textAlign: 'center' }}>
                    Default
                </Typography>
                <Box width="10%" />
            </Box>

            <RadioGroup defaultValue={defaultValue} aria-label="options" name="emailDefault" onChange={onItemSelect}>
                {items.map((item, index) => (
                    <AccountDataListItem key={index} {...item} />
                ))}
            </RadioGroup>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                {children}
            </Box>
        </Box>
    );
};

export const AccountDataListItem = ({ label, value, isDisabled, onDelete }: AccountDataListItemProps) => {
    return (
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
            <Typography variant="body1" style={{ width: '70%' }}>
                {label}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" width="20%">
                <Box display="flex" justifyContent="center" alignItems="center" style={{ margin: 0, padding: 0 }}>
                    <Radio sx={{ padding: 0 }} value={value} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                <IconButton disabled={isDisabled} sx={{ padding: 0, margin: 0 }} size="small" onClick={onDelete}>
                    <IconTrash color={isDisabled ? '#A9A9A9' : 'red'} size="16" stroke={1.5} />
                </IconButton>
            </Box>
        </Box>
    );
};

export const AccountDataListInput = (props: TextFieldProps) => {
    return (
        <CustomTextField
            style={{ width: '70%' }}
            size="small"
            fullWidth
            FormHelperTextProps={{
                style: {
                    position: 'absolute',
                    bottom: '-22px',
                    left: 0,
                    fontSize: '0.75rem',
                },
            }}
            variant="outlined"
            {...props}
        />
    );
};

export const AccountDataListButton = (props: ButtonProps) => {
    return (
        <Box width="30%" display="flex" justifyContent="center">
            <Button
                style={{ width: '85%', marginLeft: '10%' }}
                size="small"
                variant="contained"
                {...props}
            />
        </Box>
    );
};
