import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Box, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Auto, MetadataDefinitionTypes, MetadataFieldsProps, Option, StepsFormValues } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import CustomTextField from '../forms/theme-elements/CustomTextField';

const handleGetValueByPath = (obj: any, path: string): any => {
    const keys = path.split('.');
    let value: any = obj;

    keys.forEach((key) => {
        if (value && key in value) {
            value = value[key];
        } else {
            value = undefined;
        }
    });

    return value;
};

export const AutoSelectField = ({
    metadataIndex,
    metadataItem,
    values,
    setFieldValue,
    formkFieldPathChange,
    handleChangeInput,
}: {
    metadataIndex: number;
    metadataItem: MetadataDefinitionTypes;
    values: StepsFormValues;
    setFieldValue: any;
    formkFieldPathChange: string;
    handleChangeInput: (index: number) => (e: any) => void;
}) => {
    const handleCreateAutoSelectOptions = (auto: Auto): Option[] => {
        const fieldAutoValue = values[auto.nameTargetFieldValue] as any[];

        if (fieldAutoValue) {
            return fieldAutoValue.map((v) => ({
                label: auto.selectOptions.labelOptionField
                    .reduce((acc, cur) => {
                        let valueByPath = handleGetValueByPath(v, cur);
                        if (cur === 'address')
                            valueByPath = `${valueByPath.substring(0, 6)}...${valueByPath.substring(
                                valueByPath.length - 4
                            )}`;
                        if (valueByPath) return `${acc} ${valueByPath}`;
                        return acc;
                    }, '')
                    .trim(),
                value: auto.selectOptions.valueOptionField
                    .reduce((acc, cur) => {
                        const valueByPath = handleGetValueByPath(v, cur);
                        if (valueByPath) return `${acc} ${valueByPath}`;
                        return acc;
                    }, '')
                    .trim(),
            }));
        }
        return [];
    };

    const options = handleCreateAutoSelectOptions(metadataItem.auto!);
    const defaultValue = options[0]?.value;

    useEffect(() => {
        if (!metadataItem.value) setFieldValue(`${formkFieldPathChange}.${metadataIndex}.value`, defaultValue);
    }, []);

    return (
        <CustomSelect
            key={metadataIndex}
            value={metadataItem.value || defaultValue}
            onChange={handleChangeInput(metadataIndex)}
            size="small"
            fullWidth
            variant="outlined"
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option?.value}>
                    {option.label}
                </MenuItem>
            ))}
        </CustomSelect>
    );
};

export const MetadataFields = ({
    values,
    errors,
    metadataDefinitions,
    formkFieldPathChange,
    setFieldValue,
}: MetadataFieldsProps) => {
    const handleIntegerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    };

    const handleCentsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, '');
        const parts = event.target.value.split('.');
        if (parts.length > 2) {
            parts.pop();
            event.target.value = parts.join('.');
        }
    };

    const handleChangeInput = (index: number) => (e: any) => {
        setFieldValue(`${formkFieldPathChange}.${index}.value`, e.target.value);
    };

    const handleChangeDateInput = (index: number) => (value: any) => {
        setFieldValue(`${formkFieldPathChange}.${index}.value`, value);
    };

    const handleChangeSwitchInput = (index: number) => (value: boolean) => {
        setFieldValue(`${formkFieldPathChange}.${index}.value`, value);
    };

    const errorsByPath = (index: number) => handleGetValueByPath(errors, formkFieldPathChange)?.[index];

    return (
        <Grid spacing={2} container>
            {metadataDefinitions?.map((v, i) => (
                <Grid item lg={6} xs={12} key={v.name}>
                    {v.type === 'select' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title}
                            </Typography>
                            {v.auto ? (
                                <AutoSelectField
                                    formkFieldPathChange={formkFieldPathChange}
                                    setFieldValue={setFieldValue}
                                    metadataItem={v}
                                    metadataIndex={i}
                                    values={values}
                                    handleChangeInput={handleChangeInput}
                                />
                            ) : (
                                <CustomSelect
                                    value={v.value}
                                    onChange={handleChangeInput(i)}
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                >
                                    {v.options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            )}
                            <Typography my={1} color="error">
                                {errorsByPath(i)?.value}
                            </Typography>
                        </>
                    )}
                    {v.type === 'string' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title}
                            </Typography>
                            <CustomTextField
                                value={v.value}
                                onChange={handleChangeInput(i)}
                                fullWidth
                                size="small"
                                variant="outlined"
                                error={!!errorsByPath(i)?.value}
                                helperText={errorsByPath(i)?.value}
                            />
                        </>
                    )}
                    {v.type === 'integer' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title}
                            </Typography>
                            <CustomTextField
                                type="text"
                                fullWidth
                                value={v.value}
                                onChange={handleChangeInput(i)}
                                size="small"
                                variant="outlined"
                                onInput={handleIntegerInputChange}
                                error={!!errorsByPath(i)?.value}
                                helperText={errorsByPath(i)?.value}
                            />
                        </>
                    )}
                    {v.type === 'cents' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title} (¢)
                            </Typography>
                            <CustomTextField
                                type="text"
                                fullWidth
                                value={v.value}
                                onChange={handleChangeInput(i)}
                                size="small"
                                variant="outlined"
                                onInput={handleCentsInputChange}
                                error={!!errorsByPath(i)?.value}
                                helperText={errorsByPath(i)?.value}
                                InputProps={{
                                    startAdornment: (
                                        <Typography variant="body1" component="span" style={{ marginRight: 8 }}>
                                            ¢
                                        </Typography>
                                    ),
                                }}
                            />
                        </>
                    )}
                    {v.type === 'boolean' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title}
                            </Typography>
                            <Box>
                                <Switch
                                    name={`assetMetadata.${i}.${v.name}`}
                                    checked={v.value as boolean}
                                    onChange={() => handleChangeSwitchInput(i)(!v.value)}
                                />
                                <Typography my={1} color="error">
                                    {errorsByPath(i)?.value}
                                </Typography>
                            </Box>
                        </>
                    )}
                    {v.type === 'date' && (
                        <>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {v.title}
                            </Typography>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(params) => <CustomTextField size="small" {...params} />}
                                        value={v.value}
                                        onChange={handleChangeDateInput(i)}
                                    />
                                </LocalizationProvider>
                                <Typography my={1} color="error">
                                    {errorsByPath(i)?.value}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default MetadataFields;
