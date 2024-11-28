import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useField } from 'formik';

const items = [
    { name: 'hideNudity', label: 'Hide Nudity' },
    { name: 'hideAI', label: 'Hide AI' },
    { name: 'photography', label: 'Photography' },
    { name: 'animation', label: 'Animation' },
    { name: 'physicalArt', label: 'Physical Art' },
    { name: 'digitalArt', label: 'Digital Art' },
    { name: 'includeSold', label: 'Include Sold' },
    { name: 'hasBTS', label: 'Has BTS' },
];

export const ShortcutItem = () => {
    return (
        <Box>
            <Typography variant="h6">Shortcuts</Typography>
            <Grid container item xs={6}>
                {items.map((item, index) => {
                    const fieldName = `general.shortcuts.${item.name}`;
                    return (
                        <Grid item xs={6} key={index}>
                            <ShortcutCheckbox fieldName={fieldName} label={item.label} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

interface Props {
    fieldName: string;
    label: string;
}

const ShortcutCheckbox = ({ fieldName, label }: Props) => {
    const [field] = useField(fieldName);
    return <FormControlLabel control={<Checkbox {...field} />} label={label} />;
};
