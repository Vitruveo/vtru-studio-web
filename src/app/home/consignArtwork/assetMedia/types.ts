import { FormikErrors } from 'formik';

export interface FormatMediaSave {
    [key: string]: {
        name: string;
        path: string;
    };
}
export interface FormatValue {
    file?: File | string;
    customFile?: File;
    transactionId?: string;
}

export interface FormatMedia {
    file?: File | string;
    customFile?: File | string;
    transactionId?: string;
}

export interface FormatsMedia {
    original: FormatMedia;
    display: FormatMedia;
    exhibition: FormatMedia;
    preview: FormatMedia;
    print: FormatMedia;
}

export interface AssetMediaFormValues {
    definition: string;
    formats: FormatsMedia;
}

export type AssetMediaFormErros = FormikErrors<AssetMediaFormValues>;
