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

const forbiddenDomains = ['x.com', 'google.com', 'instagram.com', 'vitruveo.xyz', 'xibit.app'];

export const ProfileSchemaValidation = yup.object({
    myWebsite: yup
        .string()
        .nullable()
        .url('Please enter a valid URL')
        .test('not-root-domain', 'Root domains are not allowed. Please provide a more specific link.', (value) => {
            if (!value) return true;
            try {
                const url = new URL(value);
                const domainParts = url.hostname.split('.');
                const hasSubdomain = domainParts.length > 2;
                const hasPath = url.pathname && url.pathname !== '/';
                return !!hasSubdomain || !!hasPath;
            } catch (err) {
                return false;
            }
        })
        .test('not-forbidden-domain', 'This domain is not allowed.', (value) => {
            if (!value) return true;
            try {
                const url = new URL(value);
                return !forbiddenDomains.includes(url.hostname);
            } catch (err) {
                return false;
            }
        })
        .test('debounced-validation', 'Please enter a valid URL', validateWithDelay(yup.string().url())),
});
