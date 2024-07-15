'use client';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    FormControl,
    Grid,
    useMediaQuery,
    Theme,
} from '@mui/material';

import CustomCheckbox from '@/app/home/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { LoginViewProps } from './types';
import Image from 'next/image';

function LoginView({ values, errors, disabled, handleChange, handleSubmit }: LoginViewProps) {
    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value.toLowerCase();
        handleChange(event);
    };

    return (
        <Grid height="70vh" alignContent="center" display="grid" minWidth={{ xl: '400px', lg: '400px', sm: '500px' }}>
            <Box display="flex" alignItems="baseline">
                <Typography
                    whiteSpace="nowrap"
                    alignSelf="center"
                    fontWeight="700"
                    fontSize={lgUp ? '1.7rem' : '1.5rem'}
                >
                    Welcome to{' '}
                </Typography>
                <Image
                    src={'/images/logos/studiologo.png'}
                    alt="bg"
                    priority
                    width={lgUp ? 150 : 130}
                    height={lgUp ? 60 : 50}
                    style={{
                        marginLeft: '10px',
                        maxWidth: '300px',
                        maxHeight: '300px',
                        alignSelf: 'baseline',
                    }}
                />
            </Box>
            <Typography variant="h3" marginBottom={2}>
                Studio is currently down for maintenance. You will be able to check our new features soon!
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <FormControl fullWidth error={!!errors.email}>
                            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                            <CustomTextField
                                id="email"
                                disabled={disabled}
                                error={!!errors.email}
                                value={values.email}
                                variant="outlined"
                                onChange={handleEmailChange}
                                helperText={errors.email}
                                fullWidth
                            />
                        </FormControl>
                    </Box>

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<CustomCheckbox disabled={disabled} defaultChecked />}
                                label="Remember this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        style={{
                            backgroundColor: 'gray',
                        }}
                        disabled={disabled}
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        {disabled ? 'Processing...' : 'Sign In / Register'}
                    </Button>
                </Box>
            </form>
        </Grid>
    );
}

export default LoginView;
