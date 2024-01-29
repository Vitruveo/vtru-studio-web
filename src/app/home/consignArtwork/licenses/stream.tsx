import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';

function Stream({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.stream;

    const handleAdded = (added: boolean) => {
        setFieldValue('stream.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="STREAM-ART-1" added={values.added} setAdded={handleAdded} width={320} height={400}>
                <Box paddingLeft={7} paddingTop={3} paddingRight={3}>
                    <Typography
                        style={{ wordWrap: 'break-word' }}
                        color="grey"
                        fontWeight="500"
                        variant="subtitle1"
                        component="label"
                        fontSize="1rem"
                    >
                        {values.added
                            ? 'Stream earnings are automatically calculated based on usage and negotiated price agreements.'
                            : 'This license makes the artwork available to curators for including in playlists for streaming art to digital frames. Earnings for streaming are automatically calculated based on usage and negotiated price agreements.'}
                    </Typography>
                </Box>
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values.added ? 'Unlimited Streaming' : 'STREAM-ART-1 License'}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values.added
                        ? 'The artwork may be used for streaming in unlimited scenarios.'
                        : 'Enable this license if you want curators to include your artwork in playlists that are used by consumers and businesses for slideshows on digital frames.'}
                </Typography>
            </Box>
        </Box>
    );
}

export default Stream;
