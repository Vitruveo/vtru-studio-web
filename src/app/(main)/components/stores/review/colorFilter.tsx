import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

interface ColorFilterProps {
    content: string[];
}

export const ColorFilter = ({ content }: ColorFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (item: string) => {
        setFieldValue(
            'context.colors',
            content.filter((color) => color !== item)
        );
    };

    return (
        <Box ml={1} display={'flex'} gap={1}>
            {content.map((item) => (
                <Box key={item} display={'flex'}>
                    <Paper
                        key={item}
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: item,
                        }}
                    />
                    <Delete fontSize="small" color="error" onClick={() => handleDeleteITem(item)} cursor={'pointer'} />
                </Box>
            ))}
        </Box>
    );
};

interface ColorPrecisionFilterProps {
    content: { value: number };
}

export const ColorPrecisionFilter = ({ content }: ColorPrecisionFilterProps) => {
    return (
        <Typography variant="body1" ml={1}>
            {Number(content.value) * 100}%
        </Typography>
    );
};
