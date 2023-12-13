import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

export interface CompletedSteps {
  [key: string]: {
    step: number;
    errors: boolean;
  };
}
export interface StepsFormValues {
  username: string;
  email: string;
  wallet?: string;
  file?: File;
  completedSteps: CompletedSteps;
}

type StepsFormErros = FormikErrors<StepsFormValues>;

export interface StepsProps extends FormikDefaultProps<StepsFormValues> {
  values: StepsFormValues;
  errors: StepsFormErros;
}
