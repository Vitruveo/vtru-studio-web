import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { InputColor } from './inputColor';
import { IconTrash } from '@tabler/icons-react';
import { cultureOptions, moodOptions, orientationOptions } from './options';
import { FieldArray, useFormikContext } from 'formik';

interface FormValues {
    context: {
        culture: string[];
        mood: string[];
        orientation: string[];
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
                            arrayHelpers={arrayHelpers}
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

                <FieldArray
                    name="context.mood"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={moodOptions}
                            value={values.context.mood.map(
                                (item) => moodOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
                />
            </Box>
            <Box>
                <Typography variant="h6">Orientation</Typography>
                <FieldArray
                    name="context.orientation"
                    render={(arrayHelpers) => (
                        <MultiSelect
                            arrayHelpers={arrayHelpers}
                            options={orientationOptions}
                            value={values.context.orientation.map(
                                (item) => orientationOptions.find((option) => option.value === item)!
                            )}
                        />
                    )}
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
