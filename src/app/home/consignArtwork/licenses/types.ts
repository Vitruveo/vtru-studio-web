import { FormikDefaultProps } from '@/app/common/types';
import { FormikErrors } from 'formik';

export interface LicensesFormValues {
    nft: {
        version: string;
        added: boolean;
        license: string;
        elastic: {
            editionPrice: number;
            numberOfEditions: number;
            totalPrice: number;
            editionDiscount: boolean;
        };
        single: {
            editionPrice: number;
        };
        unlimited: {
            editionPrice: number;
        };
        editionOption: 'elastic' | 'single' | 'unlimited' | string;
    };
    stream: {
        version: string;
        added: boolean;
    };
    print: {
        version: string;
        added: boolean;
        unitPrice: number;
    };
    remix: {
        version: string;
        added: boolean;
        unitPrice: number;
    };
}

export interface LicenseProps extends FormikDefaultProps<LicensesFormValues> {
    allValues: LicensesFormValues;
}

export type LicensesFormErros = FormikErrors<LicensesFormValues>;
