import { Box, Typography } from '@mui/material';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';

function Stream({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.stream || {};

    const { language } = useI18n();

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        streamDescription: language['studio.consignArtwork.licenses.stream.description'],
        streamEnable: language['studio.consignArtwork.licenses.stream.enable'],
        streamEnableDescription: language['studio.consignArtwork.licenses.stream.enable.description'],
        unlimitedStreaming: language['studio.consignArtwork.licenses.stream.unlimitedStreaming'],
        unlimitedStreamingDescription: language['studio.consignArtwork.licenses.stream.unlimitedStreaming.description'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        setFieldValue('stream.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="STREAM-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                <Box p={1.5} display='flex' flexDirection='column'>
                    <Typography
                        mb='auto'
                        style={{ wordWrap: 'break-word' }}
                        color="grey"
                        fontWeight="500"
                        variant="subtitle1"
                        component="label"
                        fontSize="1rem"
                    >
                        {values?.added ? texts.streamEnableDescription : texts.streamDescription}
                    </Typography>
                </Box>
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values?.added ? texts.unlimitedStreaming : `STREAM-ART-1 ${texts.license}`}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values?.added ? texts.unlimitedStreamingDescription : texts.streamEnable}
                </Typography>
            </Box>
        </Box>
    );
}

export default Stream;
