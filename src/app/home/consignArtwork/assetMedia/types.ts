import { FormikErrors } from 'formik';

export interface AssetMediaFormValues {
    definition: string;
    asset: {
        file: File | undefined;
        formats: {
            display: { file?: File; customFile?: File; transactionId?: string };
            exhibition: { file?: File; customFile?: File; transactionId?: string };
            preview: { file?: File; customFile?: File; transactionId?: string };
        };
    };
}

export type AssetMediaFormErros = FormikErrors<AssetMediaFormValues>;
