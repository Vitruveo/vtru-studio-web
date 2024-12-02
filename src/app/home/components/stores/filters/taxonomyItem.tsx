import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import {
    aiGenerationOptions,
    arEnabledOptions,
    categoryOptions,
    mediumOptions,
    nudityOptions,
    objectTypeOptions,
    styleOptions,
} from './options';
import { FieldArray, useFormikContext } from 'formik';
import { useDispatch } from '@/store/hooks';
import { AsyncSelect } from '../../ui-components/select/AsyncSelect';
import {
    getArtworkCollectionsThunk,
    getArtworkSubjectThunk,
    getArtworkTagsThunk,
} from '@/features/storesArtwork/thunks';

interface FormValues {
    taxonomy: {
        objectType: [string, string][];
        tags: [string, string][];
        collections: string[];
        aiGeneration: [string, string][];
        arEnabled: [string, string][];
        nudity: [string, string][];
        category: [string, string][];
        medium: [string, string][];
        style: [string, string][];
        subject: [string, string][];
    };
}

const debounceDelay = 1000;
const TaxonomyItem = () => {
    const dispatch = useDispatch();
    const { setFieldValue, values } = useFormikContext<FormValues>();
    const [tags, setTags] = useState<{ tag: string }[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const onChange = (value: [string, string][], fieldName: string) => {
        setFieldValue(fieldName, value);
    };

    const getArtworkTags = async () => {
        const responseTags = await dispatch(getArtworkTagsThunk());
        setTags(responseTags);
    };

    useEffect(() => {
        getArtworkTags();
    }, []);

    const getArtworkCollections = async (inputValue: string) => {
        const collections = await dispatch(getArtworkCollectionsThunk(inputValue));
        return collections.map((item) => ({
            value: item.collection,
            label: item.collection,
        }));
    };
    const loadOptionsCollections = (inputValue: string, callback: (options: any) => void) => {
        if (!inputValue.trim() || inputValue.length < 3) {
            callback([]);
            return;
        }
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(async () => {
            const options = await getArtworkCollections(inputValue.trim());
            callback(options);
        }, debounceDelay);
    };

    const getArtworkSubject = async (inputValue: string) => {
        const subjects = await dispatch(getArtworkSubjectThunk(inputValue));
        return subjects.map((item) => ({
            value: item.subject,
            label: item.subject,
        }));
    };
    const loadOptionsSubject = (inputValue: string, callback: (options: any) => void) => {
        if (!inputValue.trim() || inputValue.length < 3) {
            callback([]);
            return;
        }
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(async () => {
            const options = await getArtworkSubject(inputValue.trim());
            callback(options);
        }, debounceDelay);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Object type</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.objectType');
                    }}
                    options={objectTypeOptions}
                    value={values.taxonomy.objectType.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Tags</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.tags');
                    }}
                    options={tags.map((tag) => ({ value: tag.tag, label: tag.tag }))}
                    value={values.taxonomy.tags.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Collections</Typography>
                <FieldArray
                    name="taxonomy.collections"
                    render={(arrayHelpers) => (
                        <AsyncSelect
                            onChange={(_, actionMeta) => {
                                if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                                    arrayHelpers.remove(
                                        values.taxonomy.collections.indexOf(actionMeta.removedValue.value)
                                    );
                                }

                                if (actionMeta.action === 'select-option' && actionMeta.option) {
                                    arrayHelpers.push(actionMeta.option.value);
                                }
                            }}
                            loadOptions={loadOptionsCollections}
                            value={values.taxonomy.collections.map((item) => ({ value: item, label: item }))}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">AI generation</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.aiGeneration');
                    }}
                    options={aiGenerationOptions}
                    value={values.taxonomy.aiGeneration.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">AR enabled</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.arEnabled');
                    }}
                    options={arEnabledOptions}
                    value={values.taxonomy.arEnabled.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Nudity</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.nudity');
                    }}
                    options={nudityOptions}
                    value={values.taxonomy.nudity.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Category</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.category');
                    }}
                    options={categoryOptions}
                    value={values.taxonomy.category.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Medium</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.medium');
                    }}
                    options={mediumOptions}
                    value={values.taxonomy.medium.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Style</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.style');
                    }}
                    options={styleOptions}
                    value={values.taxonomy.style.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Subject</Typography>
                <AsyncSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'taxonomy.subject');
                    }}
                    loadOptions={loadOptionsSubject}
                    value={values.taxonomy.subject.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
        </Box>
    );
};

export default TaxonomyItem;
