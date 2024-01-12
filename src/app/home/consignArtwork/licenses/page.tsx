'use client';

import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from '@/store/hooks';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconTrash } from '@tabler/icons-react';
import { Box, Button, IconButton, MenuItem } from '@mui/material';

import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import MetadataFields from '../components/metadataFields';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

import { LicensesFormErros, LicensesFormValues } from './types';

import { LicensesSchemaValidation, licenseMetadataDefinitionsSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import { licenses } from '../mock';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { licenseThunk } from '@/features/asset/thunks';
import { ModalBackConfirm } from '../modalBackConfirm';

const licenseMetadataDomains = [
    { value: 'stream', label: 'Stream v1.0' },
    { value: 'print', label: 'Print v1.0' },
    { value: 'NFT', label: 'NFT v1.0' },
];

type YupErrors = {
    [key: string]: string;
};

type Result = {
    [key: string]: any;
};

const transformErrors = (yupErrors: YupErrors): Result => {
    const result: Result = {};

    for (const key in yupErrors) {
        const path = key.split('.');
        const errorValue = yupErrors[key];

        let currentLevel = result;

        path.forEach((segment, index) => {
            const [property, arrayIndex] = segment.includes('[') ? segment.split(/[[\]]/).filter(Boolean) : [segment];

            if (index === path.length - 1) {
                if (arrayIndex) {
                    if (!currentLevel[property]) {
                        currentLevel[property] = [];
                    }
                    currentLevel[property][arrayIndex] = errorValue;
                } else {
                    currentLevel[property] = errorValue;
                }
            } else {
                if (!currentLevel[property]) {
                    currentLevel[property] = arrayIndex ? [] : {};
                }

                if (arrayIndex) {
                    if (!currentLevel[property][arrayIndex]) {
                        currentLevel[property][arrayIndex] = {};
                    }
                    currentLevel = currentLevel[property][arrayIndex];
                } else {
                    currentLevel = currentLevel[property];
                }
            }
        });
    }

    return result;
};

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        to: '/home/consignArtwork',
        title: 'Consign Artwork',
    },
    {
        title: 'Licenses',
    },
];

