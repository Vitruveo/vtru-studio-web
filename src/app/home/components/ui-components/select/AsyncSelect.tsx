import Select from 'react-select/async';
import { useTheme } from '@mui/material/styles';

interface Props {
    value: { value: string; label: string }[];
    loadOptions: (inputValue: string, callback: (options: any) => void) => void;
    onChange(option: any): void;
}

export const AsyncSelect = ({ loadOptions, value, onChange }: Props) => {
    const theme = useTheme();

    return (
        <Select
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            onChange={onChange}
            value={value}
            styles={{
                control: (base, state) => ({
                    ...base,
                    minWidth: '240px',
                    borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '#FF0066',
                    '&:hover': { borderColor: '#FF0066' },
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 1000,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: theme.palette.action.selected,
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: theme.palette.text.primary,
                }),
                option: (base, state) => ({
                    ...base,
                    color: theme.palette.text.primary,
                    backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                }),
                input: (base) => ({
                    ...base,
                    color: theme.palette.text.primary,
                }),
            }}
        />
    );
};
