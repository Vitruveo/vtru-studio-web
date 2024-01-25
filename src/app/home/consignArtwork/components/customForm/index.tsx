import React, { Fragment, useRef, memo, useMemo, useCallback, useState, useEffect } from 'react';

import { get, omit, cloneDeep, set, unset } from 'lodash';
import validator from '@rjsf/validator-ajv8';
import Form, { IChangeEvent, FormProps } from '@rjsf/core';
import FormMUI from '@rjsf/mui';
import { RJSFSchema, ErrorSchema, FieldTemplateProps } from '@rjsf/utils';
import { ThemeProvider, useTheme } from '@mui/material';
import CustomFieldTemplate from './customField';

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
                        width: '200px',
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

    const blurHandler = (...args: any) => {
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

        const newErrorSchema = cloneDeep(stateErrorSchema);
        const newFieldErrorSchema = get(validatedErrorSchema, fieldPath);

        if (newFieldErrorSchema) {
            set(newErrorSchema, fieldPath, newFieldErrorSchema);
        } else {
            unset(newErrorSchema, fieldPath);
        }

        updateErrors(newErrorSchema);
    };

    const focusHandler = () => {
        if (!fieldHasFocus) {
            setFieldHasFocus(true);
            setFormIschanged(false);
        }
    };

    const Template = useCallback(
        ({ ...res }: FieldTemplateProps) => <CustomFieldTemplate {...res} langBasePath={langBasePath} />,
        []
    );

    useEffect(() => {
        setFormIschanged(true);
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
