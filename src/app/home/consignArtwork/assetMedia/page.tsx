'use client';

import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';

import { Stack } from '@mui/system';
import { Box, Grid, IconButton, Typography, Button } from '@mui/material';

import type { StepsFormValues } from '../types';

import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { AssetMediaFormErros, AssetMediaFormValues, FormatMediaSave } from './types';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import SelectMedia from './selectMedia';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { sendRequestUploadThunk, userActionsCreators } from '@/features/user/slice';
import { nanoid } from '@reduxjs/toolkit';
import { assetMediaThunk } from '@/features/asset/thunks';
import { assetStorageThunk } from '@/features/user/thunks';
import { getMediaDefinition } from './helpers';

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

    const asset = useSelector((state) => state.asset);

    const { requestAssetUpload } = useSelector((state) => state.user);

    const router = useRouter();
    const dispatch = useDispatch();

    const { values, errors, setFieldValue, handleSubmit } = useFormik<AssetMediaFormValues>({
        initialValues: {
            definition: '',
            formats: asset.formats,
        },
        onSubmit: async (formValues) => {
            router.push(`/home/consignArtwork/assetMetadata`);
        },
    });

    const handleUploadFile = async ({ formatUpload, file }: { formatUpload: string; file: File }) => {
        const transactionId = nanoid();

        await dispatch(
            userActionsCreators.requestAssetUpload({
                key: formatUpload,
                status: 'requested',
                transactionId,
            })
        );

        dispatch(
            sendRequestUploadThunk({
                mimetype: file!.type,
                originalName: file!.name,
                transactionId,
            })
        );

        setFieldValue(`formats.${formatUpload}.transactionId`, transactionId);
    };

    const checkStepProgress = Object.entries(values?.formats || {})
        .filter(([key, value]) => key !== 'print')
        .every(([key, value]) => value.file)
        ? 'completed'
        : Object.values(values?.formats || {}).some((format) => format.file) || values?.formats?.original?.file
          ? 'inProgress'
          : 'notStarted';

    useEffect(() => {
        dispatch(consignArtworkActionsCreators.changeStatusStep({ stepId: 'assetMedia', status: checkStepProgress }));
    }, [checkStepProgress]);

    useEffect(() => {
        const requestAssetUploadNotUsed = Object.values(requestAssetUpload)?.filter(
            (item) => item.transactionId && item.url && item.status === 'ready'
        );

        if (!requestAssetUploadNotUsed || !requestAssetUploadNotUsed?.length) return;

        const requestUploadReady = Object.values(requestAssetUploadNotUsed);

        const uploadAsset = async () => {
            const responseUpload = await Promise.all(
                requestUploadReady.map(async (item) => {
                    const url = item.url;
                    dispatch(
                        userActionsCreators.requestAssetUpload({
                            transactionId: item.transactionId,
                            status: 'uploading',
                        })
                    );

                    const formatByTransaction = Object.entries(values.formats).find(
                        ([_, format]) => format.transactionId === item.transactionId
                    );

                    if (!formatByTransaction) return;

                    const [key, value] = formatByTransaction;

                    await dispatch(
                        assetStorageThunk({
                            file: value.file!,
                            url,
                        })
                    );

                    return {
                        [key]: {
                            path: item.path,
                            name: value.file!.name,
                        },
                    };
                })
            );

            // save asset
            await dispatch(
                assetMediaThunk({
                    ...values,
                    formats: responseUpload.reduce((acc, cur) => ({ ...acc, ...cur }), {} as FormatMediaSave),
                })
            );
        };

        if (requestUploadReady.length) uploadAsset();
    }, [requestAssetUpload]);

    useEffect(() => {
        if (values?.formats?.original?.file && !values?.definition) {
            (async () => {
                if (values?.formats?.original?.file) {
                    const definition = await getMediaDefinition({ fileOrUrl: values?.formats?.original?.file });

                    setFieldValue('definition', definition);
                }
            })();
        }
    }, [values.formats?.original?.file]);

    const urlAssetFile: string = useMemo(() => {
        return values?.formats?.original?.file && typeof values?.formats?.original?.file === 'string'
            ? values?.formats?.original?.file
            : values?.formats?.original?.file
              ? URL.createObjectURL(values?.formats?.original?.file as Blob)
              : '';
    }, [values?.formats?.original?.file]);

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

                <Stack
                    overflow="auto"
                    maxWidth={{ xs: 'calc(90vw)', sm: 'calc(90vw)', md: 'calc(83vw)' }}
                    maxHeight={{ xs: 'calc(65vh - 64px)', sm: 'calc(65vh - 64px)', md: 'calc(65vh - 64px)' }}
                >
                    <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                        Upload media assets for the artwork being consigned.
                    </Typography>
                    <Typography marginBottom={2} fontSize="1.1rem" color="grey" fontWeight="500" marginTop={2}>
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
                                    <Typography fontSize="0.9">
                                        Looks amazing! For your artwork to look great on different devices, we need
                                        three more media files. Don’t worry, we’ll help you crop your original media
                                        file.
                                        <Typography fontSize="0.9" marginTop={2}>
                                            If you’re concerned about loss of quality, don’t use the crop feature and
                                            upload media directly in the required size.
                                        </Typography>
                                    </Typography>
                                </Box>
                            )}

                            <Typography marginTop={2} color="grey" fontSize="1rem" fontWeight="bold">
                                {values.definition.charAt(0).toUpperCase() + values.definition.slice(1)} Media Assets
                            </Typography>
                            <Box display="flex" flexWrap="wrap">
                                {Object.entries(values.formats).map(([formatType, value], index) => (
                                    <Box style={{ marginRight: '10px' }} key={index}>
                                        <MediaCard
                                            key={index}
                                            errors={errors}
                                            formats={values.formats}
                                            formatType={formatType}
                                            formatValue={value}
                                            urlAssetFile={urlAssetFile}
                                            definition={values.definition}
                                            setFieldValue={setFieldValue}
                                            handleUploadFile={handleUploadFile}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {!urlAssetFile && (
                        <SelectMedia
                            file={values?.formats?.original?.file}
                            definition={values.definition}
                            urlAssetFile={urlAssetFile}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            handleUploadFile={handleUploadFile}
                        />
                    )}
                </Stack>
            </PageContainerFooter>
        </form>
    );
}
