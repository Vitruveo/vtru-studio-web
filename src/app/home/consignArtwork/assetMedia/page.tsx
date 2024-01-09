'use client';

import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';

import { Stack } from '@mui/system';
import { Box, IconButton, Typography } from '@mui/material';

import type { StepsFormValues } from '../types';

import { useRouter, useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { AssetMediaFormErros, AssetMediaFormValues } from './types';
import { AssetMediaSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import SelectMedia from './selectMedia';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';

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

    const router = useRouter();
    const dispatch = useDispatch();

    const { values, errors, setFieldValue, handleSubmit } = useFormik<AssetMediaFormValues>({
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
        // validationSchema: AssetMediaSchemaValidation,
        onSubmit: async (formValues) => {
            router.push(`/home/consignArtwork/assetMetadata`);
        },
    });

    const checkStepProgress =
        values.asset.formats.display.file && values.asset.formats.exhibition.file && values.asset.formats.preview.file
            ? 'completed'
            : 'inProgress';

    useEffect(() => {
        validateErrorsAssetUpload({ values, errors, setFieldValue });
    }, [values.asset, errors]);

    useEffect(() => {
        dispatch(consignArtworkActionsCreators.changeStatusStep({ stepId: 'assetMedia', status: checkStepProgress }));
    }, [checkStepProgress]);

    const urlAssetFile = useMemo(() => {
        return values.asset.file ? URL.createObjectURL(values.asset.file) : '';
    }, [values.asset.file]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Next"
                stepStatus={checkStepProgress}
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
                                        Looks amazing! For your artwork to look great on different devices, we need
                                        three more media files. Don’t worry, we’ll help you crop your original media
                                        file.
                                        <Typography marginTop={2}>
                                            If you’re concerned about loss of quality, don’t use the crop feature and
                                            upload media directly in the required size.
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
                                        errors={errors}
                                        formats={values.asset.formats}
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
                                            errors={errors}
                                            formats={values.asset.formats}
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
                </Stack>
            </PageContainerFooter>
        </form>
    );
}
