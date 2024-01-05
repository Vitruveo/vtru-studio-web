import { FormikErrors } from 'formik';
import { MetadataDefinitionTypes } from '../components/metadataFields/types';

export interface License {
    title: string;
    domain: 'NFT' | 'print' | 'stream';
    version: string;
    added: boolean;
    enable: boolean;
    licenseMetadataDefinitions: MetadataDefinitionTypes[];
}

export type Licenses = License[];

export interface LicensesFormValues {
    licenses: Licenses;
}

export type LicensesFormErros = FormikErrors<LicensesFormValues>;
