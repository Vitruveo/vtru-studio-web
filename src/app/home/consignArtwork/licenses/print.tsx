import { Box, Typography } from '@mui/material';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';

function Print({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.print || {};

    const { language } = useI18n();

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        printDescription: language['studio.consignArtwork.licenses.print.description'],
        printEnable: language['studio.consignArtwork.licenses.print.enable'],
        singlePrintTitle: language['studio.consignArtwork.licenses.print.singlePrint.title'],
        singlePrintDescription: language['studio.consignArtwork.licenses.print.singlePrint.description'],
        singlePrintField: language['studio.consignArtwork.licenses.print.singlePrint.field'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        setFieldValue('print.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="PRINT-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
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
                            {texts.printDescription}
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        p={1.5}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography sx={{ whiteSpace: 'nowrap', marginRight: 3 }}>{texts.singlePrintField}</Typography>
                        <CustomTextField
                            name="print.unitPrice"
                            type="number"
                            InputProps={{
                                sx: {
                                    backgroundColor: '#fff',
                                },
                            }}
                            value={values?.unitPrice}
                            inputProps={{ maxLength: 185, minLength: 1 }}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                )}
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values?.added ? texts.singlePrintTitle : `PRINT-ART-1 ${texts.license}`}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values?.added ? texts.singlePrintDescription : texts.printEnable}
                </Typography>
            </Box>
        </Box>
    );
}

export default Print;
