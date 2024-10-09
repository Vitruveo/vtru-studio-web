import * as yup from 'yup';
import { debounce } from 'lodash';

const debounceValidation = debounce(
    (schema: yup.StringSchema, value: any, callback: (err: yup.ValidationError | null) => void) => {
        schema
            .validate(value)
            .then(() => callback(null))
            .catch((err) => callback(err));
    },
    1000
);

const validateWithDelay = (schema: yup.StringSchema) => {
    return (value: any, context: yup.TestContext) => {
        return new Promise<boolean>((resolve, reject) => {
            debounceValidation(schema, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    };
};

export const linkSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    url: yup.string().url('Please enter a valid URL').required('URL is required'),
});

export const ProfileSchemaValidation = yup.object({
    myWebsite: yup
        .string()
        .url('Please enter a valid URL')
        .test('debounced-validation', 'Please enter a valid URL', validateWithDelay(yup.string().url())),
});
