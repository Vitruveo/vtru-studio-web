import * as yup from 'yup';

export const AssetMediaSchemaValidation = yup.object({
    asset: yup
        .mixed()
        .required('field asset is required.')
        .test('checkFileType', 'Invalid file type. Please upload a valid file.', (asset) => {
            if (!asset.file) return false;
            const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
            return allowedFileTypes.includes(asset.file.type);
        }),
});
