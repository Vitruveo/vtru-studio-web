import { Delete } from '@mui/icons-material';
import { Box, Card, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

interface FormValues {
    include: {
        arts: { value: string; label: string }[];
        artists: { value: string; label: string }[];
    };
}

export const ReviewInclude = () => {
    const { values, setFieldValue } = useFormikContext<FormValues>();

    const handleDeleteITem = (key: 'arts' | 'artists', value: string) => {
        setFieldValue(
            `include.${key}`,
            values.include[key].filter((item) => item.value !== value)
        );
    };

    return (
        <Box padding={2} paddingTop={4}>
            <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="overline" fontWeight="bold">
                    Include
                </Typography>
                {values.include.arts && values.include.arts.length > 0 && (
                    <Box>
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                            Arts
                        </Typography>
                        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                            {values.include.arts.map((item, index) => (
                                <Paper key={index} sx={{ padding: 1, display: 'flex' }}>
                                    <Typography variant="body1">{item.label}</Typography>
                                    <Delete
                                        fontSize="small"
                                        color="error"
                                        onClick={() => handleDeleteITem('arts', item.value)}
                                        cursor={'pointer'}
                                    />
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                )}
                {values.include.artists && values.include.artists.length > 0 && (
                    <Box>
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                            Artists
                        </Typography>
                        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                            {values.include.artists.map((item, index) => (
                                <Paper key={index} sx={{ padding: 1, display: 'flex' }}>
                                    <Typography variant="body1">{item.label}</Typography>
                                    <Delete
                                        fontSize="small"
                                        color="error"
                                        onClick={() => handleDeleteITem('artists', item.value)}
                                        cursor={'pointer'}
                                    />
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                )}
            </Card>
        </Box>
    );
};
