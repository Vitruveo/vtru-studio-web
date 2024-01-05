import * as yup from 'yup';

export const LicensesSchemaValidation = yup.object({
    licenses: yup
        .array()
        .of(
            yup.object().shape({
                licenseMetadataDefinitions: yup.array().when('added', {
                    is: true,
                    then: yup.array().of(
                        yup.object().shape({
                            value: yup.mixed().test('customValidation', '', (value, context) => {
                                const validateCreateFunction = new Function(context.parent.validation.trim());

                                const result = validateCreateFunction()(value, 'en');

                                if (!result.isValid)
                                    throw context.createError({ path: context.path, message: result.message });
                                return result.isValid;
                            }),
                        })
                    ),
                }),
            })
        )
        .test('containsAddedTrue', 'Add a license', function (value) {
            if (!value) return false;
            const hasAddedTrue = value.some((obj) => obj.added === true);
            return hasAddedTrue;
        }),
});
