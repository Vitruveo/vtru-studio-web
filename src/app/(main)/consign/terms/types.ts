import { FormikErrors } from 'formik';

export interface TermsOfUseFormValues {
    isOriginal: boolean;
    generatedArtworkAI: boolean;
    notMintedOtherBlockchain: boolean;
    contract: boolean;
}

export type TermsOfUseFormErros = FormikErrors<TermsOfUseFormValues>;
