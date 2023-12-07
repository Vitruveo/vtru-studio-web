import toastr from 'toastr';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { useDispatch } from '@/store/hooks';
import { userLoginThunk, userOTPConfirmThunk } from '@/features/user/thunks';

import ConfirmView from './view';
import { otpSchemaValidation } from './formSchema';
import { userSelector } from '@/features/user';

export default function ConfirmContainer() {
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
        toastr.success('OTP confirmed!');
        router.push('/home');
        return;
      }

      if (resOTPConfirm.meta.requestStatus === 'rejected') {
        toastr.error('Login failed: invalid code');
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
    if (resUserLogin.meta.requestStatus === 'fulfilled') toastr.success('Code sent to your email!');
    else toastr.error('Something went wrong! Try again later.');
  };

  return (
    <ConfirmView
      values={values}
      errors={errors}
      handleResendCode={handleResendCode}
      handleChange={handleCustomChange}
      handleSubmit={handleSubmit}
    />
  );
}
