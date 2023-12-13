import { checkCreatorEmailExist, checkCreatorUsernameExist } from '@/features/user/requests';

import * as yup from 'yup';

export const stepsSchemaValidation = yup.object({
  email: yup
    .string()
    .email()
    .required('field email is required.')
    .test('checkEmailUnique', 'This email is already registered.', async (email) => {
      if (!email) return false;
      const response = await checkCreatorEmailExist({ email });
      return !response.data;
    }),
  wallet: yup.string().required('field wallet is required.'),
  username: yup
    .string()
    .required('field username is required.')
    .test('checkUserNameUnique', 'This username is already registered.', async (username) => {
      if (!username) return false;
      const response = await checkCreatorUsernameExist({ username });
      return !response.data;
    }),
  file: yup
    .mixed()
    .required('field asset is required.')
    .test('checkFileType', 'Invalid file type. Please upload a valid file.', (file) => {
      if (!file) return false;
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
      return allowedFileTypes.includes(file.type);
    }),
});
