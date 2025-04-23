import { Box, Typography } from '@mui/material';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch, useSelector } from '@/store/hooks';
import { updatePrintLicenseAddedThunk } from '@/features/asset/thunks';

function Print({ allValues, setFieldValue }: LicenseProps) {
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);

    const dispatch = useDispatch();
    const { language } = useI18n();

    const assetId = useSelector((state) => state.asset._id);

    const values = allValues.print || {};

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        printDescription: language['studio.consignArtwork.licenses.print.description'],
        printEnable: language['studio.consignArtwork.licenses.print.enable'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        if (hasContract) dispatch(updatePrintLicenseAddedThunk({ assetKey: assetId, added }));
        setFieldValue('print.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="PRINT-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
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
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {`PRINT-ART-1 ${texts.license}`}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {texts.printEnable}
                </Typography>
            </Box>
        </Box>
    );
}

export default Print;
