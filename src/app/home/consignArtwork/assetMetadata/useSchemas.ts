import { RJSFSchema } from '@rjsf/utils';
import { useI18n } from '@/app/hooks/useI18n';

export const useAssetMetadataSchemas = () => {
    const { language } = useI18n();

    const langBasePath = 'studio.consignArtwork.assetMetadata.field';

    const texts = {
        artistName: language[`${langBasePath}.artistName`],
        title: language[`${langBasePath}.title`],
        description: language[`${langBasePath}.description`],
        date: language[`${langBasePath}.date`],
        place: `${langBasePath}.place`,
        objectType: language[`${langBasePath}.objectType`],
        category: language[`${langBasePath}.category`],
        medium: language[`${langBasePath}.medium`],
    } as { [key: string]: string };

    const uiSchemaSection1 = {
        artistName: {
            'ui:options': {
                label: false,
                placeholder: 'A sample artistName',
            },
        },
        title: {
            'ui:options': {
                label: false,
                placeholder: 'A sample title',
            },
        },
        description: {
            'ui:options': {
                label: false,
                placeholder: 'A sample description',
            },
        },
    };

    const uiSchemaSection2 = {
        date: {
            'ui:options': {
                label: false,
                placeholder: 'A sample date',
            },
        },
        place: {
            'ui:options': {
                label: false,
                placeholder: 'A sample place',
            },
        },
        objectType: {
            'ui:options': {
                label: false,
                placeholder: 'A sample objectType',
            },
        },
    };

    const uiSchemaSection3 = {
        category: {
            'ui:options': {
                label: false,
                placeholder: 'A sample category',
            },
        },
        medium: {
            'ui:options': {
                label: false,
                placeholder: 'A sample medium',
            },
        },
        // tags: {
        //     'ui:options': {
        //         label: false,
        //         placeholder: 'A sample medium',
        //     },
        // },
    };

    const schemaSection1: RJSFSchema = {
        type: 'object',
        required: ['artistName', 'title', 'description'],
        properties: {
            artistName: {
                type: 'string',
                title: texts.artistName,
                description: 'A sample title',
                default: '',
            },
            title: {
                type: 'string',
                title: texts.title,
                description: 'A sample title',
                default: '',
            },
            description: {
                type: 'string',
                title: texts.description,
                description: 'A sample description',
                default: '',
            },
        },
    };

    const schemaSection2: RJSFSchema = {
        type: 'object',
        required: ['date'],
        properties: {
            date: {
                type: 'string',
                title: texts.date,
                description: 'A sample date',
                default: '',
                format: 'date',
            },
            place: {
                type: 'string',
                title: texts.title,
                description: 'A sample place',
                default: '',
            },
            objectType: {
                type: 'string',
                title: texts.objectType,
                description: 'A sample objectType',
                enum: ['video', '2D', '3D', 'phygital', 'other'],
                default: '',
            },
        },
    };

    const schemaSection3: RJSFSchema = {
        type: 'object',
        properties: {
            category: {
                type: 'string',
                title: texts.category,
                description: 'A sample date',
                default: '',
                enum: [
                    'photography',
                    'painting',
                    '3D',
                    'video',
                    'mixedMedia',
                    'illustration',
                    'collage',
                    'ai',
                    'other',
                ],
            },
            medium: {
                type: 'string',
                title: texts.medium,
                description: 'A sample place',
                default: '',
                enum: [
                    'oil',
                    'watercolour',
                    'acrylic',
                    'ink',
                    'illustration',
                    'collage',
                    'AI',
                    'mixedMedia',
                    'film',
                    'photography',
                    'analogPhotography',
                    'digitalPhotography',
                    'compositePhotography',
                    'other',
                ],
            },
            // tags: {
            //     default: [],
            //     type: 'array',
            //     title: 'Tags',
            //     items: {
            //         type: 'string',
            //     },
            //     uniqueItems: true,
            // },
        },
    };

    return {
        schemaSection1,
        schemaSection2,
        schemaSection3,
        uiSchemaSection1,
        uiSchemaSection2,
        uiSchemaSection3,
    };
};
