import { Children, ReactNode, memo, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Select, { ActionMeta, MultiValue, MenuListProps, InputActionMeta } from 'react-select';
import { VariableSizeList } from 'react-window';
import { FieldArrayRenderProps } from 'formik';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface Props {
    value: Option[];
    options: Option[];
    arrayHelpers: FieldArrayRenderProps;
    load?: boolean;
    onlyValueSelected?: boolean;
    loadOptions?: (inputValue: string, callback: (options: Option[]) => void) => void;
}

interface CustomMenuListProps extends Omit<MenuListProps<Option>, 'setValue'> {
    load?: boolean;
}

const CustomMenuList = memo(({ children, load, ...other }: CustomMenuListProps) => {
    const items = useMemo(() => Children.toArray(children), [children]);
    const itemSize = 38;
    const listRef = useRef<VariableSizeList>(null);

    useEffect(() => {
        if (listRef.current && items.length > 0) {
            listRef.current.scrollToItem(0);
        }
    }, [items.length]);

    if (load) {
        return (
            <Box display="flex" justifyContent="center" p={1}>
                <CircularProgress size={20} />
            </Box>
        );
    }

    if (!Array.isArray(children))
        return (
            <Typography textAlign="center" color="GrayText" p={1}>
                No options
            </Typography>
        );

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>{children[index] as ReactNode}</div>
    );

    return (
        <div {...other} onMouseDown={(event) => event.preventDefault()}>
            <VariableSizeList
                ref={listRef}
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

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: any[]) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );
};

const VirtualizedMultiSelect = ({ value, options, arrayHelpers, load, onlyValueSelected, loadOptions }: Props) => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isAsyncLoading, setIsAsyncLoading] = useState(false);
    const prevOptionsRef = useRef(options);

    const debouncedFilter = useDebounce((searchTerm: string) => {
        if (loadOptions) {
            setIsAsyncLoading(true);
            loadOptions(searchTerm, (asyncOptions) => {
                setFilteredOptions(asyncOptions);
                setIsAsyncLoading(false);
            });
        } else {
            setFilteredOptions(
                options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
    }, 600);

    const handleMultiSelectChange = useCallback(
        (_selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
            if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                arrayHelpers.remove(value.findIndex((item) => item.value === actionMeta.removedValue.value));
            } else if (actionMeta.action === 'select-option' && actionMeta.option) {
                if (onlyValueSelected) {
                    arrayHelpers.push(actionMeta.option.value);
                } else {
                    arrayHelpers.push({ label: actionMeta.option.label, value: actionMeta.option.value });
                }
            }
        },
        [arrayHelpers, value]
    );

    const handleInputChange = useCallback(
        (newValue: string, actionMeta: InputActionMeta) => {
            if (actionMeta.action === 'input-change') {
                setInputValue(newValue);
                debouncedFilter(newValue);
            }
        },
        [debouncedFilter]
    );

    useEffect(() => {
        if (prevOptionsRef.current !== options) {
            setFilteredOptions(options);
            prevOptionsRef.current = options;
        }
    }, [options]);

    useEffect(() => {
        if (loadOptions && inputValue === '' && filteredOptions.length === 0) {
            setIsAsyncLoading(true);
            loadOptions('', (asyncOptions) => {
                setFilteredOptions(asyncOptions);
                setIsAsyncLoading(false);
            });
        }
    }, [loadOptions, inputValue, filteredOptions.length]);

    const sortedOptions = useMemo(
        () =>
            filteredOptions
                .filter((v) => v.label.length && v.value.length)
                .sort((a, b) => a.label.localeCompare(b.label)),
        [filteredOptions]
    );

    return (
        <Select
            isMulti
            styles={{
                control: (base, state) => ({
                    ...base,
                    minWidth: '240px',
                    borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: state.isFocused ? '0 0 0 1px #FF0066' : undefined,
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
            components={{
                MenuList: (props) => (
                    <CustomMenuList {...(props as MenuListProps<Option>)} load={load || isAsyncLoading} />
                ),
            }}
            isLoading={load || isAsyncLoading}
            loadingMessage={() => (
                <Box display="flex" justifyContent="center" p={1}>
                    <CircularProgress size={20} />
                </Box>
            )}
            value={value}
            options={sortedOptions}
            onChange={handleMultiSelectChange}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            filterOption={() => true}
        />
    );
};

export default memo(VirtualizedMultiSelect);
