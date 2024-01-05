import * as yup from 'yup';

export const TermsOfUseSchemaValidation = yup.object({
    contract: yup.bool().oneOf([true], 'Contract not accepted'),
});
