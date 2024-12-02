import { useTheme } from '@mui/material/styles';
import Select, { ActionMeta, MultiValue } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface Props {
    value: Option[];
    options: Option[];
    onChange: (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
}

const MultiSelect = ({ value, options, onChange }: Props) => {
    const theme = useTheme();

    return (
        <Select
            isMulti
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
            value={value}
            options={options}
            onChange={onChange}
        />
    );
};

export default MultiSelect;
