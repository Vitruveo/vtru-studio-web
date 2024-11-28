import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { countryData } from '@/utils/countryData';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import { AsyncSelect } from '../../ui-components/select/AsyncSelect';
import { getArtworkCreatorNameThunk } from '@/features/storesArtwork/thunks';

interface FormValues {
    artists: {
        name: [string, string][];
        nationality: [string, string][];
        residence: [string, string][];
    };
}

const debounceDelay = 1000;
const ArtistItem = () => {
    const dispatch = useDispatch();
    const { setFieldValue, values } = useFormikContext<FormValues>();
    const { name } = useSelector((state) => state.storeArtwork);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const onChange = (value: [string, string][], fieldName: string) => {
        setFieldValue(fieldName, value);
    };

    const getArtworkCreatorName = (inputValue: string) => {
        dispatch(getArtworkCreatorNameThunk(inputValue));
        return name.map((item) => ({
            value: item.collection,
            label: item.collection,
        }));
    };

    const loadOptions = (inputValue: string, callback: (options: any) => void) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            callback(getArtworkCreatorName(inputValue));
        }, debounceDelay);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Name</Typography>
                <AsyncSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'artists.name');
                    }}
                    loadOptions={loadOptions}
                    options={name.map((item) => ({
                        value: item.collection,
                        label: item.collection,
                    }))}
                    value={values.artists.name.map((item) => ({ value: item[0], label: item[1] }))}
                />
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
