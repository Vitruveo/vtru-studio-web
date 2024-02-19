'use client';

import { useEffect, useMemo, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import { Box, IconButton, Typography } from '@mui/material';

import { useDispatch, useSelector } from '@/store/hooks';
import { AssetMediaFormValues, FormatMediaSave, FormatsMedia } from './types';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import SelectMedia from './selectMedia';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';

import { assetMediaThunk, assetStorageThunk, sendRequestUploadThunk } from '@/features/asset/thunks';
import { getMediaDefinition, getStepStatus, handleGetFileType } from './helpers';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';

import { assetActionsCreators } from '@/features/asset/slice';
import { requestDeleteFiles } from '@/features/asset/requests';
import { ASSET_STORAGE_URL } from '@/constants/asset';

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
        differentUses: language['studio.consignArtwork.assetMedia.differentUses'],
        assetMediaAmazing: language['studio.consignArtwork.assetMedia.amazing'],
        haveCreated: language['studio.consignArtwork.assetMedia.haveCreated'],
        haveNotCreated: language['studio.consignArtwork.assetMedia.haveNotCreated'],
        previewHelp: language['studio.consignArtwork.assetMedia.previewHelp'],
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

    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = useMemo(
        () => ({
            deleteKeys: [],
            formats: asset.formats,
        }),
        []
    );

    const { values, errors, setFieldValue, handleSubmit } = useFormik<AssetMediaFormValues>({
        initialValues,
        onSubmit: async () => {
            if (JSON.stringify(initialValues) === JSON.stringify(values) && !values.deleteKeys.length)
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

                if (values.deleteKeys.length)
                    await requestDeleteFiles({
                        deleteKeys: values.deleteKeys,
                        transactionId: nanoid(),
                    });

                const deleteFormats = Object.entries(values.formats)
                    .filter(([_, value]) => !value.file)
                    .map(([key, _]) => key);
                if (deleteFormats.length) await dispatch(assetMediaThunk({ deleteFormats }));

                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/assetMetadata`);
            }
        },
    });

    const originalFileType = handleGetFileType(values.formats?.original?.file);

    const handleUploadFile = async ({ formatUpload, file }: { formatUpload: string; file: File }) => {
        const transactionId = nanoid();

        await dispatch(
            assetActionsCreators.requestAssetUpload({
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
        if (values.formats?.original?.definition) {
            const requestAssetUploadNotUsed = Object.values(asset.requestAssetUpload)?.filter(
                (item) => item.transactionId && item.url && item.status === 'ready'
            );

            if (!requestAssetUploadNotUsed || !requestAssetUploadNotUsed?.length) return;

            const requestUploadReady = Object.values(requestAssetUploadNotUsed);

            const uploadAsset = async () => {
                const responseUpload = await Promise.all(
                    requestUploadReady.map(async (item) => {
                        const url = item.url;
                        dispatch(
                            assetActionsCreators.requestAssetUpload({
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
                                transactionId: item.transactionId,
                                file: value.file!,
                                url,
                            })
                        );

                        let formatSave = {};

                        if (key === 'original') {
                            formatSave = {
                                size: value.file!.size,
                                definition: value.definition,
                                width: value.width,
                                height: value.height,
                            };
                        }

                        return {
                            [key]: {
                                ...formatSave,
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
        }
    }, [asset.requestAssetUpload, values?.formats]);

    const file = values?.formats?.original?.file;

    useEffect(() => {
        if (file) {
            if (!values?.formats.original.definition) {
                (async () => {
                    const { definition, width, height } = await getMediaDefinition({ fileOrUrl: file });
                    setFieldValue('formats.original.width', width);
                    setFieldValue('formats.original.height', height);
                    setFieldValue('formats.original.definition', definition);
                })();
            }
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

                <Stack marginBottom={10} maxWidth={{ xs: '100%', sm: '100%', md: '100%' }}>
                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                        {texts.assetMediaTitle}
                    </Typography>
                    <Typography marginBottom={2} fontSize="1.1rem" fontWeight="normal" color="GrayText">
                        {texts.assetMediaDescription}
                    </Typography>
                    {urlAssetFile && (
                        <Box>
                            {showFormtsInfo && (
                                <Box padding={2} bgcolor="#FFF2CC" position="relative">
                                    <IconButton
                                        size="small"
                                        style={{ position: 'absolute', top: 1, right: 1 }}
                                        onClick={() => setShowFormatsInfo(false)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                    <Typography fontSize="0.9">
                                        {texts.differentUses}
                                        <Typography fontSize="0.9" marginTop={1}>
                                            {texts.assetMediaAmazing}
                                        </Typography>
                                        <Typography fontSize="0.9" marginTop={1}>
                                            {texts.haveCreated}
                                        </Typography>
                                        <Typography fontSize="0.9" marginTop={1}>
                                            {texts.haveNotCreated}
                                        </Typography>
                                        {originalFileType.mediaType === 'video' && (
                                            <Typography fontSize="0.9" marginTop={1}>
                                                {texts.previewHelp}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>
                            )}

                            {/* <Typography marginTop={2} color="grey" fontSize="1rem" fontWeight="bold">
                                {(language['studio.consignArtwork.assetMedia.definition'] as TranslateFunction)({
                                    definition: values.definition,
                                })}{' '}
                                {texts.assets}
                            </Typography> */}
                            <Box marginTop={1} display="flex" flexWrap="wrap">
                                {Object.entries(values.formats).map(([formatType, value], index) => (
                                    <Box style={{ marginRight: '10px' }} key={index}>
                                        <MediaCard
                                            key={index}
                                            errors={errors}
                                            formats={values.formats}
                                            formatType={formatType}
                                            formatValue={value}
                                            deleteKeys={values.deleteKeys}
                                            urlAssetFile={urlAssetFile}
                                            definition={values.formats?.original?.definition}
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
                            definition={values.formats?.original?.definition}
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
