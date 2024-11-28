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
import { useFormikContext } from 'formik';

interface FormValues {
    taxonomy: {
        objectType: [string, string][];
        tags: [string, string][];
        collections: [string, string][];
        aiGeneration: [string, string][];
        arEnabled: [string, string][];
        nudity: [string, string][];
        category: [string, string][];
        medium: [string, string][];
        style: [string, string][];
        subject: [string, string][];
    };
}

const TaxonomyItem = () => {
    const { setFieldValue, values } = useFormikContext<FormValues>();

    const onChange = (value: [string, string][], fieldName: string) => {
        setFieldValue(fieldName, value);
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
                <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Collections</Typography>
                <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
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
                <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
            </Box>
        </Box>
    );
};

export default TaxonomyItem;