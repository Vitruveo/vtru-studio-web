import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { licensesOptions } from '../filters/options';

interface LicensesFilterProps {
    content: { [key: string]: boolean };
}

export const LicensesFilter = ({ content }: LicensesFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (key: string) => {
        setFieldValue(`licenseChecked.${key}.added`, false);
    };

    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {Object.entries(content)
                .filter(([_key, value]) => !!value)
                .map(([key, _value]) => (
                    <Paper key={key} sx={{ padding: 1, display: 'flex' }}>
                        <Typography>{licensesOptions.find((item) => item.name === key)?.label}</Typography>
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
