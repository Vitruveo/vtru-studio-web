import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { useDispatch } from '@/store/hooks';
import { userLoginThunk, userOTPConfirmThunk } from '@/features/user/slice';
import { userSelector } from '@/features/user';
import { connectWebSocketThunk, loginWebSocketThunk } from '@/features/ws';
import { UserOTPConfirmApiRes } from '@/features/user/types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

import ConfirmView from './view';
import { otpSchemaValidation } from './formSchema';

export default function ConfirmContainer() {
  const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

  const dispatch = useDispatch();

  const {
    login: { email },
  } = useSelector(userSelector(['login']));

  const router = useRouter();

  const { handleSubmit, handleChange, values, errors, submitForm, validateForm } = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: otpSchemaValidation,
    onSubmit: async (formValues) => {
      const resOTPConfirm = await dispatch(userOTPConfirmThunk({ code: formValues.code, email }));
      if (resOTPConfirm.meta.requestStatus === 'fulfilled') {
        const id = (resOTPConfirm.payload as UserOTPConfirmApiRes).data!.user._id;
        await dispatch(connectWebSocketThunk());
        await dispatch(loginWebSocketThunk({ _id: id }));
        setToastr({ open: true, type: 'success', message: 'OTP confirmed!' });
        router.push('/home');
        return;
      }

      if (resOTPConfirm.meta.requestStatus === 'rejected') {
        setToastr({ open: true, type: 'error', message: 'Login failed: invalid code' });
      }
    },
  });

  const handleCustomChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    await validateForm();
    if (e.target.value.length === 6) {
      submitForm();
    }
  };

  const handleResendCode = async () => {
    const resUserLogin = await dispatch(userLoginThunk({ email }));
    if (resUserLogin.meta.requestStatus === 'fulfilled')
      setToastr({ open: true, type: 'success', message: 'Code sent to your email!' });
    else setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
  };

  return (
    <>
      <ConfirmView
        values={values}
        errors={errors}
        handleResendCode={handleResendCode}
        handleChange={handleCustomChange}
        handleSubmit={handleSubmit}
      />
      <CustomizedSnackbar type={toastr.type} open={toastr.open} message={toastr.message} setOpentate={setToastr} />
    </>
  );
}
