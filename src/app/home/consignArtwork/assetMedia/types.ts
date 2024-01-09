import { FormikErrors } from 'formik';

export interface FormatValue {
    file?: File;
    customFile?: File;
    transactionId?: string;
}

export interface FormatMedia {
    file?: File;
    customFile?: File;
    transactionId?: string;
}

export interface AssetMediaFormValues {
    definition: string;
    asset: {
        file: File | undefined;
        formats: {
            display: FormatMedia;
            exhibition: FormatMedia;
            preview: FormatMedia;
            print: FormatMedia;
        };
    };
}

export type AssetMediaFormErros = FormikErrors<AssetMediaFormValues>;
