'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { useDispatch } from '@/store/hooks';
import { userLoginThunk } from '@/features/user/thunks';

import LoginView from './view';
import { loginSchemaValidation } from './formSchema';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { codesVtruApi } from '@/services/codes';

const LoginContainer = () => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

    const router = useRouter();
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, resetForm, setFieldValue, setFieldError, validateForm, values, errors } =
        useFormik({
            initialValues: {
                email: '',
            },
            validateOnChange: false,
            validationSchema: loginSchemaValidation,
            onSubmit: async (formValues) => {
                await validateForm();

                const resUserLogin = await dispatch(userLoginThunk({ email: formValues.email }));
                if (codesVtruApi.success.login.includes(resUserLogin.code)) {
                    router.push('/login/oneTimePassword');
                    return;
                } else {
                    setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
                }
            },
        });

    return (
        <>
            <LoginView
                values={values}
                errors={errors}
                setFieldError={setFieldError}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
};

export default LoginContainer;
