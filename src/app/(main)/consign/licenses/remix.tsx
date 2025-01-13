import { Box, Typography } from '@mui/material';
import CustomTextField from '@/app/(main)/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';

function Remix({ allValues, setFieldValue, handleChange }: LicenseProps) {
    const values = allValues.remix || {};

    const { language } = useI18n();

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        remixDescription: language['studio.consignArtwork.licenses.remix.description'],
        remixDescription2: language['studio.consignArtwork.licenses.remix.description2'],
        singleRemixTitle: language['studio.consignArtwork.licenses.remix.singleRemix.title'],
        singleRemixDescription: language['studio.consignArtwork.licenses.remix.singleRemix.description'],
        singleRemixField: language['studio.consignArtwork.licenses.remix.singleRemix.field'],
        remixEnable: language['studio.consignArtwork.licenses.remix.enable'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        setFieldValue('remix.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="REMIX-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                {!values?.added ? (
                    <Box p={1.5}>
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            {texts.remixDescription}
                            <Typography
                                color="text.secondary"
                                display="inline"
                                sx={{ textDecoration: 'underline', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                            >
                                {'  '}
                                CC BY-NC{' '}
                            </Typography>
                            {texts.remixDescription2}
                        </Typography>
                    </Box>
                ) : (
                    <Box p={1.5}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography>{texts.singleRemixField}</Typography>
                            <CustomTextField
                                name="remix.unitPrice"
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values?.unitPrice}
                                inputProps={{ maxLength: 185, minLength: 1 }}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" alignItems="center" mt={3} justifyContent="space-between">
                            <Typography>Available</Typography>
                            <CustomTextField
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values.availableLicenses}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                                name="remix.availableLicenses"
                            />
                        </Box>
                    </Box>
                )}
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values?.added ? texts.singleRemixTitle : `REMIX-ART-1 ${texts.license}`}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values?.added ? texts.singleRemixDescription : texts.remixEnable}
                </Typography>
            </Box>
        </Box>
    );
}

export default Remix;
