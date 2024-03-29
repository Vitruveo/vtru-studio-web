'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { useDispatch } from '@/store/hooks';
import { userLoginThunk } from '@/features/user/thunks';

import LoginView from './view';
import { loginSchemaValidation } from './formSchema';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { codesVtruApi } from '@/services/codes';
import { userActionsCreators } from '@/features/user/slice';
import { findEmailInAllowList } from '@/features/allowList/requests';
import {
    createAttemptInWaitingList,
    findEmailInWaitingList,
    updateAttemptInWaitingList,
} from '@/features/waitingLIst/requests';

const LoginContainer = () => {
    const [disabled, setDiabled] = useState<boolean>(false);
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

                setDiabled(true);

                try {
                    await findEmailInAllowList(formValues.email);
                } catch (error) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response?.status === 404) {
                        try {
                            await findEmailInWaitingList(formValues.email);
                            updateAttemptInWaitingList(formValues.email);
                        } catch (_) {
                            createAttemptInWaitingList(formValues.email);
                        }
                        setDiabled(false);
                        setToastr({ open: true, type: 'info', message: 'Wait for approval' });
                        return;
                    }
                    setDiabled(false);
                    setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
                    return;
                }

                const resUserLogin = await dispatch(userLoginThunk({ email: formValues.email }));
                if (codesVtruApi.success.login.includes(resUserLogin.code)) {
                    router.push('/login/verificationCode');
                    return;
                } else {
                    setDiabled(false);
                    setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
                }
            },
        });

    useEffect(() => {
        dispatch(userActionsCreators.logout());
    }, []);

    return (
        <>
            <LoginView
                values={values}
                errors={errors}
                disabled={disabled}
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
