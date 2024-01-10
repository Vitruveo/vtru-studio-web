import { FormikErrors } from 'formik';
import { MetadataDefinitionTypes } from '../components/metadataFields/types';

export interface Option {
    value: string;
    label: string;
}

export interface AssetMetadata {
    assetMetadataDefinitions: MetadataDefinitionTypes[];
    assetMetadataDomains: Option[];
}

export interface AssetMetadataFormValues {
    assetMetadata: AssetMetadata;
}

export type AssetMetadataFormErros = FormikErrors<AssetMetadataFormValues>;
