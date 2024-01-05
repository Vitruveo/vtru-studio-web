import { FormikErrors } from 'formik';

export interface TermsOfUseFormValues {
    contract: boolean;
}

export type TermsOfUseFormErros = FormikErrors<TermsOfUseFormValues>;
