'use client';
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, FormControl, Grid } from '@mui/material';

import CustomCheckbox from '@/app/home/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { LoginViewProps } from './types';
import VtruTitle from '@/app/home/components/vtruTItle';

function LoginView({ values, errors, handleChange, handleSubmit }: LoginViewProps) {
    return (
        <Grid height="70vh" alignContent="center" display="grid" minWidth={{ xl: '400px', lg: '400px', sm: '500px' }}>
            <Typography fontWeight="700" variant="h3" mb={1}>
                Welcome to <VtruTitle vtru="h5" studio="h3" copy="h3" />
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <FormControl fullWidth error={!!errors.email}>
                            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                            <CustomTextField
                                id="email"
                                error={!!errors.email}
                                value={values.email}
                                variant="outlined"
                                onChange={handleChange}
                                helperText={errors.email}
                                fullWidth
                            />
                        </FormControl>
                    </Box>

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<CustomCheckbox defaultChecked />}
                                label="Remember this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                <Box>
                    <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                        Sign In / Register
                    </Button>
                </Box>
            </form>
        </Grid>
    );
}

export default LoginView;
