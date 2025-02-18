import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { shortcutsOptions } from './options';
import { useEffect } from 'react';

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
    taxonomy: {
        nudity: string[];
        aiGeneration: string[];
        category: string[];
        objectType: string[];
    };
}

export const ShortcutItem = () => {
    return (
        <Box>
            <Typography variant="h6">Filters</Typography>
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
    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [field, _, helpers] = useField(fieldName);
    const isChecked = values.general.shortcuts[fieldName.split('.').pop() as keyof FormValues['general']['shortcuts']];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.checked);
        switch (fieldName) {
            case 'general.shortcuts.hideNudity':
                setFieldValue('taxonomy.nudity', event.target.checked ? ['no'] : []);
                break;
            case 'general.shortcuts.hideAI':
                setFieldValue('taxonomy.aiGeneration', event.target.checked ? ['partial', 'none'] : []);
                break;
            case 'general.shortcuts.photography':
                setFieldValue(
                    'taxonomy.category',
                    event.target.checked
                        ? [...values.taxonomy.category, 'photography']
                        : values.taxonomy.category.filter((item) => item !== 'photography')
                );
                break;
            case 'general.shortcuts.animation':
                setFieldValue(
                    'taxonomy.category',
                    event.target.checked
                        ? [...values.taxonomy.category, 'video']
                        : values.taxonomy.category.filter((item) => item !== 'video')
                );
                break;
            case 'general.shortcuts.physicalArt':
                setFieldValue(
                    'taxonomy.objectType',
                    event.target.checked
                        ? [...values.taxonomy.objectType, 'physicalart']
                        : values.taxonomy.objectType.filter((item) => item !== 'physicalart')
                );
                break;
            case 'general.shortcuts.digitalArt':
                setFieldValue(
                    'taxonomy.objectType',
                    event.target.checked
                        ? [...values.taxonomy.objectType, 'digitalart']
                        : values.taxonomy.objectType.filter((item) => item !== 'digitalart')
                );
                break;
        }
    };

    useEffect(() => {
        if (!isChecked) {
            handleChange({ target: { checked: false } } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [isChecked]);

    return (
        <FormControlLabel control={<Checkbox {...field} checked={isChecked} onChange={handleChange} />} label={label} />
    );
};
