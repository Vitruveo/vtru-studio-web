import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';
import { Area } from 'react-easy-crop';

export interface MetadataDefinitionTypes {
    domain?: string;
    order: number;
    value: unknown;
    name: string;
    title: string;
    type: 'string' | 'date' | 'select' | 'integer' | 'cents' | 'boolean';
    required: boolean;
    validation: string;
    options?: Option[];
    auto?: Auto;
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

export interface License {
    title: string;
    domain: 'NFT' | 'print' | 'stream';
    version: string;
    added: boolean;
    enable: boolean;
    licenseMetadataDefinitions: MetadataDefinitionTypes[];
}

export type Licenses = License[];

export interface EmailFormValues {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

export interface Formats {
    landscape?: {
        name: string;
        path: string;
    };
    portrait?: {
        name: string;
        path: string;
    };
    square?: {
        name: string;
        path: string;
    };
}

export interface StepsFormValues {
    username: string;
    profile?: File;
    emails: EmailFormValues[];
    wallets: Wallet[];
    asset: {
        file: File | undefined;
        formats: {
            display: { file?: File; customFile?: File; transactionId?: string };
            exhibition: { file?: File; customFile?: File; transactionId?: string };
            preview: { file?: File; customFile?: File; transactionId?: string };
        };
    };
    contract: boolean;
    assetMetadata: {
        assetMetadataDefinitions: MetadataDefinitionTypes[];
        assetMetadataDomains: Option[];
    };
    creatorMetadata: {
        creatorMetadataDefinitions: MetadataDefinitionTypes[];
    };
    licenses: Licenses;
    status: 'draft' | 'published' | 'archived';
    completedSteps: CompletedSteps;
    definition: string;
}

export interface Auto {
    nameTargetFieldValue: keyof StepsFormValues;
    selectOptions: {
        labelOptionField: string[];
        valueOptionField: string[];
    };
}

type StepsFormErros = FormikErrors<StepsFormValues>;

export interface StepsProps extends FormikDefaultProps<StepsFormValues> {
    values: StepsFormValues;
    errors: StepsFormErros;
    setErrors: (errors: StepsFormErros) => void;
}

export type FormatNames = 'display' | 'exhibition' | 'preview';

export interface MetadataFieldsProps extends StepsProps {
    formkFieldPathChange: string;
    metadataDefinitions?: MetadataDefinitionTypes[];
}
