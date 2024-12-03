import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { countryData } from '@/utils/countryData';
import { FieldArray, useFormikContext } from 'formik';
import { useDispatch } from '@/store/hooks';
import { AsyncSelect } from '../../ui-components/select/AsyncSelect';
import { getArtworkCreatorNameThunk } from '@/features/storesArtwork/thunks';

interface FormValues {
    artists: {
        name: string[];
        nationality: string[];
        residence: string[];
    };
}

const debounceDelay = 1000;
const ArtistItem = () => {
    const dispatch = useDispatch();
    const { values } = useFormikContext<FormValues>();
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const getArtworkCreatorName = async (inputValue: string) => {
        const names = await dispatch(getArtworkCreatorNameThunk(inputValue));
        return names.map((item) => ({
            value: item.collection,
            label: item.collection,
        }));
    };

    const loadOptions = (inputValue: string, callback: (options: any) => void) => {
        if (!inputValue.trim() || inputValue.length < 3) {
            callback([]);
            return;
        }
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(async () => {
            const options = await getArtworkCreatorName(inputValue.trim());
            callback(options);
        }, debounceDelay);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Name</Typography>
                <FieldArray
                    name="artists.name"
                    render={(arrayHelpers) => (
                        <AsyncSelect
                            onChange={(_, actionMeta) => {
                                if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                                    arrayHelpers.remove(values.artists.name.indexOf(actionMeta.removedValue.value));
                                }

                                if (actionMeta.action === 'select-option' && actionMeta.option) {
                                    arrayHelpers.push(actionMeta.option.value);
                                }
                            }}
                            loadOptions={loadOptions}
                            value={values.artists.name.map((item) => ({ value: item, label: item }))}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Nationality</Typography>
                <FieldArray
                    name="artists.nationality"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            onChange={(_, actionMeta) => {
                                if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                                    arrayHelpers.remove(
                                        values.artists.nationality.indexOf(actionMeta.removedValue.value)
                                    );
                                }

                                if (actionMeta.action === 'select-option' && actionMeta.option) {
                                    arrayHelpers.push(actionMeta.option.value);
                                }
                            }}
                            options={countryData.map((item) => ({
                                value: item.code,
                                label: item.label,
                            }))}
                            value={values.artists.nationality.map((item) => {
                                const option = countryData.find((element) => element.code === item)!;
                                return { value: option.code, label: option.label };
                            })}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Residence</Typography>
                <FieldArray
                    name="artists.residence"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            onChange={(_, actionMeta) => {
                                if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                                    arrayHelpers.remove(
                                        values.artists.residence.indexOf(actionMeta.removedValue.value)
                                    );
                                }

                                if (actionMeta.action === 'select-option' && actionMeta.option) {
                                    arrayHelpers.push(actionMeta.option.value);
                                }
                            }}
                            options={countryData.map((item) => ({
                                value: item.code,
                                label: item.label,
                            }))}
                            value={values.artists.residence.map((item) => {
                                const option = countryData.find((element) => element.code === item)!;
                                return { value: option.code, label: option.label };
                            })}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default ArtistItem;
