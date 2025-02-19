import { useTheme } from '@mui/material/styles';
import { FieldArrayRenderProps } from 'formik';
import Select, { ActionMeta, MultiValue, MenuListProps } from 'react-select';
import { VariableSizeList } from 'react-window';
import { Children, ReactNode, memo } from 'react';

interface Option {
    value: string;
    label: string;
}

interface Props {
    value: Option[];
    options: Option[];
    arrayHelpers: FieldArrayRenderProps;
}

const CustomMenuList = memo((props: MenuListProps<Option>) => {
    const { children, ...other } = props;
    const items = Children.toArray(children);
    const itemSize = 38;

    if (!Array.isArray(children)) return null;

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        return <div style={style}>{children[index] as ReactNode}</div>;
    };

    return (
        <div {...other} onMouseDown={(event) => event.preventDefault()}>
            <VariableSizeList
                height={Math.min(items.length * itemSize, 300)}
                itemCount={items.length}
                itemSize={() => itemSize}
                width="100%"
                innerElementType="ul"
            >
                {Row}
            </VariableSizeList>
        </div>
    );
});

const VirtualizedMultiSelect = ({ value, options, arrayHelpers }: Props) => {
    const theme = useTheme();

    const handleMultiSelectChange = (_selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
            arrayHelpers.remove(value.findIndex((item) => item.value === actionMeta.removedValue.value));
        } else if (actionMeta.action === 'select-option' && actionMeta.option) {
            arrayHelpers.push(actionMeta.option.value);
        }
    };

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
            components={{ MenuList: CustomMenuList }}
            value={value}
            options={options?.sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))}
            onChange={handleMultiSelectChange}
        />
    );
};

export default VirtualizedMultiSelect;
