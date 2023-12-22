import { Licenses, MetadataDefinitionTypes } from '../../components/wizard/types';

export const assetMetadataDomains = [
    { value: 'artwork', label: 'Artwork' },
    // { value: 'music', label: 'Music' },
];

export const assetMetadataDefinitions: MetadataDefinitionTypes[] = [
    {
        order: 2,
        title: 'Creator ID',
        name: 'creatorId',
        value: '',
        auto: {
            nameTargetFieldValue: 'emails',
            selectOptions: {
                labelOptionField: ['email'],
                valueOptionField: ['email'],
            },
        },
        type: 'select',
        options: [],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 2,
        title: 'Wallet ID',
        name: 'walletId',
        value: '',
        auto: {
            nameTargetFieldValue: 'wallets',
            selectOptions: {
                labelOptionField: ['network.name', 'address'],
                valueOptionField: ['network.name', 'address'],
            },
        },
        type: 'select',
        options: [],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        domain: 'music',
        order: 0,
        name: 'title',
        value: '',
        title: 'Title',
        type: 'string',
        required: true,
        validation: `
      return function validate(value, language) {
      if(!value || value.length === 0) return { message: 'field required', isValid: false };
      return { message: '', isValid: true };
    }
  `,
    },
    {
        order: 2,
        title: 'Category',
        name: 'category',
        value: '',
        type: 'select',
        options: [
            { value: 'photography', label: 'Photography' },
            { value: 'painting', label: 'Painting' },
            { value: '3D', label: '3D' },
            { value: 'animation', label: 'Animation' },
        ],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        domain: 'music',
        order: 0,
        name: 'date',
        value: '',
        title: 'Date',
        type: 'date',
        required: true,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        domain: 'music',
        order: 0,
        name: 'description',
        value: '',
        title: 'Description',
        type: 'string',
        required: true,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 2,
        title: 'Category',
        name: 'category',
        value: '',
        type: 'select',
        options: [
            { value: 'photography', label: 'Photography' },
            { value: 'painting', label: 'Painting' },
            { value: '3D', label: '3D' },
            { value: 'animation', label: 'Animation' },
        ],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 2,
        title: 'Medium',
        name: 'medium',
        value: '',
        type: 'select',
        options: [
            { value: 'oil', label: 'oil' },
            { value: 'watercolour', label: 'watercolour' },
            { value: 'digital', label: 'digital' },
            { value: 'photography', label: 'photography' },
            { value: 'analog', label: 'analog' },
            { value: 'bronze', label: 'bronze' },
            { value: 'clay', label: 'clay' },
        ],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        domain: 'music',
        order: 0,
        name: 'place',
        value: '',
        title: 'Place',
        type: 'string',
        required: true,
        validation: `
        return function validate(value, language) {
        return { message: '', isValid: true };
      }
    `,
    },
    // {
    //     order: 2,
    //     title: 'Copyright',
    //     name: 'copyright',
    //     value: '',
    //     type: 'select',
    //     options: [],
    //     required: false,
    //     validation: `
    //     return function validate(value, language) {
    //     if(!value || value.length === 0) return { message: 'field required', isValid: false };
    //     return { message: '', isValid: true };
    //   }
    // `,
    // },
    {
        order: 2,
        title: 'Object Type',
        value: '',
        name: 'objecttype',
        type: 'select',
        options: [
            { value: 'video', label: 'video' },
            { value: 'painting', label: 'painting' },
            { value: 'print', label: 'print' },
            { value: 'digital', label: 'digital' },
        ],
        required: false,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
];

export const creatorMetadataDefinitions: MetadataDefinitionTypes[] = [
    {
        order: 0,
        name: 'artistName',
        value: '',
        title: 'Artist Name',
        type: 'string',
        required: true,
        validation: `
        return function validate(value, language) {
        if(!value || value.length === 0) return { message: 'field required', isValid: false };
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 1,
        title: 'Artist Role(s)',
        name: 'artistRole',
        value: '',
        type: 'select',
        options: [
            { value: 'artist', label: 'Artist' },
            { value: 'photographer', label: 'Photographer' },
            { value: 'painter', label: 'Painter' },
            { value: 'collector', label: 'Collector' },
        ],
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 2,
        name: 'artistBiography',
        value: '',
        title: 'Artist Biography',
        type: 'string',
        required: true,
        validation: `
        return function validate(value, language) {
      
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Artist Image',
        name: 'artistImage',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
        
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Birth Date',
        name: 'birthDate',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Birth Location',
        name: 'birthLocation',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
      
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Death Date',
        name: 'deathDate',
        value: '',
        type: 'date',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Death Location',
        name: 'deathLocation',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
        
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Nationality',
        name: 'nationality',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
        
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Residence',
        name: 'residence',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Ethinicity',
        name: 'ethinicity',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Gender',
        name: 'gender',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
    {
        order: 4,
        title: 'Resources',
        name: 'resources',
        value: '',
        type: 'string',
        required: false,
        validation: `
        return function validate(value, language) {
       
        return { message: '', isValid: true };
      }
    `,
    },
];

export const licenses: Licenses = [
    {
        title: 'Stream v1.0',
        domain: 'stream',
        version: '1.0',
        added: false,
        enable: true,
        licenseMetadataDefinitions: [],
    },
    {
        title: 'Print v1.0',
        domain: 'print',
        version: '1.0',
        added: false,
        enable: true,
        licenseMetadataDefinitions: [
            {
                domain: 'print',
                value: 0,
                order: 0,
                name: 'maximumUnits',
                title: 'Maximum Units',
                type: 'integer',
                required: true,
                validation: `
                return function validate(value, language) {
                if(!value || value.length === 0) return { message: 'field required', isValid: false };
                return { message: '', isValid: true };
              }
            `,
            },
            {
                domain: 'print',
                value: 0,
                order: 0,
                name: 'unitPrice',
                title: 'Unit Price',
                type: 'cents',
                required: true,
                validation: `
                return function validate(value, language) {
                if(!value || value.length === 0) return { message: 'field required', isValid: false };
                return { message: '', isValid: true };
              }
            `,
            },
        ],
    },
    {
        title: 'NFT v1.0',
        domain: 'NFT',
        version: '1.0',
        added: false,
        enable: true,
        licenseMetadataDefinitions: [
            {
                domain: 'NFT',
                order: 0,
                value: 0,
                name: 'maximumEditions',
                title: 'Maximum Editions',
                type: 'integer',
                required: true,
                validation: `
                return function validate(value, language) {
                if(!value || value.length === 0) return { message: 'field required', isValid: false };
                return { message: '', isValid: true };
              }
            `,
            },
            {
                domain: 'NFT',
                value: 0,
                order: 0,
                name: 'editionPrice',
                title: 'Edition Price',
                type: 'cents',
                required: true,
                validation: `
                return function validate(value, language) {
                if(!value || value.length === 0) return { message: 'field required', isValid: false };
                return { message: '', isValid: true };
              }
            `,
            },

            {
                domain: 'NFT',
                value: false,
                order: 0,
                name: 'elasticEditions',
                title: 'Elastic Editions',
                type: 'boolean',
                required: true,
                validation: `
                return function validate(value, language) {
                if(!value || value.length === 0) return { message: 'field required', isValid: false };
                return { message: '', isValid: true };
              }
            `,
            },
        ],
    },
];
