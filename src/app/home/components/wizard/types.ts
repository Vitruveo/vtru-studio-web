import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

export interface MetaDataDefinitionTypes {
  domain?: string;
  order: number;
  name: string;
  title: string;
  type: 'string' | 'date' | 'select';
  required: boolean;
  validation: string;
  options?: Option[];
}

export interface Option {
  value: string;
  label: string;
}

export interface CompletedSteps {
  [key: string]: {
    step: number;
    errors: boolean;
  };
}

interface Wallet {
  address: string;
  network: string;
}

interface Email {
  email: string;
  checkedAt: boolean;
}
export interface StepsFormValues {
  username: string;
  profile?: File;
  emails: Email[];
  wallets: Wallet[];
  file?: File;
  assetMetadata: MetaDataDefinitionTypes[];
  completedSteps: CompletedSteps;
  definition: string;
}

type StepsFormErros = FormikErrors<StepsFormValues>;

export interface StepsProps extends FormikDefaultProps<StepsFormValues> {
  values: StepsFormValues;
  errors: StepsFormErros;
  setErrors: (errors: StepsFormErros) => void;
}
