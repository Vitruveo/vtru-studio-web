import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { InputColor } from './inputColor';
import { IconTrash } from '@tabler/icons-react';

const cultureOptions = [
    { value: 'african', label: 'African' },
    { value: 'centralasian', label: 'Central Asian' },
    { value: 'eastasian', label: 'East Asian' },
    { value: 'islamic', label: 'Islamic' },
    { value: 'latinamerican', label: 'Latin American' },
    { value: 'nativeamerican', label: 'Native American' },
    { value: 'oceanic', label: 'Oceanic' },
    { value: 'persian', label: 'Persian' },
    { value: 'southasian', label: 'South Asian' },
    { value: 'southeastasian', label: 'Southeast Asian' },
    { value: 'western', label: 'Western' },
];

const moodOptions = [
    { value: 'admiration', label: 'Admiration' },
    { value: 'absorbing', label: 'Absorbing' },
    { value: 'amusement', label: 'Amusement' },
    { value: 'adoration', label: 'Adoration' },
    { value: 'awe', label: 'Awe' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'boredom', label: 'Boredom' },
    { value: 'brooding', label: 'Brooding' },
    { value: 'calmness', label: 'Calmness' },
    { value: 'chills', label: 'Chills' },
    { value: 'chaotic', label: 'Chaotic' },
    { value: 'connectedness', label: 'Connectedness' },
    { value: 'cosmic', label: 'Cosmic' },
    { value: 'confusion', label: 'Confusion' },
    { value: 'dread', label: 'Dread' },
    { value: 'distaste', label: 'Distaste' },
    { value: 'disgust', label: 'Disgust' },
    { value: 'dreary', label: 'Dreary' },
    { value: 'disorienting', label: 'Disorienting' },
    { value: 'dreamy', label: 'Dreamy' },
    { value: 'desire', label: 'Desire' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'intimate', label: 'Intimate' },
    { value: 'intricate', label: 'Intricate' },
    { value: 'love', label: 'Love' },
    { value: 'lively', label: 'Lively' },
    { value: 'mystical', label: 'Mystical' },
    { value: 'mysterious', label: 'Mysterious' },
    { value: 'nostalgia', label: 'Nostalgia' },
    { value: 'ornate', label: 'Ornate' },
    { value: 'psychedelic', label: 'Psychedelic' },
    { value: 'serenity', label: 'Serenity' },
    { value: 'sadness', label: 'Sadness' },
    { value: 'sensual', label: 'Sensual' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'strange', label: 'Strange' },
    { value: 'striking', label: 'Striking' },
    { value: 'tragic', label: 'Tragic' },
    { value: 'tense', label: 'Tense' },
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'violent', label: 'Violent' },
    { value: 'wonder', label: 'Wonder' },
    { value: 'whimsical', label: 'Whimsical' },
];

const orientationOptions = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'square', label: 'Square' },
];

const convertHEXtoRGB = (hex: string) => {
    const parts = /#?(..)(..)(..)/.exec(hex);
    if (!parts) {
        throw new Error(`${hex} is not a valid HEX color.`);
    }
    return [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)];
};

const ContextItem = () => {
    const values = [''];
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
        <Box>
            <Typography variant="h6">Culture</Typography>
            <MultiSelect onChange={() => {}} options={cultureOptions} value={[]} />
            <Typography variant="h6">Mood</Typography>
            <MultiSelect onChange={() => {}} options={moodOptions} value={[]} />
            <Box>
                <InputColor
                    name="Context"
                    onClick={(hex) => onChange([...(values as string[]), convertHEXtoRGB(hex)])}
                    afterPrecisionChange={afterColorPrecisionChange}
                />
                {values.map((color, index) => (
                    <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                        <Box
                            width="1rem"
                            height="1rem"
                            borderRadius="50%"
                            bgcolor={`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                        ></Box>
                        <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(color)} />
                    </Box>
                ))}
            </Box>
            <Typography variant="h6">Orientation</Typography>
            <MultiSelect onChange={() => {}} options={orientationOptions} value={[]} />
        </Box>
    );
};

export default ContextItem;
