import { Box, Typography } from '@mui/material';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';
import { useSelector } from '@/store/hooks';

function ArtCards({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.artCards || {};

    const { language } = useI18n();

    const licenseArtCards = useSelector((state) => state.user.assets.licenseArtCards);
    const licenseArtCardsEnabled = useSelector((state) => state.user?.licenses?.artCards || 3);

    const texts = {
        artCardsDescription: language['studio.consignArtwork.licenses.artCards.description'],
        artCardsEnable: language['studio.consignArtwork.licenses.artCards.enable'],
        artCardsEnableDescription: language['studio.consignArtwork.licenses.artCards.enable.description'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        if (licenseArtCards >= licenseArtCardsEnabled && added) {
            return;
        }

        setFieldValue('artCards.added', added);
        setFieldValue('artCards.version', '1');
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="ART-CARDS-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                <Box p={1.5} display="flex" flexDirection="column">
                    <Typography
                        mb="auto"
                        style={{ wordWrap: 'break-word' }}
                        color="grey"
                        fontWeight="500"
                        variant="subtitle1"
                        component="label"
                        fontSize="1rem"
                    >
                        {values?.added ? texts.artCardsEnableDescription : texts.artCardsDescription}
                    </Typography>
                    <Typography mt={2} fontWeight="bold">
                        {licenseArtCards} of {licenseArtCardsEnabled} Licenses Enabled
                    </Typography>
                </Box>
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    ART-CARDS-1 License
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {texts.artCardsEnableDescription}
                </Typography>
            </Box>
        </Box>
    );
}

export default ArtCards;
