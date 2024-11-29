import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

interface MultiSelectFilterProps {
    content: { title: string; key: string; value: [string, string][] };
}

export const MultiSelectFilter = ({ content }: MultiSelectFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (title: string, key: string, value: [string, string]) => {
        setFieldValue(
            `${title}.${key}`,
            content.value.filter((item) => item !== value)
        );
    };

    if (!content.value.length) return null;

    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {content.value.map((item) => (
                <Paper key={item[0]} sx={{ padding: 1, display: 'flex' }}>
                    <Typography variant="body1">{item[1]}</Typography>
                    <Delete
                        fontSize="small"
                        color="error"
                        onClick={() => handleDeleteITem(content.title, content.key, item)}
                        cursor={'pointer'}
                    />
                </Paper>
            ))}
        </Box>
    );
};
