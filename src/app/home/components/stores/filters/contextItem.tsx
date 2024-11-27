import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { InputColor } from './inputColor';
import { IconTrash } from '@tabler/icons-react';
import { cultureOptions, moodOptions, orientationOptions } from './options';

const convertHEXtoRGB = (hex: string) => {
    const parts = /#?(..)(..)(..)/.exec(hex);
    if (!parts) {
        throw new Error(`${hex} is not a valid HEX color.`);
    }
    return [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)];
};

const ContextItem = () => {
    const values = ['#000000'];
    const onChange = (colors: (string | number[])[]) => {
        console.log(colors);
    };

    const afterColorPrecisionChange = (value: number) => {
        console.log(value);
    };

    const onRemove = (color: string | number[]) => {
        console.log(color);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box>
                <Typography variant="h6">Culture</Typography>
                <MultiSelect onChange={() => {}} options={cultureOptions} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Mood</Typography>
                <MultiSelect onChange={() => {}} options={moodOptions} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Orientation</Typography>
                <MultiSelect onChange={() => {}} options={orientationOptions} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Precision</Typography>
                <InputColor
                    name="Context"
                    onClick={(hex) => onChange([...(values as string[]), convertHEXtoRGB(hex)])}
                    afterPrecisionChange={afterColorPrecisionChange}
                />
                {values.map((color, index) => (
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
