import React, { Fragment, useRef, useCallback, useState, useEffect, CSSProperties, useMemo } from 'react';

import { get, omit, cloneDeep, set, unset } from 'lodash';
import validator from '@rjsf/validator-ajv8';
import Form, { FormProps } from '@rjsf/core';
import FormMUI from '@rjsf/mui';

import { RJSFSchema, ErrorSchema, FieldTemplateProps, WidgetProps } from '@rjsf/utils';
import { Box, FormControlLabel, TextareaAutosize, ThemeProvider, useTheme } from '@mui/material';
import CustomFieldTemplate from './customField';
import CustomCheckbox from '@/app/home/components/forms/theme-elements/CustomCheckbox';
import CustomRadio from '@/app/home/components/forms/theme-elements/CustomRadio';
import { useI18n } from '@/app/hooks/useI18n';
import './inputs.css';

export interface CustomFormProps extends Partial<FormProps<any, RJSFSchema, any>> {
    langBasePath: string;
    errors: ErrorSchema;
    updateErrors: (errors: ErrorSchema) => void;
}

interface TextareaWidgetProps {
    id: string;
    value: string;
    required?: boolean;
    onChange: (value: string) => void;
    style?: CSSProperties;
}

interface MyCustomCheckboxWidgetProps extends WidgetProps {
    langBasePath: string;
}

const MyCustomCheckboxWidget = (props: MyCustomCheckboxWidgetProps) => {
    const { id, options, value, langBasePath, name, blurHandler, onChange } = props;

    const { language } = useI18n();

    const handleChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        let newValue;

        if (isChecked) {
            newValue = [...(value || []), item];
        } else {
            newValue = (value || []).filter((v: string) => v !== item);
        }

        onChange(newValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        props.onFocus(props.id, e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
        props.onBlur(props.id, e.target.value);
    };

    return (
        <div id={id}>
            {(options.enumOptions || []).map((option, i) => (
                <Box key={i}>
                    <FormControlLabel
                        control={
                            <CustomCheckbox
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                color="primary"
                                value={option.value}
                                checked={(value || []).includes(option.value)}
                                onChange={handleChange(option.value)}
                            />
                        }
                        label={`${language[`${langBasePath}.${name}.enum.${option.value.toLowerCase()}`] as string}`}
                    />
                </Box>
            ))}
        </div>
    );
};

interface MyCustomRadioWidgetProps extends WidgetProps {
    langBasePath: string;
}

const MyCustomRadioWidget = (props: MyCustomRadioWidgetProps) => {
    const { id, options, value, langBasePath, name, blurHandler, onChange } = props;

    const { language } = useI18n();

    const handleChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(item);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        props.onFocus(props.id, e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
        props.onBlur(props.id, e.target.value);
    };

    return (
        <div id={id}>
            {(options.enumOptions || []).map((option, i) => (
                <Box key={i}>
                    <FormControlLabel
                        control={
                            <CustomRadio
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                color="primary"
                                value={option.value}
                                checked={value == option.value}
                                onChange={handleChange(option.value)}
                            />
                        }
                        label={`${language[`${langBasePath}.${name}.enum.${option.value.toLowerCase()}`] as string}`}
                    />
                </Box>
            ))}
        </div>
    );
};

const TextareaWidget = (props: WidgetProps) => {
    const theme = useTheme();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.target.value);
    }, []);

    return (
        <TextareaAutosize
            minRows={4}
            color="primary"
            id={props.id}
            value={props.value}
            required={props.required}
            onChange={handleChange}
            onBlur={(e) => props.onBlur(props.id, e.target.value)}
            onFocus={(e) => props.onFocus(props.id, e.target.value)}
            style={{
                backgroundColor: theme.palette.background.paper,
                width: '100%',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(1),
                fontSize: theme.typography.fontSize,
                fontFamily: theme.typography.fontFamily,
                ...props.style,
            }}
        />
    );
};

const CustomForm = ({
    schema,
    uiSchema,
    errors,
    formData,
    langBasePath,
    updateErrors,
    onSubmit,
    ...otherProps
}: CustomFormProps) => {
    const [fieldHasFocus, setFieldHasFocus] = useState(false);
    const [formIschanged, setFormIschanged] = useState(false);

    const myRef = useRef<Form<any, RJSFSchema, any> | null>(null);
    const theme = useTheme();

    const updatedTheme = {
        ...theme,
        components: {
            ...theme.components,
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        width: '100%',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width: '100%',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        width: '100%',
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        maxWidth: '500px',
                    },
                },
            },
            MuiFormControl: {
                ...theme.components?.MuiFormControl,
                defaultProps: {
                    ...theme.components?.MuiFormControl?.defaultProps,
                    size: 'small',
                },
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: 'red',
                    },
                },
            },
        },
    };

    const blurHandler = useCallback(
        (...args: any) => {
            setFieldHasFocus(false);
            setFormIschanged(false);

            if (!formIschanged) return;

            const $this = myRef.current;
            if (!$this) return;

            const fieldPath = args[0].split('_').slice(1);

            const { errorSchema: stateErrorSchema } = $this.state;

            const fieldValue = get(formData, fieldPath);

            const formDataToValidate = fieldValue === '' ? omit(formData, fieldPath) : formData;

            const { errorSchema: validatedErrorSchema } = $this.validate(formDataToValidate);

            if (!validatedErrorSchema || !Object.values(validatedErrorSchema).length) {
                updateErrors({});
                return;
            }

            const newErrorSchema = cloneDeep(stateErrorSchema);
            const newFieldErrorSchema = get(validatedErrorSchema, fieldPath);

            if (newFieldErrorSchema) {
                set(newErrorSchema, fieldPath, newFieldErrorSchema);
            } else {
                unset(newErrorSchema, fieldPath);
            }

            updateErrors(newErrorSchema);
        },
        [formIschanged, formData]
    );

    const focusHandler = useCallback(() => {
        if (!fieldHasFocus) {
            setFieldHasFocus(true);
            if (formIschanged) setFormIschanged(false);
        }
    }, [fieldHasFocus]);

    const Template = useCallback(
        ({ ...res }: FieldTemplateProps) => <CustomFieldTemplate {...res} langBasePath={langBasePath} />,
        []
    );

    const widgets = useMemo(
        () => ({
            TextareaWidget: TextareaWidget,
            checkboxes: (props: WidgetProps) => <MyCustomCheckboxWidget {...props} langBasePath={langBasePath} />,
            radios: (props: WidgetProps) => <MyCustomRadioWidget {...props} langBasePath={langBasePath} />,
        }),
        []
    );

    useEffect(() => {
        if (!formIschanged) setFormIschanged(true);
    }, [formData]);

    return (
        <ThemeProvider theme={updatedTheme}>
            <FormMUI
                {...otherProps}
                formData={formData}
                schema={schema || {}}
                uiSchema={{
                    ...uiSchema,
                }}
                templates={{
                    FieldTemplate: Template,
                }}
                widgets={widgets}
                ref={myRef}
                validator={validator}
                onBlur={blurHandler}
                onFocus={focusHandler}
                showErrorList={false}
                extraErrors={errors}
            >
                <Fragment />
            </FormMUI>
        </ThemeProvider>
    );
};

export default CustomForm;