export default function Licenses() {
    const [errorLicense, setErrorLicense] = useState('');
    const [showBackModal, setShowBackModal] = useState(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const [licenseDomain, setLicenseDomain] = useState('stream');

    const router = useRouter();
    const dispatch = useDispatch();
    const { licenses: licensesState } = useSelector((state) => state.asset);

    const { values, errors, setFieldValue, handleSubmit, setErrors, setFieldError, validateForm } =
        useFormik<LicensesFormValues>({
            initialValues: {
                licenses: licensesState?.length ? licensesState : licenses,
            },
            onSubmit: async (formValues) => {
                try {
                    const checkAddLicense = values.licenses.find((license) => license.added);

                    if (checkAddLicense) {
                        const licensesAdded = values.licenses.filter((v) => v.added);
                        const check = licensesAdded.map((v) => {
                            return licenseMetadataDefinitionsSchemaValidation.validate(v.licenseMetadataDefinitions, {
                                abortEarly: false,
                            });
                        });

                        await Promise.all(check);

                        dispatch(licenseThunk({ licenses: values.licenses }));
                        dispatch(
                            consignArtworkActionsCreators.changeStatusStep({
                                stepId: 'licenses',
                                status: 'completed',
                            })
                        );
                        router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/termsOfUse`);
                    } else {
                        setShowBackModal(false);
                        setErrorLicense('Please add at least one license');
                    }
                } catch (err) {
                    setShowBackModal(false);
                    setToastr({
                        type: 'error',
                        open: true,
                        message: 'Fill in the fields correctly.',
                    });
                }
            },
        });

    const licensesAdded = values.licenses.filter((v) => v.added);

    const findIndexLicense = values.licenses.findIndex((license) => license.domain === licenseDomain);
    const licenseMetadataDefinitions = values.licenses[findIndexLicense]?.licenseMetadataDefinitions;

    const handleAddLicense = async () => {
        try {
            await licenseMetadataDefinitionsSchemaValidation.validate(
                values.licenses[findIndexLicense].licenseMetadataDefinitions,
                { abortEarly: false }
            );

            if (!values.licenses[findIndexLicense]?.added) {
                setFieldValue(`licenses[${findIndexLicense}].added`, true);
            } else {
                setToastr({
                    type: 'error',
                    open: true,
                    message: 'License already added',
                });
            }
        } catch (err) {
            const yupErrors: Record<string, string> = {};

            (err as Yup.ValidationError).inner.forEach((error) => {
                if (error.path && !yupErrors[error.path]) {
                    yupErrors[`licenses[${findIndexLicense}].licenseMetadataDefinitions${error.path}`] = error.message;
                }
            });

            const convertErrors = transformErrors(yupErrors);

            setErrors(convertErrors);
        }
    };

    const handleRemoveLicense = (domain: string) => {
        setFieldValue(`licenses[${values.licenses.findIndex((license) => license.domain === domain)}].added`, false);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLicenseDomain(e.target.value);
    };

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        setShowBackModal(true);
    };

    const handleSaveData = async () => {
        const validate = await validateForm();
        if (validate && Object.values(validate).length === 0) {
            handleSubmit();
        } else {
            setShowBackModal(false);
        }
    };

    useEffect(() => {
        if (licensesAdded.length > 0) setErrorLicense('');
        const checkStateLicenses = licensesState.filter((v) => v.added);
        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'licenses',
                status: checkStateLicenses.length > 0 || licensesAdded.length > 0 ? 'completed' : 'inProgress',
            })
        );
    }, [licensesAdded, values]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Next"
                title="Consign Artwork"
                stepStatus={licensesAdded.length > 0 ? 'completed' : 'inProgress'}
                stepNumber={3}
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title="Consign Artwork" items={BCrumb} />
                <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                    Complete all tasks and publish your artwork
                </Typography>
                <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
                    <Typography fontSize="1.1rem" color="grey" fontWeight="500" variant="subtitle1" component="label">
                        Licenses
                    </Typography>
                    <Box
                        alignItems="baseline"
                        justifyContent="space-between"
                        display="flex"
                        flexWrap="wrap"
                        width="50vw"
                    >
                        <Box width="25vw">
                            <Box display="flex" alignItems="center" width="100%">
                                <CustomSelect
                                    defaultValue="stream"
                                    size="small"
                                    name="domain"
                                    onChange={handleChangeInput}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {licenseMetadataDomains?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                                <Box>
                                    <Button
                                        onClick={handleAddLicense}
                                        style={{ marginLeft: 10, width: '122px' }}
                                        variant="contained"
                                        size="small"
                                    >{`Add >> `}</Button>
                                </Box>
                            </Box>
                            <Box marginTop={2}>
                                <MetadataFields
                                    key={licenseDomain}
                                    formkFieldPathChange={`licenses[${findIndexLicense}].licenseMetadataDefinitions`}
                                    values={values}
                                    errors={errors}
                                    metadataDefinitions={licenseMetadataDefinitions}
                                    setFieldValue={setFieldValue}
                                />
                            </Box>
                        </Box>
                        <Box width="22vw">
                            {licensesAdded.length > 0 && (
                                <Box my={3}>
                                    {licensesAdded.map((license, index) => (
                                        <Box
                                            width={300}
                                            marginBottom={4}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            key={index}
                                        >
                                            <Box>
                                                <Typography color="grey" fontSize="1.1rem">
                                                    {license.title}
                                                </Typography>
                                                {license.licenseMetadataDefinitions.map((v, i) => (
                                                    <Box key={i}>
                                                        <Typography color="GrayText">{`${v.title}: ${
                                                            v.value === true
                                                                ? 'yes'
                                                                : v.value === false
                                                                  ? 'no'
                                                                  : v.value
                                                        }`}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box>
                                                <Button
                                                    style={{ width: '122px' }}
                                                    onClick={() => handleRemoveLicense(license.domain)}
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Typography my={1} color="error">
                        {errorLicense}
                    </Typography>

                    <CustomizedSnackbar
                        type={toastr.type}
                        open={toastr.open}
                        message={toastr.message}
                        setOpentate={setToastr}
                    />
                </Grid>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
