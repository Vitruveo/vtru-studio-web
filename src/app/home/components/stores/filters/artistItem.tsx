import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { countryData } from '@/utils/countryData';
import { useFormikContext } from 'formik';

interface FormValues {
    artists: {
        name: [string, string][];
        nationality: [string, string][];
        residence: [string, string][];
    };
}

const ArtistItem = () => {
    const { setFieldValue, values } = useFormikContext<FormValues>();

    const onChange = (value: [string, string][], fieldName: string) => {
        setFieldValue(fieldName, value);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Name</Typography>
                <MultiSelect onChange={() => {}} options={[]} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Nationality</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'artists.nationality');
                    }}
                    options={countryData.map((item) => ({
                        value: item.code,
                        label: item.label,
                    }))}
                    value={values.artists.nationality.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Residence</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'artists.residence');
                    }}
                    options={countryData.map((item) => ({
                        value: item.code,
                        label: item.label,
                    }))}
                    value={values.artists.residence.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
        </Box>
    );
};

export default ArtistItem;