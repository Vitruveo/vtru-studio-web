import React, { Fragment, useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { get, omit, cloneDeep, set, unset } from 'lodash';
import validator from '@rjsf/validator-ajv8';
import Form, { FormProps } from '@rjsf/core';
import FormMUI from '@rjsf/mui';
import { RJSFSchema, ErrorSchema, FieldTemplateProps, WidgetProps, RegistryWidgetsType } from '@rjsf/utils';
import { ThemeProvider, useTheme } from '@mui/material';
import CustomFieldTemplate from './customField';
import { CustomCheckboxWidget, CustomColorWidget, CustomRadioWidget } from './widgets';
import './inputs.css';
import { CustomTextareaWidget } from './widgets/CustomTextareaWidget';

export interface CustomFormProps extends Partial<FormProps<any, RJSFSchema, any>> {
    langBasePath: string;
    errors: ErrorSchema;
    updateErrors: (errors: ErrorSchema) => void;
}

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
    console.log('ui: ', uiSchema);

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

    const widgets: RegistryWidgetsType = useMemo(
        () => ({
            TextareaWidget: CustomTextareaWidget,
            checkboxes: (props: WidgetProps) => <CustomCheckboxWidget {...props} langBasePath={langBasePath} />,
            radios: (props: WidgetProps) => <CustomRadioWidget {...props} langBasePath={langBasePath} />,
            ColorWidget: CustomColorWidget,
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
