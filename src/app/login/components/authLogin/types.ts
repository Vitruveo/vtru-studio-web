import { FormikErrors } from 'formik';

import { FormikDefaultProps } from '@/app/common/types';

interface LoginFormValues {
    email: string;
}

type LoginFormErros = FormikErrors<LoginFormValues>;

export interface LoginViewProps extends FormikDefaultProps<LoginFormValues> {
    disabled: boolean;
    values: LoginFormValues;
    errors: LoginFormErros;
}
