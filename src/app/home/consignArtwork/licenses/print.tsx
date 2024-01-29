import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';

function Print({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.print;

    const handleAdded = (added: boolean) => {
        setFieldValue('print.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="PRINT-ART-1" added={values.added} setAdded={handleAdded} width={320} height={400}>
                {!values.added ? (
                    <Box paddingLeft={7} paddingTop={3} paddingRight={1}>
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            This license makes the artwork available to end-users for printing to a single physical item
                            using Print-on-Demand (POD) technology. The license is freely transferable until the point
                            of printing, after which it is transferable solely to the owner of the physical item.
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
                            name="print.unitPrice"
                            type="number"
                            InputProps={{
                                sx: {
                                    backgroundColor: '#fff',
                                },
                            }}
                            value={values.unitPrice}
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
                    {values.added ? 'Single Print' : 'PRINT-ART-1 License'}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values.added
                        ? '“Unit Price” is the price of the artwork in U.S. dollars for a single print.'
                        : 'Enable this license if you want end-users to use your art for print-on-demand (POD) applications. This license is for individual printing; bulk printing is not permitted.'}
                </Typography>
            </Box>
        </Box>
    );
}

export default Print;
