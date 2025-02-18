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
        objectType: string[];
        tags: string[];
        collections: string[];
        aiGeneration: string[];
        arEnabled: string[];
        nudity: string[];
        category: string[];
        medium: string[];
        style: string[];
        subject: string[];
    };
}

const debounceDelay = 1000;
const TaxonomyItem = () => {
    const dispatch = useDispatch();
    const { values } = useFormikContext<FormValues>();
    const [tagsOptions, setTagsOptions] = useState<{ value: string; label: string }[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
        const loadOptionsTags = async (): Promise<{ value: string; label: string }[]> => {
            const tags = await dispatch(getArtworkTagsThunk());
            return tags.map((item) => ({
                value: item.tag,
                label: item.tag,
            }));
        };
        loadOptionsTags().then((options) => setTagsOptions(options));
    }, []);

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Object type</Typography>
                <FieldArray
                    name="taxonomy.objectType"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={objectTypeOptions}
                            value={values.taxonomy.objectType.map(
                                (item) => objectTypeOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Tags</Typography>
                <FieldArray
                    name="taxonomy.tags"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={tagsOptions}
                            value={values.taxonomy.tags.map((item) => ({ value: item, label: item }))}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Collections</Typography>
                <FieldArray
                    name="taxonomy.collections"
                    render={(arrayHelpers) => (
                        <AsyncSelect
                            arrayHelpers={arrayHelpers}
                            loadOptions={loadOptionsCollections}
                            value={values.taxonomy.collections.map((item) => ({ value: item, label: item }))}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">AI generation</Typography>
                <FieldArray
                    name="taxonomy.aiGeneration"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={aiGenerationOptions}
                            value={values.taxonomy.aiGeneration.map(
                                (item) => aiGenerationOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">AR enabled</Typography>
                <FieldArray
                    name="taxonomy.arEnabled"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={arEnabledOptions}
                            value={values.taxonomy.arEnabled.map(
                                (item) => arEnabledOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Nudity</Typography>
                <FieldArray
                    name="taxonomy.nudity"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={nudityOptions}
                            value={values.taxonomy.nudity.map(
                                (item) => nudityOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Category</Typography>
                <FieldArray
                    name="taxonomy.category"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={categoryOptions}
                            value={values.taxonomy.category.map(
                                (item) => categoryOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Medium</Typography>
                <FieldArray
                    name="taxonomy.medium"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={mediumOptions}
                            value={values.taxonomy.medium.map(
                                (item) => mediumOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Style</Typography>
                <FieldArray
                    name="taxonomy.style"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={styleOptions}
                            value={values.taxonomy.style.map(
                                (item) => styleOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Subject</Typography>
                <FieldArray
                    name="taxonomy.subject"
                    render={(arrayHelpers) => (
                        <AsyncSelect
                            arrayHelpers={arrayHelpers}
                            loadOptions={loadOptionsSubject}
                            value={values.taxonomy.subject.map((item) => ({ value: item, label: item }))}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default TaxonomyItem;
