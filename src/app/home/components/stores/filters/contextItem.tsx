import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { InputColor } from './inputColor';
import { IconTrash } from '@tabler/icons-react';
import { cultureOptions, moodOptions, orientationOptions } from './options';
import { FieldArray, useFormikContext } from 'formik';

interface FormValues {
    context: {
        culture: string[];
        mood: [string, string][];
        orientation: [string, string][];
        precision: number;
        colors: string[];
    };
}

const ContextItem = () => {
    const { setFieldValue, values } = useFormikContext<FormValues>();
    const onChange = (value: [string, string][] | string[], fieldName: string) => {
        setFieldValue(fieldName, value);
    };

    const afterColorPrecisionChange = (value: number) => {
        const fieldName = 'context.precision';
        setFieldValue(fieldName, value);
    };

    const onRemove = (color: string | number[]) => {
        setFieldValue(
            'context.colors',
            values.context.colors.filter((item) => item !== color)
        );
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box>
                <Typography variant="h6">Culture</Typography>

                <FieldArray
                    name="context.culture"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            onChange={(_, actionMeta) => {
                                if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
                                    arrayHelpers.remove(values.context.culture.indexOf(actionMeta.removedValue.value));
                                }

                                if (actionMeta.action === 'select-option' && actionMeta.option) {
                                    arrayHelpers.push(actionMeta.option.value);
                                }
                            }}
                            options={cultureOptions}
                            value={values.context.culture.map(
                                (item) => cultureOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Mood</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'context.mood');
                    }}
                    options={moodOptions}
                    value={values.context.mood.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Orientation</Typography>
                <MultiSelect
                    onChange={(selectedOptions) => {
                        const newValues = selectedOptions.map((option: { value: string; label: string }) => [
                            option.value,
                            option.label,
                        ]);
                        onChange(newValues, 'context.orientation');
                    }}
                    options={orientationOptions}
                    value={values.context.orientation.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Precision</Typography>
                <InputColor
                    name="Context"
                    onClick={(hex) => onChange([...values.context.colors, hex], 'context.colors')}
                    afterPrecisionChange={afterColorPrecisionChange}
                />
                {values.context.colors.map((color, index) => (
                    <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                        <Box width="1rem" height="1rem" borderRadius="50%" bgcolor={color}></Box>
                        <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(color)} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ContextItem;
