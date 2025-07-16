import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { shortcutsOptions } from '../filters/options';

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
            {Object.entries(content)
                .filter(([_key, value]) => !!value)
                .map(([key, _value]) => (
                    <Paper key={key} sx={{ padding: 1, display: 'flex' }}>
                        <Typography>{shortcutsOptions.find((item) => item.name === key)?.label}</Typography>
                        <Delete
                            fontSize="small"
                            color="error"
                            onClick={() => handleDeleteITem(key)}
                            cursor={'pointer'}
                        />
                    </Paper>
                ))}
        </Box>
    );
};
