'use client';

import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';

import { Stack } from '@mui/system';
import { Box, IconButton, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { AssetMediaFormValues, FormatMediaSave, FormatsMedia } from './types';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import SelectMedia from './selectMedia';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { userActionsCreators } from '@/features/user/slice';
import { nanoid } from '@reduxjs/toolkit';
import { assetMediaThunk } from '@/features/asset/thunks';
import { assetStorageThunk, sendRequestUploadThunk } from '@/features/user/thunks';
import { getMediaDefinition, getStepStatus, handleGetFileType } from './helpers';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';

export default function AssetMedia() {
    const [showBackModal, setShowBackModal] = useState(false);
    const [showFormtsInfo, setShowFormatsInfo] = useState(true);

    const { language } = useI18n();

    const texts = {
        nextButton: language['studio.consignArtwork.form.next.button'],
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        assetMediaTitle: language['studio.consignArtwork.assetMedia.title'],
        assetMediaDescription: language['studio.consignArtwork.assetMedia.description'],
        assetMediaAmazing: language['studio.consignArtwork.assetMedia.amazing'],
        assetMediaConcerned: language['studio.consignArtwork.assetMedia.concerned'],
        assets: language['studio.consignArtwork.assetMedia.assets'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/home/consignArtwork',
            title: texts.consignArtworkTitle,
        },
        {
            title: texts.assetMediaTitle,
        },
    ];

    const asset = useSelector((state) => state.asset);

    const { requestAssetUpload } = useSelector((state) => state.user);

    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = useMemo(
        () => ({
            definition: '',
            formats: asset.formats,
        }),
        []
    );

    const { values, errors, setFieldValue, handleSubmit } = useFormik<AssetMediaFormValues>({
        initialValues,
        onSubmit: async (formValues) => {
            if (JSON.stringify(initialValues) === JSON.stringify(values))
                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/assetMetadata`);
            else {
                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'assetMedia',
                        status: getStepStatus({
                            formats:
                                JSON.stringify(initialValues.formats) === JSON.stringify(values.formats)
                                    ? asset.formats
                                    : values.formats,
                        }),
                    })
                );
                const deleteFormats = Object.entries(formValues.formats)
                    .filter(([_, value]) => !value.file)
                    .map(([key, _]) => key);
                if (deleteFormats.length) await dispatch(assetMediaThunk({ deleteFormats }));
                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/assetMetadata`);
            }
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

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        if (JSON.stringify(initialValues.formats) === JSON.stringify(values.formats)) {
            router.push(`/home/consignArtwork`);
        } else {
            setShowBackModal(true);
        }
    };

    const handleSaveData = () => {
        handleSubmit();
    };

    const handleCancelBackModal = async () => {
        await dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'assetMedia',
                status: getStepStatus({
                    formats: initialValues.formats,
                }),
            })
        );

        const deleteFormats = Object.entries(values.formats)
            .filter(([key, value]) => !initialValues.formats[key as keyof FormatsMedia].file)
            .map(([key, _]) => key);

        if (deleteFormats.length) await dispatch(assetMediaThunk({ deleteFormats }));

        router.push('/home/consignArtwork');
    };

    const checkStepProgress = getStepStatus({ formats: values.formats });

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

            await dispatch(
                assetMediaThunk({
                    ...values,
                    formats: responseUpload.reduce((acc, cur) => ({ ...acc, ...cur }), {} as FormatMediaSave),
                })
            );
        };

        if (requestUploadReady.length) uploadAsset();
    }, [requestAssetUpload]);

    const file = values?.formats?.original?.file;

    useEffect(() => {
        if (file && !values?.definition) {
            (async () => {
                if (file) {
                    const definition = await getMediaDefinition({ fileOrUrl: file });

                    setFieldValue('definition', definition);
                }
            })();
        }
    }, [values.formats?.original?.file]);

    const urlAssetFile: string = useMemo(() => {
        return file && file instanceof File ? URL.createObjectURL(file) : file ? (file as string) : '';
    }, [file]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                backOnclick={handleOpenBackModal}
                submitText={texts.nextButton}
                stepStatus={checkStepProgress}
                stepNumber={1}
                title={texts.consignArtworkTitle}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />

                <Stack
                    overflow="auto"
                    maxWidth={{ xs: 'calc(90vw)', sm: 'calc(90vw)', md: 'calc(83vw)' }}
                    maxHeight={{ xs: 'calc(65vh - 64px)', sm: 'calc(65vh - 64px)', md: 'calc(65vh - 64px)' }}
                >
                    <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                        {texts.assetMediaDescription}
                    </Typography>
                    <Typography marginBottom={2} fontSize="1.1rem" color="grey" fontWeight="500" marginTop={2}>
                        {texts.assetMediaTitle}
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
                                        {texts.assetMediaAmazing}
                                        <Typography fontSize="0.9" marginTop={2}>
                                            {texts.assetMediaConcerned}
                                        </Typography>
                                    </Typography>
                                </Box>
                            )}

                            <Typography marginTop={2} color="grey" fontSize="1rem" fontWeight="bold">
                                {(language['studio.consignArtwork.assetMedia.definition'] as TranslateFunction)({
                                    definition: values.definition,
                                })}{' '}
                                {texts.assets}
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
                <ModalBackConfirm
                    show={showBackModal}
                    handleClose={handleCloseBackModal}
                    yesClick={handleSaveData}
                    noClick={handleCancelBackModal}
                />
            </PageContainerFooter>
        </form>
    );
}
