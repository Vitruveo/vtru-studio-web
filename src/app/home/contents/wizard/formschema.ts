import * as yup from 'yup';

export const stepsSchemaValidation = yup.object({
  email: yup.string().email().required('field code is required.'),
});
