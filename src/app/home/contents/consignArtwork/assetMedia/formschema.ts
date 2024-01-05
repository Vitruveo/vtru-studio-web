import * as yup from 'yup';

export const AssetMetadataSchemaValidation = yup.object({
    assetMetadata: yup.object({
        assetMetadataDefinitions: yup.array().of(
            yup.object().shape({
                value: yup.mixed().test('customValidation', '', (value, context) => {
                    const validateCreateFunction = new Function(context.parent.validation.trim());

                    const result = validateCreateFunction()(value, 'en');

                    if (!result.isValid) throw context.createError({ path: context.path, message: result.message });
                    return result.isValid;
                }),
            })
        ),
    }),
});
