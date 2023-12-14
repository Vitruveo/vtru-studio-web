import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paypal from 'public/images/svgs/paypal.svg';
import payment from 'public/images/products/payment.svg';
import mastercard from 'public/images/svgs/mastercard.svg';
import Image from 'next/image';
import { StepsProps } from './types';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { MenuItem } from '@mui/material';
import CustomTextField from '../forms/theme-elements/CustomTextField';

const domains = [
  { value: 'music', label: 'Music' },
  { value: 'artwork', label: 'Artwork' },
];

const ThirdStep = ({ values, handleChange }: StepsProps) => {
  const [selectedValue, setSelectedValue] = React.useState('Free delivery');

  const handleDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const [selectedPyament, setSelectedPyament] = React.useState('paypal');

  const handlePChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPyament(event.target.value);
  };

  return (
    <>
      <Grid
        my={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width={500}
        container
        spacing={3}
        mt={1}>
        {values.assetMetadata?.map((v, i) => (
          <Grid justifyContent="center" width={500} p={1} lg={6} xs={12} key={v.name}>
            {v.type === 'select' && (
              <>
                <Typography variant="subtitle1" fontWeight={600} component="label">
                  {v.title}
                </Typography>
                <CustomSelect name={`assetMetadata.${i}.${v.name}`} fullWidth variant="outlined">
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
                <CustomTextField fullWidth size="small" name={`assetMetadata.${i}.${v.name}`} variant="outlined" />
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ThirdStep;
