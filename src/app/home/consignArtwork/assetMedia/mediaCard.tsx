import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues, FormatMedia } from './types';
import Crop from './crop';
import { getFileSize, handleGetFileType, handleGetFileWidthAndHeight, mediaConfigs } from './helpers';
import ModalError from './modalError';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';

interface MediaCardProps {
    formatType: string;
    formatValue: FormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['formats'];
    urlAssetFile: string;
    definition: AssetMediaFormValues['definition'];
    handleUploadFile: ({ formatUpload, file }: { formatUpload: string; file: File }) => Promise<void>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}

export interface MediaConfig {
    width: number;
    height: number;
    sizeMB: {
        image: number;
        video: number;
    };
    required: boolean;
}

export default function MediaCard({
    formatType,
    formats,
    formatValue,
    definition,
    setFieldValue,
    handleUploadFile,
}: MediaCardProps) {
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);
    const [mediaWidth, setMediaWidth] = useState(0);
    const [mediaHeight, setMediaHeight] = useState(0);

    const { language } = useI18n();

    const mediaConfig =
        mediaConfigs[definition as keyof typeof mediaConfigs]?.[
            formatType as keyof (typeof mediaConfigs)['landscape']
        ] || {};

    const texts = {
        video: language['studio.consignArtwork.assetMedia.video'],
        image: language['studio.consignArtwork.assetMedia.image'],
        max: language['studio.consignArtwork.assetMedia.max'],
        mediaIs: language['studio.consignArtwork.assetMedia.mediaIs'],
        uploadButton: language['studio.consignArtwork.assetMedia.upload.button'],
    } as { [key: string]: string };

    const originalMediaInfo = handleGetFileType(formats.original.file!);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const checkType = handleGetFileType(acceptedFiles[0]);
            const imgWidthAndHeight = await handleGetFileWidthAndHeight(acceptedFiles[0]);

            if (
                originalMediaInfo.mediaType === 'video' ||
                (imgWidthAndHeight.width === mediaConfig.width && imgWidthAndHeight.height === mediaConfig.height)
            ) {
                handleUploadFile({ formatUpload: formatType, file: acceptedFiles[0] });
                setFieldValue(`formats.${formatType}`, { file: acceptedFiles[0] });
            } else {
                setMediaCrop(acceptedFiles[0]);
                setShowCrop(true);
            }
        },
        [setFieldValue]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const urlAssetFile = useMemo(() => {
        return formatValue.file && typeof formatValue.file !== 'string'
            ? URL.createObjectURL(formatValue.file)
            : formatValue.file;
    }, [formatValue.file]);

    const handleDeleteFile = () => {
        const newValue = { file: undefined, customFile: undefined };
        if (formatType === 'original') {
            setFieldValue('formats.original', newValue);
            setFieldValue('formats.display', newValue);
            setFieldValue('formats.exhibition', newValue);
            setFieldValue('formats.preview', newValue);
            setFieldValue('formats.print', newValue);
            setFieldValue('definition', '');
        } else {
            setFieldValue(`formats.${formatType}`, newValue);
        }
    };

    const handleChangeCrop = (fileChange: File) => {
        setShowCrop(false);
        handleUploadFile({ formatUpload: formatType, file: fileChange });
        setFieldValue(`formats.${formatType}.file`, fileChange);
    };

    const handleClose = () => {
        setShowCrop(false);
    };

    const handleCloseModalError = () => {
        setModalErrorOpen(false);
    };

    useEffect(() => {
        if (formatType === 'original') {
            (async () => {
                const imgWidthAndHeight = await handleGetFileWidthAndHeight(formatValue.file!);
                setMediaWidth(imgWidthAndHeight.width);
                setMediaHeight(imgWidthAndHeight.height);
            })();
        }
    }, []);

    return (
        <Box marginLeft={1} width={150}>
            <Box marginTop={2} height={20} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    {formatValue.file ? (
                        <SvgIcon style={{ width: 20 }}>
                            <rect width="24" height="24" rx="4" fill="#4CAF50" />
                            <CheckCircleOutlineIcon
                                fontSize="small"
                                style={{
                                    color: '#FFFFFF',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        </SvgIcon>
                    ) : (
                        <Typography variant="h3" style={{ color: 'red' }}>
                            ?
                        </Typography>
                    )}

                    <Typography marginLeft={1} color="grey" variant="h6" fontWeight="normal">
                        {(language['studio.consignArtwork.assetMedia.formats'] as TranslateFunction)({
                            format: formatType,
                        })}
                    </Typography>
                </Box>
                {formatValue.file && (
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile();
                        }}
                    >
                        <IconTrash color="red" size="16" stroke={1.5} />
                    </IconButton>
                )}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginTop={2}
                height={220}
                border="2px solid"
                borderRadius={2}
                borderColor="#D5D5D5"
            >
                <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    borderBottom="1px solid #D5D5D5"
                    padding={1}
                    borderColor="#D5D5D5"
                    borderRadius="10px 10px 0px 0px"
                    bgcolor="#EFEFEF"
                    height={70}
                >
                    <Typography fontSize="0.8rem" color="GrayText" textAlign="center">
                        {originalMediaInfo.contentType}{' '}
                        {originalMediaInfo.mediaType === 'video' ? texts.video : texts.image}
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.width || mediaWidth} X {mediaConfig?.height || mediaHeight}
                        </Typography>
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.sizeMB
                                ? `${
                                      originalMediaInfo.mediaType === 'video'
                                          ? mediaConfig?.sizeMB.video
                                          : mediaConfig?.sizeMB.image
                                  } MB ${texts.max}`
                                : getFileSize(formatValue.file!)}
                        </Typography>
                    </Typography>
                </Box>
                <Box display="flex" width="100%" justifyContent="center" alignItems="center" height={190}>
                    {formatValue.file ? (
                        <Box display="flex" justifyContent="center" alignItems="center" width={120}>
                            {originalMediaInfo.mediaType === 'video' ? (
                                <video
                                    controls
                                    width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                    height={definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100}
                                    src={urlAssetFile!}
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                />
                            ) : (
                                <Img
                                    width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                    height={definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100}
                                    src={urlAssetFile!}
                                    alt=""
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box>
                            <Box
                                {...getRootProps()}
                                height={80}
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button size="small" variant="contained">
                                    {texts.uploadButton}
                                </Button>
                            </Box>

                            <Box>
                                <Typography>{texts.mediaIs}</Typography>
                                <Typography textAlign="center" fontWeight="bold">
                                    {(language['studio.consignArtwork.assetMedia.mediaRequired'] as TranslateFunction)({
                                        required: mediaConfig.required,
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <Dialog maxWidth="lg" open={showCrop} onClose={handleClose}>
                <DialogTitle color="GrayText">
                    {(language['studio.consignArtwork.assetMedia.cropModal.title'] as TranslateFunction)({
                        width: mediaConfig.width,
                        height: mediaConfig.height,
                    })}
                </DialogTitle>
                <DialogContent>
                    <Crop
                        file={mediaCrop}
                        mediaConfig={mediaConfig}
                        definition={definition}
                        onChange={handleChangeCrop}
                    />
                </DialogContent>
            </Dialog>

            <ModalError
                format={formatType}
                open={modalErrorOpen}
                definition={definition}
                setClose={handleCloseModalError}
            />
        </Box>
    );
}
