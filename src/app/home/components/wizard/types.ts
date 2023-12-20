import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

export interface MetadataDefinitionTypes {
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
    network: { name: string; chainId: number };
}

export interface EmailFormValues {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}
export interface StepsFormValues {
    username: string;
    profile?: File;
    emails: EmailFormValues[];
    wallets: Wallet[];
    asset?: File;
    contract: boolean;
    assetMetadata: {
        metadataDefinitions: MetadataDefinitionTypes[];
        metadataDomains: Option[];
    };
    completedSteps: CompletedSteps;
    definition: string;
}

type StepsFormErros = FormikErrors<StepsFormValues>;

export interface StepsProps extends FormikDefaultProps<StepsFormValues> {
    values: StepsFormValues;
    errors: StepsFormErros;
    setErrors: (errors: StepsFormErros) => void;
}
