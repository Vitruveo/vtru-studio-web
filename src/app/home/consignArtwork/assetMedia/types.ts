import { FormikErrors } from 'formik';

export type Definition = 'square' | 'landscape' | 'portrait';
export interface FormatMediaSave {
    [key: string]: {
        size?: number;
        width?: number;
        height?: number;
        definition?: Definition;
        name: string;
        path: string;
    };
}
export interface FormatValue {
    name?: string;
    file?: File | string;
    customFile?: File;
    transactionId?: string;
}

export interface FormatMedia {
    size?: number;
    name?: string;
    load?: boolean;
    file?: File | string;
    customFile?: File | string;
    transactionId?: string;
    successUpload?: boolean;
}

export interface OriginalFormatMedia extends FormatMedia {
    definition?: Definition;
    load?: boolean;
    path?: string;
    width?: number;
    height?: number;
    size?: number;
    successUpload?: boolean;
    validation: {
        isValid: boolean;
        message: string;
    };
}

export interface FormatsMedia {
    original: OriginalFormatMedia;
    display: FormatMedia;
    exhibition: FormatMedia;
    preview: FormatMedia;
    print?: FormatMedia;
}

export interface AssetMediaFormValues {
    deleteKeys: string[];
    formats: FormatsMedia;
}

export type AssetMediaFormErros = FormikErrors<AssetMediaFormValues>;
