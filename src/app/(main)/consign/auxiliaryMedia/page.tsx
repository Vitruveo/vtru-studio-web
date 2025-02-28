'use client';

import { useEffect, useMemo, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/system';
import { Box, Radio, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { AssetMediaFormValues, FormatMediaSave, FormatsAuxiliayMedia } from './types';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import MediaCard from './mediaCard';
import { consignArtworkActionsCreators } from '@/features/consign/slice';
import { auxiliaryMediaThunk, assetStorageThunk, sendRequestUploadThunk } from '@/features/asset/thunks';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';
import { assetActionsCreators } from '@/features/asset/slice';
import { requestDeleteFiles } from '@/features/asset/requests';
import { useToastr } from '@/app/hooks/useToastr';
import { RichEditor } from '../../components/rich-editor/rich-editor';
import { createDescriptionInitialState, getDescriptionJSONString, getDescriptionText } from './helpers';

export default function AssetMedia() {
    const [showBackModal, setShowBackModal] = useState(false);
    const toast = useToastr();
    const { language } = useI18n();

    const texts = {
        optional: language['studio.consignArtwork.optional'],
        nextButton: language['studio.consignArtwork.form.next.button'],
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        assetMediaTitle: language['studio.consignArtwork.auxiliaryMedia.title'],
        assetMediaSubTitle: language['studio.consignArtwork.auxiliaryMedia.subTitle'],
        assetMediaDescription: language['studio.consignArtwork.auxiliaryMedia.description'],
        assetMediaConcerned: language['studio.consignArtwork.assetMedia.concerned'],
        description: language['studio.consignArtwork.auxiliaryMedia.field.description'],
        descriptionPlaceholder: language['studio.consignArtwork.auxiliaryMedia.field.description.placeholder'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/consign',
            title: texts.consignArtworkTitle,
        },
        {
            title: texts.assetMediaTitle,
        },
    ];

    const asset = useSelector((state) => state.asset);
    const consignStatus = useSelector((state) => state.consignArtwork.status);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);

    // TODO: COLOCAR TIPAGEM CORRETA
    const isAREnabled = useSelector((state: any) => state.asset.assetMetadata?.taxonomy.formData?.arenabled) == 'yes';

    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues: AssetMediaFormValues = useMemo(
        () => ({
            description: createDescriptionInitialState(asset.mediaAuxiliary.description),
            definition: '',
            deleteKeys: [],
            formats: asset.mediaAuxiliary.formats,
        }),
        []
    );

    const { values, errors, setFieldValue, handleSubmit } = useFormik<AssetMediaFormValues>({
        initialValues,
        onSubmit: async (formValues) => {
            if (hasContract) {
                router.push('/consign');
                return;
            }

            if (JSON.stringify(initialValues) === JSON.stringify(values) && !values.deleteKeys.length)
                router.push('/consign');
            else {
                if (Object.values(values.formats).find((v) => v.file) || getDescriptionText(values.description).length)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'auxiliaryMedia',
                            status: 'completed',
                        })
                    );

                if (values.deleteKeys.length)
                    await requestDeleteFiles({
                        deleteKeys: values.deleteKeys.filter(Boolean),
                        transactionId: nanoid(),
                        assetId: asset._id,
                    });

                const deleteFormats = Object.entries(formValues.formats)
                    .filter(([_, value]) => !value.file)
                    .map(([key, _]) => key);

                await dispatch(
                    auxiliaryMediaThunk({
                        deleteFormats,
                        description: getDescriptionJSONString(formValues.description),
                    })
                );
                router.push('/consign');
            }
        },
    });

    // Altera o estado de AR habilitado ou não automaticamente
    useEffect(() => {
        if (values.formats.arVideo.file) {
            dispatch(assetActionsCreators.setArEnabled(true));
        } else {
            dispatch(assetActionsCreators.setArEnabled(false));
        }
    }, [values.formats.arVideo.file]);

    const handleUploadFile = async ({
        formatUpload,
        file,
        maxSize,
    }: {
        formatUpload: string;
        file: File;
        maxSize: string;
    }) => {
        if (hasContract) {
            toast.display({ message: 'You cannot upload files after signing the contract', type: 'warning' });
            return;
        }

        if (!file) {
            toast.display({ message: 'File format not supported', type: 'warning' });
            return;
        }

        const transactionId = nanoid();

        dispatch(
            assetActionsCreators.requestAssetUpload({
                key: formatUpload,
                status: 'requested',
                transactionId,
            })
        );

        dispatch(
            sendRequestUploadThunk({
                mimetype: file.type,
                metadata: {
                    formatUpload,
                    maxSize,
                },
                originalName: file!.name,
                transactionId,
                id: asset._id,
            })
        );

        setFieldValue(`formats.${formatUpload}.transactionId`, transactionId);
    };

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        if (hasContract) {
            router.push(`/consign`);
            return;
        }

        if (
            JSON.stringify(initialValues.formats) === JSON.stringify(values.formats) &&
            values.description === initialValues.description
        ) {
            router.push(`/consign`);
        } else {
            setShowBackModal(true);
        }
    };

    const handleSaveData = () => {
        if (hasContract) {
            router.push(`/consign`);
            return;
        }

        handleSubmit();
    };

    const handleCancelBackModal = async () => {
        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'auxiliaryMedia',
                status: 'completed',
            })
        );

        const deleteFormats = Object.entries(values.formats)
            .filter(([key, _value]) => !initialValues.formats[key as keyof FormatsAuxiliayMedia].file)
            .map(([key, _]) => key);

        if (deleteFormats.length) await dispatch(auxiliaryMediaThunk({ deleteFormats }));
        await dispatch(auxiliaryMediaThunk({ description: getDescriptionJSONString(initialValues.description) }));

        router.push('/consign');
    };

    const checkStepProgress =
        Object.values(asset.mediaAuxiliary.formats).find((v) => v.file) || getDescriptionText(values.description).length
            ? 'completed'
            : 'inProgress';

    useEffect(() => {
        if (hasContract) return;

        dispatch(
            consignArtworkActionsCreators.changeStatusStep({ stepId: 'auxiliaryMedia', status: checkStepProgress })
        );
    }, [checkStepProgress]);

    useEffect(() => {
        const requestAssetUploadNotUsed = Object.values(asset.requestAssetUpload)?.filter(
            (item) => item.transactionId && item.url && item.status === 'ready'
        );

        if (!requestAssetUploadNotUsed || !requestAssetUploadNotUsed?.length) return;

        const requestUploadReady = Object.values(requestAssetUploadNotUsed);

        const uploadAsset = async () => {
            requestUploadReady.map((item) => {
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

                const [_key, value] = formatByTransaction;

                dispatch(
                    assetStorageThunk({
                        transactionId: item.transactionId,
                        file: value.file!,
                        url,
                    })
                );
            });
        };

        if (requestUploadReady.length) uploadAsset();
    }, [asset.requestAssetUpload]);

    useEffect(() => {
        const requestAssetUploadComplete = Object.values(asset.requestAssetUpload)?.filter(
            (item) => item.transactionId && item.url && item.uploadProgress === 100 && item.status === 'completed'
        );

        if (!requestAssetUploadComplete || !requestAssetUploadComplete?.length) return;

        const requestUploadComplete = Object.values(requestAssetUploadComplete);

        const responseUpload = requestUploadComplete.map((item) => {
            const formatByTransaction = Object.entries(values.formats).find(
                ([_, format]) => format.transactionId === item.transactionId
            );

            if (!formatByTransaction) return;

            const [key, value] = formatByTransaction;

            setFieldValue(`formats.${key}.successUpload`, true);

            dispatch(
                assetActionsCreators.requestAssetUploadUsed({
                    transactionId: item.transactionId,
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
        });

        if (responseUpload?.length)
            dispatch(
                auxiliaryMediaThunk({
                    ...values,
                    formats: responseUpload.reduce((acc, cur) => ({ ...acc, ...cur }), {} as FormatMediaSave),
                    description: getDescriptionJSONString(values.description),
                })
            );
    }, [asset.requestAssetUpload, values?.formats]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                backOnclick={handleOpenBackModal}
                submitText={texts.nextButton}
                stepStatus={hasContract ? 'completed' : checkStepProgress}
                stepNumber={5}
                title={texts.consignArtworkTitle}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />

                <Stack marginBottom={10} maxWidth={{ xs: '100%', sm: '100%', md: '100%' }} alignItems="flex-start">
                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                        {texts.assetMediaTitle}
                    </Typography>
                    <Typography fontSize="1.1rem" fontWeight="normal" color="GrayText">
                        {texts.assetMediaDescription}
                    </Typography>

                    <Box>
                        <Box marginTop={1} display="flex" flexWrap="wrap">
                            {Object.entries(values.formats).map(([formatType, value], index) => (
                                <Box style={{ marginRight: '10px' }} key={index}>
                                    <MediaCard
                                        key={index}
                                        errors={errors}
                                        deleteKeys={values.deleteKeys}
                                        formats={values.formats}
                                        formatType={formatType}
                                        formatValue={value}
                                        setFieldValue={setFieldValue}
                                        handleUploadFile={handleUploadFile}
                                        disabled={consignStatus !== 'draft'}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" gap={1} mt={2}>
                            <Box display="flex" alignItems="center">
                                <Radio checked={isAREnabled} disabled />
                                <Typography color="GrayText" variant="subtitle1" component="label">
                                    This work is AR enabled
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Radio checked={!isAREnabled} disabled />
                                <Typography color="GrayText" variant="subtitle1" component="label">
                                    This work is not AR enabled
                                </Typography>
                            </Box>
                        </Box>

                        <Box marginTop={2}>
                            <Box>
                                <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                                    {texts.description}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="GrayText" mb={2} variant="subtitle1" component="label">
                                    {texts.descriptionPlaceholder}
                                </Typography>
                            </Box>
                            <Box mt={1}>
                                <RichEditor
                                    editorState={values.description}
                                    onChange={(state) => {
                                        dispatch(
                                            assetActionsCreators.changeAuxiliaryMediaDescription(
                                                getDescriptionJSONString(state)
                                            )
                                        );
                                        setFieldValue('description', state);
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
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
