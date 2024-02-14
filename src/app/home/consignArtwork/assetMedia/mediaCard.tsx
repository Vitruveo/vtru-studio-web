import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues, Definition, FormatMedia } from './types';
import Crop from '../components/crop';
import { formatFileSize, getFileSize, handleGetFileType, handleGetFileWidthAndHeight, mediaConfigs } from './helpers';
import ModalError from './modalError';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import { useSelector } from '@/store/hooks';
import UploadProgressBar from '../components/uploadProgress';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

interface MediaCardProps {
    deleteKeys: string[];
    formatType: string;
    formatValue: FormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['formats'];
    urlAssetFile: string;
    definition?: Definition;
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

interface Dimensions {
    imageHeight: number;
    imageWidth: number;
    configHeight: number;
    configWidth: number;
}

export default function MediaCard({
    formatType,
    formats,
    formatValue,
    definition,
    deleteKeys,
    setFieldValue,
    handleUploadFile,
}: MediaCardProps) {
    const [dimensionError, setDimensionError] = useState<boolean>();
    const [sizeError, setSizeError] = useState<boolean>();

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);

    const { language } = useI18n();

    const mediaConfig =
        mediaConfigs[definition as keyof typeof mediaConfigs]?.[
            formatType as keyof (typeof mediaConfigs)['landscape']
        ] || {};

    const mediaWidth = formats.original.width;
    const mediaHeight = formats.original.height;

    const upload = useSelector((state) => state.asset.requestAssetUpload);
    const fileStatus = formatValue.transactionId ? upload[formatValue.transactionId] : undefined;

    const texts = {
        video: language['studio.consignArtwork.assetMedia.video'],
        image: language['studio.consignArtwork.assetMedia.image'],
        max: language['studio.consignArtwork.assetMedia.max'],
        mediaIs: language['studio.consignArtwork.assetMedia.mediaIs'],
        uploadButton: language['studio.consignArtwork.assetMedia.upload.button'],
    } as { [key: string]: string };

    const originalMediaInfo = handleGetFileType(formats.original.file!);
    const isVideo = originalMediaInfo.mediaType === 'video' && formatType !== 'print';

    function compareDimensions(dimensions: Dimensions): boolean {
        const minimumConfigHeight = dimensions.configHeight * 0.8;
        const minimumConfigWidth = dimensions.configWidth * 0.8;

        if (dimensions.imageHeight < minimumConfigHeight || dimensions.imageWidth < minimumConfigWidth) {
            return false;
        }

        return true;
    }

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            fileRejections.forEach(({ file, errors }) => {
                if (errors[0].code === 'file-too-large') {
                    setSizeError(true);
                    setModalErrorOpen(true);
                }
            });
            if (fileRejections.length > 0) return;
            const imgWidthAndHeight = await handleGetFileWidthAndHeight(acceptedFiles[0]);

            const isValid = compareDimensions({
                configHeight: mediaConfig.height,
                configWidth: mediaConfig.width,
                imageHeight: imgWidthAndHeight.height,
                imageWidth: imgWidthAndHeight.width,
            });

            if (!isValid) {
                setDimensionError(true);
                setModalErrorOpen(true);
                return;
            }

            if (
                isVideo ||
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

    const handleGetAccept = () => {
        let accept = {};
        if (!isVideo) {
            accept = {
                'image/jpeg': [],
                'image/png': [],
                'image/gif': [],
                'image/svg+xml': [],
                'image/webp': [],
            };
        } else {
            accept = {
                'video/mp4': [],
                'video/webm': [],
            };
        }
        return accept;
    };

    function convertMBToBytes(sizeInMB: number): number {
        return sizeInMB * 1000000;
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: handleGetAccept(),
        maxFiles: 1,
        maxSize: convertMBToBytes(isVideo ? mediaConfig.sizeMB?.video : mediaConfig.sizeMB?.image),
    });

    const fileIsLocal = formatValue.file && typeof formatValue.file !== 'string';

    const urlAssetFile = useMemo(() => {
        return fileIsLocal ? URL.createObjectURL(formatValue.file as Blob) : formatValue.file;
    }, [formatValue.file]) as string;

    const thumbSRC = useMemo(() => {
        return fileIsLocal
            ? URL.createObjectURL(formatValue.file as Blob)
            : (formatValue.file as string)?.replace(/\.[^/.]+$/, '_thumb.jpg');
    }, [formatValue.file]) as string;

    console.log({ thumbSRC });

    const handleDeleteFile = () => {
        const newValue = { file: undefined, customFile: undefined };
        if (fileStatus?.url) setFieldValue('deleteKeys', [...deleteKeys, fileStatus.url]);
        if (formatType === 'original') {
            setFieldValue('formats.original', newValue);
            setFieldValue('formats.display', newValue);
            setFieldValue('formats.exhibition', newValue);
            setFieldValue('formats.preview', newValue);
            setFieldValue('formats.print', newValue);
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
        setDimensionError(false);
        setSizeError(false);
        setModalErrorOpen(false);
    };

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
                height={240}
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
                        {isVideo ? originalMediaInfo.contentType : handleGetFileType(formatValue.file).contentType}{' '}
                        {isVideo ? texts.video : texts.image}
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.width || mediaWidth} X {mediaConfig?.height || mediaHeight}
                        </Typography>
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.sizeMB
                                ? `${
                                      isVideo
                                          ? formatFileSize(mediaConfig?.sizeMB.video)
                                          : formatFileSize(mediaConfig?.sizeMB.image)
                                  } ${texts.max}`
                                : getFileSize(formatValue.file!)}
                        </Typography>
                    </Typography>
                </Box>
                <Box width="100%" justifyContent="center" alignItems="center" height={200}>
                    <Box paddingInline={1} marginTop={1} height={15}>
                        {fileStatus && fileStatus.status !== 'completed' ? (
                            <UploadProgressBar fileStatus={fileStatus} />
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {formatValue.file ? (
                            <Box display="flex" justifyContent="center" alignItems="center" width={120}>
                                {fileIsLocal && formatType !== 'print' && originalMediaInfo.mediaType === 'video' ? (
                                    <video
                                        controls
                                        width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                        height={
                                            definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100
                                        }
                                        src={urlAssetFile!}
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                    />
                                ) : (
                                    <img
                                        width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                        height={
                                            definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100
                                        }
                                        src={thumbSRC!}
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
                                    height={80}
                                    width="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <input id="asset" {...getInputProps()} />
                                    <Button {...getRootProps()} size="small" variant="contained">
                                        {texts.uploadButton}
                                    </Button>
                                </Box>

                                <Box>
                                    <Typography>{texts.mediaIs}</Typography>
                                    <Typography textAlign="center" fontWeight="bold">
                                        {(
                                            language[
                                                'studio.consignArtwork.assetMedia.mediaRequired'
                                            ] as TranslateFunction
                                        )({
                                            required: mediaConfig.required,
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
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
                    <Crop file={mediaCrop} mediaConfig={mediaConfig} onChange={handleChangeCrop} />
                </DialogContent>
            </Dialog>

            <ModalError
                format={formatType}
                isVideo={isVideo}
                dimensionError={dimensionError}
                sizeError={sizeError}
                mediaConfig={mediaConfig}
                open={modalErrorOpen}
                definition={definition}
                setClose={handleCloseModalError}
            />

            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </Box>
    );
}
