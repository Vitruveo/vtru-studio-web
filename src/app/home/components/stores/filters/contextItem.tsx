import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { InputColor } from './inputColor';
import { IconTrash } from '@tabler/icons-react';
import { cultureOptions, moodOptions, orientationOptions } from './options';
import { useFormikContext } from 'formik';

interface FormValues {
    context: {
        culture: [string, string][];
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
                <MultiSelect
                    onChange={(value) =>
                        onChange(
                            [...values.context.culture, [value[value.length - 1].value, value[value.length - 1].label]],
                            'context.culture'
                        )
                    }
                    options={cultureOptions}
                    value={values.context.culture.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Mood</Typography>
                <MultiSelect
                    onChange={(value) =>
                        onChange(
                            [...values.context.mood, [value[value.length - 1].value, value[value.length - 1].label]],
                            'context.mood'
                        )
                    }
                    options={moodOptions}
                    value={values.context.mood.map((item) => ({ value: item[0], label: item[1] }))}
                />
            </Box>
            <Box>
                <Typography variant="h6">Orientation</Typography>
                <MultiSelect
                    onChange={(value) =>
                        onChange(
                            [
                                ...values.context.orientation,
                                [value[value.length - 1].value, value[value.length - 1].label],
                            ],
                            'context.orientation'
                        )
                    }
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
//onChange([...values.context.culture, value.label], 'context.culture')
