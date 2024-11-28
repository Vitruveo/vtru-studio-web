import { Delete } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

interface ShortcutFilterProps {
    content: { [key: string]: boolean };
}

export const ShortcutFilter = ({ content }: ShortcutFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (key: string) => {
        setFieldValue(`general.shortcuts.${key}`, false);
    };

    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {Object.entries(content).map(([key, value]) => (
                <Box key={key} display={'flex'} gap={1}>
                    {!!value && (
                        <>
                            <Typography variant="body1">{key}</Typography>
                            <Delete
                                fontSize="small"
                                color="error"
                                onClick={() => handleDeleteITem(key)}
                                cursor={'pointer'}
                            />
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
};
