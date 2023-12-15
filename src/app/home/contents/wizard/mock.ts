import { MetadataDefinitionTypes } from '../../components/wizard/types';

export const metadataDomains = [
  { value: 'music', label: 'Music' },
  { value: 'artwork', label: 'Artwork' },
];

export const metadataDefinitions: MetadataDefinitionTypes[] = [
  {
    domain: 'music',
    order: 0,
    name: 'title',
    title: 'Title',
    type: 'string',
    required: true,
    validation: `
      function validate(value, language) {
        if (value.length < 3) return { message: 'Subject must be at least 3 characters long', isValid: false };
        return { message: '', isValid: true };
      }
    `,
  },
  {
    domain: 'music',
    order: 0,
    name: 'date',
    title: 'Date',
    type: 'string',
    required: true,
    validation: `
      function validate(value, language) {
        if (value.length < 3) return { message: 'Subject must be at least 3 characters long', isValid: false };
        return { message: '', isValid: true };
      }
    `,
  },
  {
    domain: 'music',
    order: 0,
    name: 'description',
    title: 'Description',
    type: 'string',
    required: true,
    validation: `
      function validate(value, language) {
        if (value.length < 3) return { message: 'Subject must be at least 3 characters long', isValid: false };
        return { message: '', isValid: true };
      }
    `,
  },
  {
    order: 2,
    title: 'Category',
    name: 'category',
    type: 'select',
    options: [
      { value: '1', label: 'Photography' },
      { value: '2', label: 'Painting' },
      { value: '3', label: '3D' },
      { value: '4', label: 'Animation' },
    ],
    required: false,
    validation: `
      function validate(value, language) {
        return { message: '', isValid: true };
      }
    `,
  },
  {
    order: 2,
    title: 'Medium',
    name: 'medium',
    type: 'select',
    options: [
      { value: '1', label: 'oil' },
      { value: '2', label: 'watercolour' },
      { value: '3', label: 'digital' },
      { value: '4', label: 'photography' },
      { value: '5', label: 'analog' },
      { value: '6', label: 'bronze' },
      { value: '7', label: 'clay' },
    ],
    required: false,
    validation: `
      function validate(value, language) {
        return { message: '', isValid: true };
      }
    `,
  },
  {
    domain: 'music',
    order: 0,
    name: 'place',
    title: 'Place',
    type: 'string',
    required: true,
    validation: `
      function validate(value, language) {
        if (value.length < 3) return { message: 'Subject must be at least 3 characters long', isValid: false };
        return { message: '', isValid: true };
      }
    `,
  },
  {
    order: 2,
    title: 'Copyright',
    name: 'copyright',
    type: 'select',
    options: [],
    required: false,
    validation: `
      function validate(value, language) {
        return { message: '', isValid: true };
      }
    `,
  },
  {
    order: 2,
    title: 'Object Type',
    name: 'objecttype',
    type: 'select',
    options: [
      { value: '1', label: 'video' },
      { value: '2', label: 'painting' },
      { value: '3', label: 'print' },
      { value: '4', label: 'digital' },
    ],
    required: false,
    validation: `
      function validate(value, language) {
        return { message: '', isValid: true };
      }
    `,
  },
];
