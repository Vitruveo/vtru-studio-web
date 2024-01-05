import { FormikErrors } from 'formik';
import { MetadataDefinitionTypes } from '../components/metadataFields/types';

export interface Option {
    value: string;
    label: string;
}

export interface AssetMetadataFormValues {
    assetMetadata: {
        assetMetadataDefinitions: MetadataDefinitionTypes[];
        assetMetadataDomains: Option[];
    };
}

export type AssetMetadataFormErros = FormikErrors<AssetMetadataFormValues>;
