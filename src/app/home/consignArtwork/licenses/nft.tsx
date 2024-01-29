import { Box, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useFormik } from 'formik';
import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import CustomCheckbox from '@/app/home/components/forms/theme-elements/CustomCheckbox';
import Card from './common/card';
import { LicenseProps } from './types';

function Nft({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const values = allValues.nft;

    const handleAdded = (added: boolean) => {
        if (added == false) setFieldValue('editionOption', '');
        setFieldValue('nft.added', added);
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="NFT-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                {!values.added ? (
                    <Box paddingLeft={7} paddingTop={3} paddingRight={3}>
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            This license makes the artwork available for sale under one of several edition pricing
                            models. When sold, an NFT of the artwork is minted and delivered to the buyer.
                        </Typography>
                    </Box>
                ) : (
                    <Box paddingTop={1} paddingLeft={3} width="100%">
                        <Box alignItems="center" justifyContent="space-between" display="flex" marginBottom={1}>
                            <Box width={100}>
                                <Typography>License</Typography>
                            </Box>
                            <Box alignItems="center" justifyContent="space-between" display="flex" width={300}>
                                <CustomSelect
                                    sx={{ backgroundColor: '#fff' }}
                                    InputProps={{
                                        sx: {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    name="nft.license"
                                    value={values.license}
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                >
                                    {[
                                        'CC BY',
                                        'CC BY-SA',
                                        'CC BY-NC',
                                        'CC BY-NC-SA',
                                        'CC BY-ND',
                                        'CC BY-NC-ND',
                                        'CC0',
                                        'Vitruveo',
                                    ]?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                                <IconButton sx={{ padding: 0, marginLeft: 1 }}>
                                    <InfoIcon color="primary" />
                                </IconButton>
                            </Box>
                        </Box>
                        <RadioGroup
                            aria-label="options"
                            name="nft.editionOption"
                            value={values.editionOption}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="elastic" control={<Radio />} label="Elastic Editions" />
                            {values.editionOption === 'elastic' && (
                                <Box marginLeft={4}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            Edition Price (USD)
                                        </Typography>
                                        <CustomTextField
                                            name="nft.elastic.editionPrice"
                                            type="number"
                                            InputProps={{
                                                sx: {
                                                    backgroundColor: '#fff',
                                                    width: 100,
                                                },
                                            }}
                                            value={values.elastic.editionPrice}
                                            inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            Number of Editions
                                        </Typography>
                                        <CustomTextField
                                            name="nft.elastic.numberOfEditions"
                                            type="number"
                                            InputProps={{
                                                sx: {
                                                    backgroundColor: '#fff',
                                                    width: 100,
                                                },
                                            }}
                                            value={values.elastic.numberOfEditions}
                                            inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            Total Price (USD)
                                        </Typography>
                                        <Typography
                                            textAlign="right"
                                            color="gray"
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            ${values.elastic.editionPrice * values.elastic.numberOfEditions}
                                        </Typography>
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        marginBottom={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            Edition Discount
                                        </Typography>

                                        <Box display="flex" gap={1} alignItems="center" justifyContent="space-between">
                                            <Box>
                                                <CustomCheckbox
                                                    sx={{ padding: 0 }}
                                                    name="nft.elastic.editionDiscount"
                                                    checked={values.elastic.editionDiscount}
                                                    onChange={handleChange}
                                                />
                                            </Box>
                                            <Box marginRight={3}>
                                                <Typography
                                                    textAlign="right"
                                                    color="gray"
                                                    fontSize="0.8rem"
                                                    sx={{ whiteSpace: 'nowrap', width: 50 }}
                                                >
                                                    {(values.elastic.numberOfEditions / 10).toFixed(2) + '%'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            <FormControlLabel value="single" control={<Radio />} label="Single Edition" />
                            {values.editionOption === 'single' && (
                                <Box marginLeft={4} display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        fontSize="0.8rem"
                                        sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                    >
                                        Edition Price (USD)
                                    </Typography>
                                    <CustomTextField
                                        name="nft.single.editionPrice"
                                        type="number"
                                        InputProps={{
                                            sx: {
                                                backgroundColor: '#fff',
                                                width: 100,
                                            },
                                        }}
                                        value={values.single.editionPrice}
                                        inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            )}
                            <FormControlLabel value="unlimited" control={<Radio />} label="Unlimited Editions" />

                            {values.editionOption === 'unlimited' && (
                                <Box marginLeft={4} display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        fontSize="0.8rem"
                                        sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                    >
                                        Edition Price (USD)
                                    </Typography>
                                    <CustomTextField
                                        name="nft.unlimited.editionPrice"
                                        type="number"
                                        InputProps={{
                                            sx: {
                                                backgroundColor: '#fff',
                                                width: 100,
                                            },
                                        }}
                                        value={values.unlimited.editionPrice}
                                        inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            )}
                        </RadioGroup>
                    </Box>
                )}
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {values.editionOption === 'elastic'
                        ? 'Elastic Editions'
                        : values.editionOption === 'single'
                          ? 'Single Edition'
                          : values.editionOption === 'unlimited'
                            ? 'Unlimited Editions'
                            : values.added
                              ? 'Select Edition'
                              : 'NFT-ART-1 License'}
                </Typography>

                {values.editionOption === 'elastic' ? (
                    <Box marginTop={2}>
                        <Box>
                            <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                “Edition Price” is the price of the artwork in U.S. dollars.
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                “Edition Price” is the price of the artwork in U.S. dollars.
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                “Number of Editions” is the quantity of editions of the artwork that can be minted.
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                “Total Price” is the “Edition Price” multiplied by “Number of Editions.”
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                “Edition Discount” is the discount for the buyer when purchasing multiple editions. It
                                is calculated by dividing 10 by the “Number of Editions.” If enabled, the discount is
                                applied for each edition after the first one.
                            </Typography>
                        </Box>
                    </Box>
                ) : values.editionOption === 'single' ? (
                    <Box marginTop={2}>
                        <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                            “Edition Price” is the price of the artwork in U.S. dollars.
                        </Typography>
                    </Box>
                ) : values.editionOption === 'unlimited' ? (
                    <Box marginTop={2}>
                        <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                            “Edition Price” is the price of the artwork in U.S. dollars.
                        </Typography>
                    </Box>
                ) : values.added ? (
                    <Box marginTop={2}>
                        <Box>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                Elastic Editions{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                is a flexible model that gives a buyer the ability to combine multiple editions into
                                one, dynamically changing the edition size.
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                Single Edition{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                is a fixed 1/1 model.
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                Unlimited Editions{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                is a fee or free model for unlimited editions.
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                        Enable this license if you want buyers to have ownership of a digital collectible of the
                        artwork.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default Nft;
