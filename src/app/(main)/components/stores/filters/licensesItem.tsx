import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { licensesOptions } from './options';
import { useEffect } from 'react';

interface FormValues {
    licenseChecked: {
        nft: {
            added: boolean;
        };
        print: {
            added: boolean;
        };
    };
}

const Licenses = () => {
    return (
        <Box>
            <Typography variant="h6">Artwork Licenses</Typography>
            <Box>
                <Grid container item xs={6}>
                    {licensesOptions.map((item, index) => {
                        const fieldName = `licenseChecked.${item.name}.added`;
                        return (
                            <Grid item xs={6} key={index}>
                                <LicenseCheckbox fieldName={fieldName} label={item.label} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
};

interface Props {
    fieldName: string;
    label: string;
}

const LicenseCheckbox = ({ fieldName, label }: Props) => {
    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [field, _, helpers] = useField(fieldName);
    const isChecked = values.licenseChecked[fieldName.split('.')[1] as keyof FormValues['licenseChecked']].added;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.checked);
        switch (fieldName) {
            case 'licenseChecked.nft.added':
                setFieldValue('licenseChecked.nft.added', event.target.checked);
                break;
            case 'licenseChecked.print.added':
                setFieldValue('licenseChecked.print.added', event.target.checked);
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
export default Licenses;
