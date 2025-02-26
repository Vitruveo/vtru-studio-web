import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import CustomTextField from '@/app/(main)/components/forms/theme-elements/CustomTextField';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch, useSelector } from '@/store/hooks';
import { useToastr } from '@/app/hooks/useToastr';
import { updatePrintLicenseAddedThunk, updatePrintLicensePriceThunk } from '@/features/asset/thunks';

function Print({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const dispatch = useDispatch();
    const toastr = useToastr();
    const { language } = useI18n();
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);
    const assetId = useSelector((state) => state.asset._id);

    const [isEditing, setIsEditing] = useState(!hasContract);
    const [loading, setLoading] = useState(false);
    const values = allValues.print || {};

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        printDescription: language['studio.consignArtwork.licenses.print.description'],
        printEnable: language['studio.consignArtwork.licenses.print.enable'],
        singlePrintTitle: language['studio.consignArtwork.licenses.print.singlePrint.title'],
        singlePrintDescription: language['studio.consignArtwork.licenses.print.singlePrint.description'],
        singlePrintField: language['studio.consignArtwork.licenses.print.singlePrint.field'],
    } as { [key: string]: string };

    const handleAdded = (added: boolean) => {
        if (hasContract) dispatch(updatePrintLicenseAddedThunk({ assetKey: assetId, added }));
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
                unitPrice: values.unitPrice,
                availableLicenses: values.availableLicenses,
            })
        );
        setLoading(false);
        if (response) {
            setIsEditing(false);
        } else {
            toastr.display({ type: 'error', message: 'Error updating print license' });
        }
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card title="PRINT-ART-1" added={values?.added} setAdded={handleAdded} width={320} height={400}>
                {!values?.added ? (
                    <Box p={1.5}>
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
                ) : (
                    <Stack gap={3} p={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography sx={{ whiteSpace: 'nowrap', marginRight: 3 }}>
                                {texts.singlePrintField}
                            </Typography>
                            <CustomTextField
                                name="print.unitPrice"
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values?.unitPrice}
                                inputProps={{ maxLength: 185, minLength: 1 }}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                                disabled={!isEditing}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography>Available</Typography>
                            <CustomTextField
                                type="number"
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#fff',
                                        width: 90,
                                    },
                                }}
                                value={values.availableLicenses}
                                onChange={handleChange}
                                size="small"
                                variant="outlined"
                                name="print.availableLicenses"
                                disabled={!isEditing}
                            />
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
                    {values?.added ? texts.singlePrintTitle : `PRINT-ART-1 ${texts.license}`}
                </Typography>
                <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                    {values?.added ? texts.singlePrintDescription : texts.printEnable}
                </Typography>
            </Box>
        </Box>
    );
}

export default Print;
