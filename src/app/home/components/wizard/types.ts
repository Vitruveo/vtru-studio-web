import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

export interface StepsFormValues {
  username: string;
  email: string;
  wallet?: string;
  file?: File;
}

type StepsFormErros = FormikErrors<StepsFormValues>;

export interface StepsProps extends FormikDefaultProps<StepsFormValues> {
  values: StepsFormValues;
  errors: StepsFormErros;
}
