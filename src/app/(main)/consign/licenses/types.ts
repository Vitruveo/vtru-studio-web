import { FormikDefaultProps } from '@/app/common/types';
import { FormikErrors } from 'formik';

export interface LicensesFormValues {
    nft: {
        autoStake: boolean;
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
        availableLicenses: number;
    };
    stream: {
        version: string;
        added: boolean;
    };
    print: {
        version: string;
        added: boolean;
        availableLicenses: number;
    };
    print2: {
        version: string;
        added: boolean;
        merchandisePrice: number;
        displayPrice: number;
        availableLicenses: number;
    };
    artCards: {
        version: string;
        added: boolean;
        status?: string;
    };
}

export interface LicenseProps extends FormikDefaultProps<LicensesFormValues> {
    allValues: LicensesFormValues;
}

export type LicensesFormErros = FormikErrors<LicensesFormValues>;
