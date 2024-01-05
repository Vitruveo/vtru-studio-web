export interface Auto {
    nameTargetFieldValue: keyof any;
    selectOptions: {
        labelOptionField: string[];
        valueOptionField: string[];
    };
}

export interface Option {
    value: string;
    label: string;
}

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

export interface MetadataFieldsProps {
    values: any;
    errors: any;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    formkFieldPathChange: string;
    metadataDefinitions?: MetadataDefinitionTypes[];
}
