import * as yup from 'yup';

export const creatorSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    roles: yup
        .array()
        .of(yup.string().required())
        .min(1, 'At least one role is required')
        .max(10, 'Maximum 10 roles are allowed')
        .required(),
    bio: yup.string().required('Bio is required'),
    profileUrl: yup.string().url('Invalid URL').required('Profile URL is required'),
    nationality: yup.string(),
    residence: yup.string(),
    ethnicity: yup.string(),
    gender: yup.string(),
});

export const creatorsSchema = yup.array().of(creatorSchema);
