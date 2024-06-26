'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from '@/store/hooks';
import LoginView from './view';
import { loginSchemaValidation } from './formSchema';
import { useToastr } from '@/app/hooks/useToastr';
import { codesVtruApi } from '@/services/codes';
import { userLoginThunk } from '@/features/user/thunks';

const LoginContainer = () => {
    const [disabled, setDiabled] = useState<boolean>(false);
    const toast = useToastr();
    const router = useRouter();
    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.user.token !== '');

    if (isLogged) {
        router.push('/home');
    }

    const { handleSubmit, handleChange, setFieldValue, setFieldError, validateForm, values, errors } = useFormik({
        initialValues: {
            email: '',
        },
        validateOnChange: false,
        validationSchema: loginSchemaValidation,
        onSubmit: async (formValues) => {
            await validateForm();
            setDiabled(true);

            try {
                const resUserLogin = await dispatch(userLoginThunk({ email: formValues.email }));
                if (codesVtruApi.success.login.includes(resUserLogin.code)) {
                    router.push('/login/verificationCode');
                    return;
                } else {
                    setDiabled(false);
                    toast.display({ type: 'error', message: 'Something went wrong! Try again later.' });
                }
            } catch (error) {
                toast.display({ type: 'error', message: 'Something went wrong! Try again later.' });
                return;
            }
        },
    });

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
        </>
    );
};

export default LoginContainer;
