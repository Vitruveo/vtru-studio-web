import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { cultureOptions } from '../filters/options';

interface MultiSelectFilterProps {
    content: { title: string; key: string; value: string[] };
}

const options: Record<string, { [key: string]: { label: string; value: string }[] }> = {
    context: {
        culture: cultureOptions,
    },
    taxonomy: {
        collections: [],
    },
    artists: {},
    general: {},
};

export const MultiSelectFilter = ({ content }: MultiSelectFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (title: string, key: string, value: string) => {
        setFieldValue(
            `${title}.${key}`,
            content.value.filter((item) => item !== value)
        );
    };

    if (!content.value.length) return null;

    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {content.value.map((item) => (
                <Paper key={item} sx={{ padding: 1, display: 'flex' }}>
                    <Typography variant="body1">
                        {options[content.title][content.key].length
                            ? options[content.title][content.key].find((option) => option.value === item)?.label
                            : item}
                    </Typography>
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
