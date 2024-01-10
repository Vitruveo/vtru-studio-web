import { FormikErrors } from 'formik';

export interface FormatMediaSave {
    [key: string]: {
        name: string;
        path: string;
    };
}
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
        formats: {
            original: FormatMedia;
            display: FormatMedia;
            exhibition: FormatMedia;
            preview: FormatMedia;
            print: FormatMedia;
        };
    };
}

export type AssetMediaFormErros = FormikErrors<AssetMediaFormValues>;
