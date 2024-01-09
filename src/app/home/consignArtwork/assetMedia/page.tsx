'use client';

import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import Img from 'next/image';
import { FormikErrors, useFormik } from 'formik';
import { useSelector } from '@/store/hooks';

import { useDropzone } from 'react-dropzone';
import { Stack } from '@mui/system';
import { Box, Button, Card, IconButton, MenuItem, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { IconTrash } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import type { StepsFormValues, StepsProps, FormatNames } from '../types';

import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';

import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { useRouter, useSearchParams } from 'next/navigation';
import SvgIcon from '@mui/material/SvgIcon';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { AssetMediaFormErros, AssetMediaFormValues } from './types';
import { AssetMediaSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import SelectMedia from './selectMedia';
import Crop from './crop';

const currentStep = 2;

const definitionOptions = [
    {
        value: 'square',
        label: 'Square',
    },
    {
        value: 'landscape',
        label: 'Landscape',
    },
    {
        value: 'portrait',
        label: 'Portrait',
    },
];

function validateErrorsAssetUpload({
    errors,
    values,
    setFieldValue,
}: {
    values: AssetMediaFormValues;
    errors: AssetMediaFormErros;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}) {
    const fields: Array<keyof StepsFormValues> = ['asset'];

    // if (!fields.some((field) => errors[field])) {
    //     values.completedSteps[currentStep] = {
    //         ...values.completedSteps[currentStep],
    //         status: 'completed',
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // } else {
    //     values.completedSteps[currentStep] = {
    //         ...values.completedSteps[currentStep],
    //         status: 'inProgress',
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // }
}

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
        title: 'Asset Media',
    },
];

export default function AssetMedia() {
    const [showFormtsInfo, setShowFormatsInfo] = useState(true);
    const params = useSearchParams();
    params.values();

    const asset = useSelector((state) => state.asset);

    const { values, errors, setFieldValue } = useFormik<AssetMediaFormValues>({
        initialValues: {
            definition: '',
            asset: {
                file: undefined,
                formats: {
                    display: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                    exhibition: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                    preview: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                    print: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                },
            },
        },
        validationSchema: AssetMediaSchemaValidation,
        onSubmit: async (formValues) => {},
    });

    useEffect(() => {
        validateErrorsAssetUpload({ values, errors, setFieldValue });
    }, [values.asset, errors]);

    const urlAssetFile = useMemo(() => {
        return values.asset.file ? URL.createObjectURL(values.asset.file) : '';
    }, [values.asset.file]);

    return (
        <PageContainerFooter
            stepStatus="inProgress"
            stepNumber={1}
            title="Consign Artwork"
            backPathRouter="/home/consignArtwork"
        >
            <Breadcrumb title="Consign Artwork" items={BCrumb} />
            <Stack my={3} direction="column" gap={1}>
                <Typography variant="h6" fontWeight="normal" color="GrayText">
                    Upload media assets for the artwork being consigned.
                </Typography>
                <Typography variant="h5" color="grey" fontWeight="500" marginTop={2}>
                    Asset Media
                </Typography>
                {urlAssetFile && (
                    <Box>
                        {showFormtsInfo && (
                            <Box padding={2} bgcolor="#FFF2CC" position="relative">
                                <IconButton
                                    style={{ position: 'absolute', top: 8, right: 8 }}
                                    onClick={() => setShowFormatsInfo(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography>
                                    Looks amazing! For your artwork to look great on different devices, we need three
                                    more media files. Don’t worry, we’ll help you crop your original media file.
                                    <Typography marginTop={2}>
                                        If you’re concerned about loss of quality, don’t use the crop feature and upload
                                        media directly in the required size.
                                    </Typography>
                                </Typography>
                            </Box>
                        )}

                        <Typography marginTop={2} color="grey" variant="h6" fontWeight="bold">
                            {values.definition.charAt(0).toUpperCase() + values.definition.slice(1)} Media Assets
                        </Typography>
                        <Box display="flex">
                            <Box style={{ marginRight: '10px' }}>
                                <MediaCard
                                    formatType="original"
                                    formatValue={{ file: values.asset.file }}
                                    urlAssetFile={urlAssetFile}
                                    definition={values.definition}
                                    setFieldValue={setFieldValue}
                                />
                            </Box>

                            {Object.entries(values.asset.formats).map(([formatType, value], index) => (
                                <Box style={{ marginRight: '10px' }} key={index}>
                                    <MediaCard
                                        key={index}
                                        formatType={formatType}
                                        formatValue={value}
                                        urlAssetFile={urlAssetFile}
                                        definition={values.definition}
                                        setFieldValue={setFieldValue}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                {!urlAssetFile && (
                    <SelectMedia
                        file={values.asset.file}
                        definition={values.definition}
                        urlAssetFile={urlAssetFile}
                        errors={errors}
                        setFieldValue={setFieldValue}
                    />
                )}
                {/* 
                <Crop
                    file={values.asset.file}
                    definition={values.definition}
                    errors={errors}
                    formats={values.asset.formats}
                    setFieldValue={setFieldValue}
                /> */}
            </Stack>
        </PageContainerFooter>
    );
}
