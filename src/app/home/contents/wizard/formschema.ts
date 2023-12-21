import * as yup from 'yup';
import { debounce, set } from 'lodash';
import { checkCreatorEmailExist, checkCreatorUsernameExist } from '@/features/user/requests';
import { AxiosError } from 'axios';
import { CreatorUsernameExistApiRes } from '@/features/user/types';
import { codesVtruApi } from '@/services/codes';

export const validateEmailFormValue = yup.object({
    email: yup.string().email('Invalid email address').required('field email is required.'),
});

export const debouncedEmailValidation = debounce((email, setErrors) => {
    checkCreatorEmailExist({ email }).then((response) => {
        if (response.data) setErrors();
    });
}, 700);

export const debouncedUsernameValidation = debounce(async (username, setFieldError) => {
    try {
        const res = await checkCreatorUsernameExist({ username });

        if (codesVtruApi.success.user.includes(res?.code as string)) {
            setFieldError('Username already exists');
        }
    } catch (e) {
        const error = e as AxiosError<CreatorUsernameExistApiRes>;
        setFieldError('');
    }
}, 700);

export const stepsSchemaValidation = yup.object({
    emails: yup.array().of(
        yup.object().shape({
            email: yup.string().email('Invalid email address').required('field email is required.'),
        })
    ),
    wallets: yup.array().min(1),
    username: yup.string().required('field username is required.'),
    profile: yup
        .mixed()
        .required('field profile is required.')
        .test('checkFileType', 'Invalid file type. Please upload a valid file.', (file) => {
            if (!file) return false;
            const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
            return allowedFileTypes.includes(file.type);
        }),
    asset: yup
        .mixed()
        .required('field asset is required.')
        .test('checkFileType', 'Invalid file type. Please upload a valid file.', (asset) => {
            if (!asset.file) return false;
            const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
            return allowedFileTypes.includes(asset.file.type);
        }),
});
