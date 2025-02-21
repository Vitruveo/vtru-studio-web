import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import VirtualizedMultiSelect from '../../ui-components/select/VirtualizedMultiSelect';
import { getAllStores } from '@/features/stores/requests';
import { useDispatch, useSelector } from '@/store/hooks';
import { StoresVisibilityStatus } from '@/features/asset/types';
import { updatedAssetStoresVisibilityThunk } from '@/features/asset/thunks';
import { useToastr } from '@/app/hooks/useToastr';

interface ModalListOfLicensesProps {
    open: boolean;
    onClose: () => void;
}

interface FormValues {
    visibility: StoresVisibilityStatus;
    list: { label: string; value: string }[];
}

export const ModalStoresVisibility = ({ open, onClose }: ModalListOfLicensesProps) => {
    const [load, setLoad] = useState(true);
    const [paginatedData, setPaginatedData] = useState<{ value: string; label: string }[]>([]);

    const dispatch = useDispatch();
    const toast = useToastr();
    const assetSelected = useSelector((state) => state.user.selectedAsset);
    const asset = useSelector((state) => state.user.assets.data.find((item) => item._id === assetSelected));

    const handleClose = () => {
        setLoad(true);
        setPaginatedData([]);
        onClose();
    };

    const formik = useFormik<FormValues>({
        enableReinitialize: true,
        initialValues: { visibility: asset?.stores?.visibility || 'visibleInAllStores', list: [] },
        onSubmit: (values: FormValues) => {
            if (asset) {
                if (
                    (values.visibility === 'hiddenInSelectedStores' ||
                        values.visibility === 'visibleInSelectedStores') &&
                    !values.list.length
                ) {
                    toast.display({ type: 'error', message: 'Select stores' });
                    return;
                }
                dispatch(
                    updatedAssetStoresVisibilityThunk({
                        assetId: asset._id,
                        stores: { list: values.list.map((v) => v.value), visibility: values.visibility },
                    })
                );
                handleClose();
            }
        },
    });

    const fetchPaginatedData = async (page = 1, aggregatedData: typeof paginatedData = []) => {
        try {
            const response = await getAllStores({ page, limit: 100 });

            if (!response.data) return;

            const updatedData = [
                ...aggregatedData,
                ...response.data.data.map((v) => ({ value: v._id, label: v.organization.name })),
            ];

            setPaginatedData(updatedData);

            if (response.data.page < response.data.totalPage) {
                fetchPaginatedData(page + 1, updatedData);
            }
        } catch (error) {
            setLoad(false);
            console.error(error);
        }
    };

    useEffect(() => {
        if (paginatedData.length && asset) {
            formik.setFieldValue(
                'list',
                asset?.stores?.list.map((storeId) => paginatedData.find((v) => v.value === storeId))
            );
            setLoad(false);
        }
    }, [paginatedData?.length, asset]);

    useEffect(() => {
        if (open) fetchPaginatedData();
        else {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h3" marginBottom={3} textAlign="center">
                    Store Visibility
                </Typography>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="visibility"
                                value={formik.values.visibility}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value="visibleInAllStores"
                                    control={<Radio color="primary" />}
                                    label="Visible in Stores"
                                />
                                <FormControlLabel
                                    value="visibleInSelectedStores"
                                    control={<Radio color="primary" />}
                                    label="Visible in selected Stores"
                                />
                                {formik.values.visibility === 'visibleInSelectedStores' && (
                                    <Box width={300}>
                                        <FieldArray
                                            name="list"
                                            render={(arrayHelpers) => (
                                                <VirtualizedMultiSelect
                                                    arrayHelpers={arrayHelpers}
                                                    options={paginatedData}
                                                    value={formik.values.list}
                                                    load={load}
                                                />
                                            )}
                                        />
                                    </Box>
                                )}
                                <FormControlLabel
                                    value="hiddenInSelectedStores"
                                    control={<Radio color="primary" />}
                                    label="Hidden for selected Stores"
                                />
                                {formik.values.visibility === 'hiddenInSelectedStores' && (
                                    <Box>
                                        <FieldArray
                                            name="list"
                                            render={(arrayHelpers) => (
                                                <VirtualizedMultiSelect
                                                    arrayHelpers={arrayHelpers}
                                                    options={paginatedData}
                                                    value={formik.values.list}
                                                    load={load}
                                                />
                                            )}
                                        />
                                    </Box>
                                )}
                                <FormControlLabel
                                    value="hiddenInAllStores"
                                    control={<Radio color="primary" />}
                                    label="Hidden from Stores"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Box marginTop={3} display="flex" justifyContent="flex-end">
                            <Button disabled={load} sx={{ width: 100 }} type="submit" variant="contained">
                                {load ? <CircularProgress size={30} /> : 'Save'}
                            </Button>
                        </Box>
                    </form>
                </FormikProvider>
            </Box>
        </Modal>
    );
};
