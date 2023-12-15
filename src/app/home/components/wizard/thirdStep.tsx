import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';

import { StepsProps } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import CustomTextField from '../forms/theme-elements/CustomTextField';

const ThirdStep = ({ values, handleChange }: StepsProps) => {
    return (
        <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
            <Grid marginBottom={2}>
                <Typography variant="subtitle1" fontWeight={600} component="label">
                    Domain
                </Typography>
                <CustomSelect size="small" name="domain" fullWidth variant="outlined">
                    {values.assetMetadata?.metadataDomains?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </Grid>

            <Grid spacing={2} container>
                {values.assetMetadata?.metadataDefinitions?.map((v, i) => (
                    <Grid item lg={6} xs={12} key={v.name}>
                        {v.type === 'select' && (
                            <>
                                <Typography variant="subtitle1" fontWeight={600} component="label">
                                    {v.title}
                                </Typography>
                                <CustomSelect
                                    size="small"
                                    name={`assetMetadata.${i}.${v.name}`}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {v.options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </>
                        )}
                        {v.type === 'string' && (
                            <>
                                <Typography variant="subtitle1" fontWeight={600} component="label">
                                    {v.title}
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    size="small"
                                    name={`assetMetadata.${i}.${v.name}`}
                                    variant="outlined"
                                />
                            </>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default ThirdStep;
