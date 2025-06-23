import { useEffect, useState } from 'react';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomTextField from '@/app/(main)/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch, useSelector } from '@/store/hooks';
import { useToastr } from '@/app/hooks/useToastr';
import { addedPrintLicenseThunk, updatePrintLicensePriceThunk } from '@/features/asset/thunks';
import UpdatePriceModal from './UpdatedPriceModal';

function Print({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const theme = useTheme();

    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);
    const [isEditing, setIsEditing] = useState(!hasContract);
    const [loading, setLoading] = useState(false);
    const [openModalSuccessUpdate, setOpenModalSuccessUpdate] = useState(false);

    const dispatch = useDispatch();
    const toastr = useToastr();
    const { language } = useI18n();

    const assetId = useSelector((state) => state.asset._id);

    const values = allValues.print || {};

    const texts = {
        printDescription: language['studio.consignArtwork.licenses.print.description'],
        singlePrintTitle: language['studio.consignArtwork.licenses.print.singlePrint.title'],
        singlePrintDescription: language['studio.consignArtwork.licenses.print.singlePrint.description'],
        singlePrintDescription2: language['studio.consignArtwork.licenses.print.singlePrint.description2'],
        singlePrintField: language['studio.consignArtwork.licenses.print.singlePrint.field'],
        singlePrint2Field: language['studio.consignArtwork.licenses.print.singlePrint2.field'],
        displayPriceField: language['studio.consignArtwork.licenses.print.displayPrice.field'],
        displayPrice2Field: language['studio.consignArtwork.licenses.print.displayPrice2.field'],
    } as { [key: string]: string };

    useEffect(() => {
        setFieldValue(
            'print.displayPrice',
            Number(((values.merchandisePrice * 100 * values.multiplier) / 10_000).toFixed(2))
        );
    }, [values.merchandisePrice, values.multiplier, setFieldValue]);

    const handleAdded = (added: boolean) => {
        if (hasContract) {
            dispatch(addedPrintLicenseThunk({ assetKey: assetId, added }));
            setFieldValue('print.added', added);

            return;
        }
        setFieldValue('print.added', added);
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmitUpdatePrintLicense = async () => {
        setLoading(true);

        const response = await dispatch(
            updatePrintLicensePriceThunk({
                assetKey: assetId,
                merchandisePrice: values.merchandisePrice,
                displayPrice: values.displayPrice,
                multiplier: values.multiplier,
            })
        );
        setLoading(false);
        if (response) {
            setOpenModalSuccessUpdate(true);
            setIsEditing(false);
        } else {
            toastr.display({ type: 'error', message: 'Error updating print license' });
        }
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card
                title="PRINT-ART-1"
                added={values?.added}
                setAdded={handleAdded}
                width={320}
                height={hasContract ? 430 : 400}
            >
                {!values.added && (
                    <Box
                        paddingInline={1.5}
                        paddingBlock={0.5}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        height="90%"
                    >
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            {texts.printDescription}
                        </Typography>
                    </Box>
                )}
                {values.added && (
                    <Stack gap={4} p={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box width={150}>
                                <Typography>
                                    {texts.singlePrintField} {texts.singlePrint2Field}
                                </Typography>
                            </Box>
                            <CustomTextField
                                name="print.merchandisePrice"
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values?.merchandisePrice || 5}
                                inputProps={{ maxLength: 185, minLength: 1 }}
                                onChange={(e) => {
                                    if (Number(e.target.value) < 0) {
                                        e.target.value = '0';
                                    }
                                    handleChange(e);
                                }}
                                size="small"
                                variant="outlined"
                                disabled={!isEditing}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box sx={{ marginRight: 3 }}>
                                <Typography>{texts.displayPriceField}</Typography>
                                <Typography>{texts.displayPrice2Field}</Typography>
                            </Box>

                            <CustomTextField
                                name="print.displayPrice"
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values.displayPrice}
                                inputProps={{ maxLength: 185, minLength: 1 }}
                                size="small"
                                variant="outlined"
                                disabled={true}
                            />
                        </Stack>
                        <Stack direction="column" justifyContent="space-between" alignItems="center">
                            <Slider
                                max={1}
                                min={0.1}
                                step={0.1}
                                value={values.multiplier}
                                disabled={!isEditing}
                                onChange={(_, value) => setFieldValue('print.multiplier', value)}
                                valueLabelDisplay="auto"
                                sx={{
                                    '& .MuiSlider-valueLabel': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: '#fff',
                                    },
                                }}
                            />
                            <Box
                                width={'100%'}
                                display="flex"
                                gap={1}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography fontSize="0.8rem" color="gray">
                                    0.1%
                                </Typography>
                                <Typography fontWeight="bold">{values.multiplier}%</Typography>
                                <Typography fontSize="0.8rem" color="gray">
                                    1.0%
                                </Typography>
                            </Box>
                        </Stack>
                        {hasContract &&
                            (!isEditing ? (
                                <Button variant="contained" color="primary" fullWidth onClick={handleToggleEdit}>
                                    Edit
                                </Button>
                            ) : (
                                <Box display="flex" gap={2}>
                                    <Button variant="outlined" color="error" fullWidth onClick={handleToggleEdit}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        onClick={handleSubmitUpdatePrintLicense}
                                    >
                                        Confirm
                                    </Button>
                                </Box>
                            ))}
                    </Stack>
                )}
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {texts.singlePrintTitle}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {texts.singlePrintDescription}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {texts.singlePrintDescription2}
                </Typography>
            </Box>

            <UpdatePriceModal isOpen={openModalSuccessUpdate} handleClose={() => setOpenModalSuccessUpdate(false)} />
        </Box>
    );
}

export default Print;
