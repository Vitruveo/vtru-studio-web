import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { shortcutsOptions } from './options';

interface FormValues {
    general: {
        shortcuts: {
            hideNudity: boolean;
            hideAI: boolean;
            photography: boolean;
            animation: boolean;
            physicalArt: boolean;
            digitalArt: boolean;
            includeSold: boolean;
            hasBTS: boolean;
        };
    };
}

export const ShortcutItem = () => {
    return (
        <Box>
            <Typography variant="h6">Shortcuts</Typography>
            <Grid container item xs={6}>
                {shortcutsOptions.map((item, index) => {
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
    const { values } = useFormikContext<FormValues>();
    const [field] = useField(fieldName);
    const isChecked = values.general.shortcuts[fieldName.split('.').pop() as keyof FormValues['general']['shortcuts']];

    return <FormControlLabel control={<Checkbox {...field} checked={isChecked} />} label={label} />;
};
