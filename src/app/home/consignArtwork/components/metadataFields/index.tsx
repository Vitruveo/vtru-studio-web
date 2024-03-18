import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import { Box, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Auto, MetadataDefinitionTypes, MetadataFieldsProps, Option } from './types';
import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';

const handleGetValueByPath = (obj: any, path: string): any => {
    const keys = path.split('.');
    let value: any = obj;

    keys.forEach((key) => {
        if (value && key.includes('[')) {
            const arrayKey = key.split('[')[0];
            const index = parseInt(key.split('[')[1].replace(']', ''), 10);

            if (value[arrayKey] && Array.isArray(value[arrayKey])) {
                value = value[arrayKey][index];
            } else {
                value = undefined;
            }
        } else if (value && key in value) {
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
    translatePath,
    formkFieldPathChange,
    handleChangeInput,
}: {
    metadataIndex: number;
    metadataItem: MetadataDefinitionTypes;
    values: any;
    setFieldValue: any;
    translatePath: string;
    formkFieldPathChange: string;
    handleChangeInput: (index: number) => (e: any) => void;
}) => {
    const { language } = useI18n();
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
                    {language[`${translatePath}.${metadataItem.name}.${option.value}`] as string}
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
    translatePath,
    setFieldValue,
}: MetadataFieldsProps) => {
    const [inputTags, setInputTags] = useState({});

    const { language } = useI18n();

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

    const onChangeInputTags = (index: number, value: string) => {
        setInputTags({ ...inputTags, [index]: value });
    };

    const handleAddTag = (index: number) => {
        const tags = values.assetMetadata.assetMetadataDefinitions[index].value as string[];
        const newTags = [...tags, inputTags[index as keyof typeof inputTags]];
        setFieldValue(`${formkFieldPathChange}.${index}.value`, newTags);
        onChangeInputTags(index, '');
    };

    const handleRemoveTag = (index: number, tagIndex: number) => {
        const tags = values.assetMetadata.assetMetadataDefinitions[index].value as string[];
        const newTags = tags.filter((v, i) => i !== tagIndex);
        setFieldValue(`${formkFieldPathChange}.${index}.value`, newTags);
    };

    const handleGetMessageError = (index: number): string => {
        const error = errorsByPath(index)?.value;
        return (language[`${translatePath}.errors`] as TranslateFunction)({ message: error });
    };

    return (
        <Grid spacing={2} container>
            {metadataDefinitions?.map((v, i) => (
                <Fragment key={i}>
                    {v.type === 'string' && v.name === 'description' ? (
                        <Grid item lg={12} xs={12}>
                            <>
                                <Typography variant="subtitle1" fontWeight={600} component="label">
                                    {language[`${translatePath}.${v.name}`] as string}
                                </Typography>
                                <CustomTextField
                                    multiline
                                    rows={3}
                                    maxRows={3}
                                    value={v.value}
                                    inputProps={{ maxLength: 185 }}
                                    onChange={handleChangeInput(i)}
                                    fullWidth
                                    size="small"
                                    FormHelperTextProps={{
                                        style: {
                                            position: 'absolute',
                                            bottom: '-22px',
                                            left: -10,
                                            fontSize: '0.75rem',
                                        },
                                    }}
                                    variant="outlined"
                                    error={!!handleGetMessageError(i)}
                                    helperText={handleGetMessageError(i)}
                                />
                            </>
                        </Grid>
                    ) : v.type === 'tags' ? (
                        <Grid item lg={12} xs={12}>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {language[`${translatePath}.${v.name}`] as string}
                            </Typography>

                            <Box display="flex" alignItems="center">
                                <CustomTextField
                                    value={inputTags[i as keyof typeof inputTags]}
                                    style={{ marginRight: 8 }}
                                    fullWidth
                                    onChange={(e) => onChangeInputTags(i, e.target.value)}
                                    size="small"
                                    placeholder={language[`${translatePath}.${v.name}.placeholder`] as string}
                                    inputProps={{
                                        'aria-label': 'add tag',
                                    }}
                                />
                                <Button size="small" variant="contained" onClick={() => handleAddTag(i)}>
                                    {language[`${translatePath}.${v.name}.button`] as string}
                                </Button>
                            </Box>
                            <Box
                                marginTop={1}
                                display="flex"
                                flexWrap="wrap"
                                gap={1}
                                maxHeight={50} // Set your maximum height for the container
                                overflow="auto"
                            >
                                {(v.value as any[]).map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        onDelete={() => handleRemoveTag(i, index)}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            </Box>
                        </Grid>
                    ) : (
                        <Grid marginBottom={2} item lg={6} xs={12}>
                            {v.type === 'select' && (
                                <div style={{ position: 'relative' }}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        {language[`${translatePath}.${v.name}`] as string}
                                    </Typography>
                                    {v.auto ? (
                                        <AutoSelectField
                                            translatePath={translatePath}
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
                                                    {language[`${translatePath}.${v.name}.${option.value}`] as string}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    )}
                                    {handleGetMessageError(i) && (
                                        <Typography
                                            color="error"
                                            style={{
                                                position: 'absolute',
                                                bottom: -22,
                                                left: 0,
                                            }}
                                        >
                                            {handleGetMessageError(i)}
                                        </Typography>
                                    )}
                                </div>
                            )}
                            {v.type === 'string' && (
                                <>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        {language[`${translatePath}.${v.name}`] as string}
                                    </Typography>
                                    <CustomTextField
                                        value={v.value}
                                        onChange={handleChangeInput(i)}
                                        fullWidth
                                        size="small"
                                        FormHelperTextProps={{
                                            style: {
                                                position: 'absolute',
                                                bottom: '-22px',
                                                left: -10,
                                                fontSize: '0.75rem',
                                            },
                                        }}
                                        variant="outlined"
                                        error={!!handleGetMessageError(i)}
                                        helperText={handleGetMessageError(i)}
                                    />
                                </>
                            )}
                            {v.type === 'integer' && (
                                <>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        {language[`${translatePath}.${v.name}`] as string}
                                    </Typography>
                                    <CustomTextField
                                        type="text"
                                        fullWidth
                                        value={v.value}
                                        onChange={handleChangeInput(i)}
                                        size="small"
                                        variant="outlined"
                                        FormHelperTextProps={{
                                            style: {
                                                position: 'absolute',
                                                bottom: '-22px',
                                                left: 0,
                                                fontSize: '0.75rem',
                                            },
                                        }}
                                        onInput={handleIntegerInputChange}
                                        error={!!handleGetMessageError(i)}
                                        helperText={handleGetMessageError(i)}
                                    />
                                </>
                            )}
                            {v.type === 'cents' && (
                                <>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        {language[`${translatePath}.${v.name}`] as string} (¢)
                                    </Typography>
                                    <CustomTextField
                                        type="text"
                                        fullWidth
                                        value={v.value}
                                        onChange={handleChangeInput(i)}
                                        size="small"
                                        variant="outlined"
                                        onInput={handleCentsInputChange}
                                        error={!!handleGetMessageError(i)}
                                        helperText={handleGetMessageError(i)}
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
                                        {language[`${translatePath}.${v.name}`] as string}
                                    </Typography>
                                    <Box>
                                        <Switch
                                            name={`assetMetadata.${i}.${v.name}`}
                                            checked={v.value as boolean}
                                            onChange={() => handleChangeSwitchInput(i)(!v.value)}
                                        />
                                        <Typography color="error">{handleGetMessageError(i)}</Typography>
                                    </Box>
                                </>
                            )}
                            {v.type === 'date' && (
                                <div style={{ position: 'relative' }}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        {language[`${translatePath}.${v.name}`] as string}
                                    </Typography>
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                renderInput={(params) => <CustomTextField size="small" {...params} />}
                                                value={v.value || null}
                                                onChange={handleChangeDateInput(i)}
                                            />
                                        </LocalizationProvider>
                                        {handleGetMessageError(i) && (
                                            <Typography
                                                color="error"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: -22,
                                                    left: 0,
                                                }}
                                            >
                                                {handleGetMessageError(i)}
                                            </Typography>
                                        )}
                                    </Box>
                                </div>
                            )}
                        </Grid>
                    )}
                </Fragment>
            ))}
        </Grid>
    );
};

export default MetadataFields;
