import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';

function Remix({ allValues, setFieldValue, handleChange }: LicenseProps) {
    const values = allValues.remix || {};

    const handleAdded = (added: boolean) => {
        setFieldValue('remix.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="REMIX-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                {!values?.added ? (
                    <Box paddingLeft={7} paddingTop={3} paddingRight={3}>
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            This license makes the artwork available to end-users for use in Remix applications using
                            the
                            <Typography
                                color="text.secondary"
                                display="inline"
                                sx={{ textDecoration: 'underline', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                            >
                                {'  '}
                                CC BY-NC{' '}
                            </Typography>
                            license which allows remix usage for non-commercial purposes.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        paddingTop={2}
                        paddingLeft={3}
                        paddingRight={3}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography sx={{ whiteSpace: 'nowrap', marginRight: 3 }}>Unit Price (USD)</Typography>
                        <CustomTextField
                            name="remix.unitPrice"
                            type="number"
                            InputProps={{
                                sx: {
                                    backgroundColor: '#fff',
                                },
                            }}
                            value={values?.unitPrice}
                            inputProps={{ maxLength: 185 }}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                )}
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values?.added ? 'Single Remix' : 'REMIX-ART-1 License'}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values?.added
                        ? '“Unit Price” is the price of the artwork in U.S. dollars for a single remix.'
                        : 'Enable this license if you want end-users to use your art in Remix applications. The remix output may only be used for non-commercial purposes.'}
                </Typography>
            </Box>
        </Box>
    );
}

export default Remix;
