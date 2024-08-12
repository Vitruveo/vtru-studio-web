/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { IconTrash } from '@tabler/icons-react';
import {
    Box,
    SvgIcon,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    AssetMediaFormErros,
    AssetMediaFormValues,
    Definition,
    FormatMedia,
    FormatsMedia,
    OriginalFormatMedia,
} from './types';
import Crop from '../components/crop';
import VideoPreview, { RangeTime } from './videoPreview';
import {
    formatFileSize,
    getFileSize,
    getVideoDuration,
    handleGetFileType,
    handleGetFileWidthAndHeight,
    mediaConfigs,
} from './helpers';
import ModalError from './modalError';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import { useSelector } from '@/store/hooks';
import UploadProgressBar from '../components/uploadProgress';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { useDispatch } from '@/store/hooks';
import { assetActionsCreators } from '@/features/asset/slice';
import { validateUploadedMediaThunk } from '@/features/asset/thunks';
import { IconCircleX } from '@tabler/icons-react';

interface MediaCardProps {
    deleteKeys: string[];
    formatType: string;
    formatValue: FormatMedia | OriginalFormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['formats'];
    urlAssetFile: string;
    definition?: Definition;
    handleUploadFile: ({
        formatUpload,
        file,
        maxSize,
        rangeTimeStart,
        rangeTimeEnd,
    }: {
        width: number;
        height: number;
        formatUpload: string;
        file: File;
        maxSize?: string;
        rangeTimeStart?: string;
        rangeTimeEnd?: string;
    }) => Promise<void>;
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
    const fileIsLocal = formatValue.file && typeof formatValue.file !== 'string';

    const urlAssetFile = useMemo(() => {
        return fileIsLocal ? URL.createObjectURL(formatValue.file as Blob) : formatValue.file;
    }, [formatValue.file]) as string;

    const imgRef = React.useRef<HTMLImageElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const [fileIsload, setFileIsload] = useState(true);
    const [currentSrcType, setCurrentSrcType] = useState<string>(urlAssetFile);
    const [dimensionError, setDimensionError] = useState<boolean>();
    const [sizeError, setSizeError] = useState<boolean>();
    const dispatch = useDispatch();

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);
    const [showVideoPreview, setShowVideoPreview] = useState(false);

    const { language } = useI18n();

    const mediaConfig =
        mediaConfigs[definition as keyof typeof mediaConfigs]?.[
            formatType as keyof (typeof mediaConfigs)['landscape']
        ] || {};

    const mediaWidth = formats.original.width;
    const mediaHeight = formats.original.height;

    const { requestAssetUpload: upload, formats: assetFormats } = useSelector((state) => state.asset);
    const format = assetFormats[formatType as keyof FormatsMedia];
    const originalMediaInfo = handleGetFileType(formats.original.file!);
    const isVideo = originalMediaInfo.mediaType === 'video' && formatType !== 'print';

    const thumbSRC = useMemo(() => {
        return fileIsLocal
            ? URL.createObjectURL(formatValue.file as Blob)
            : (formatValue.file as string)?.replace(/\.[^/.]+$/, `_thumb.${isVideo ? 'mp4' : 'jpg'}`);
    }, [formatValue.file]) as string;

    const fileStatus = formatValue.transactionId ? upload[formatValue.transactionId] : undefined;
    const uploadSuccess = fileStatus
        ? fileStatus?.uploadProgress === 100
        : formatValue.successUpload || (formatValue.file && !fileIsLocal);

    const texts = {
        video: language['studio.consignArtwork.assetMedia.video'],
        image: language['studio.consignArtwork.assetMedia.image'],
        mediaIs: language['studio.consignArtwork.assetMedia.mediaIs'],
        uploadButton: language['studio.consignArtwork.assetMedia.upload.button'],
    } as { [key: string]: string };

    function compareDimensions(dimensions: Dimensions): boolean {
        const minimumConfigHeight = dimensions.configHeight * 0.8;
        const minimumConfigWidth = dimensions.configWidth * 0.8;

        if (dimensions.imageHeight < minimumConfigHeight || dimensions.imageWidth < minimumConfigWidth) {
            return false;
        }

        return true;
    }

    const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        // fileRejections.forEach(({ file, errors }) => {
        //     if (errors[0].code === 'file-too-large') {
        //         setSizeError(true);
        //         setModalErrorOpen(true);
        //     }
        // });
        // if (fileRejections.length > 0) return;
        const imgWidthAndHeight = await handleGetFileWidthAndHeight(acceptedFiles[0]);

        // const isValid = compareDimensions({
        //     configHeight: mediaConfig.height,
        //     configWidth: mediaConfig.width,
        //     imageHeight: imgWidthAndHeight.height,
        //     imageWidth: imgWidthAndHeight.width,
        // });

        // if (!isValid) {
        //     setDimensionError(true);
        //     setModalErrorOpen(true);
        //     return;
        // }

        if (isVideo) {
            const videoDuration = await getVideoDuration(acceptedFiles[0]);
            if (formatType === 'preview' && videoDuration > 5) {
                setMediaCrop(acceptedFiles[0]);
                setShowVideoPreview(true);
                return;
            }
        }

        if (
            isVideo ||
            (imgWidthAndHeight.width === mediaConfig.width && imgWidthAndHeight.height === mediaConfig.height)
        ) {
            const checkSize = isVideo ? mediaConfig.sizeMB?.video : mediaConfig.sizeMB?.image;

            await handleUploadFile({
                width: mediaConfig.width,
                height: mediaConfig.height,
                formatUpload: formatType,
                file: acceptedFiles[0],
                maxSize: checkSize.toString(),
            });
            setFieldValue(`formats.${formatType}.file`, acceptedFiles[0]);
        } else {
            setMediaCrop(acceptedFiles[0]);
            setShowCrop(true);
        }
    };

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
    });

    const handleDeleteFile = () => {
        const newValue = { file: undefined, customFile: undefined };
        const newDeleteKeys = [...deleteKeys];

        if (fileStatus?.path) newDeleteKeys.push(fileStatus.path);

        if (formatType === 'original') {
            dispatch(assetActionsCreators.clearRequestAssetUpload());
            Object.values(formats).forEach((v) => {
                const uploadFormat = upload[v.transactionId];
                if (v.file && uploadFormat) {
                    newDeleteKeys.push(uploadFormat.path);
                } else if (v.path) {
                    newDeleteKeys.push(v.path);
                }
            });
            setFieldValue('formats.original', newValue);
            setFieldValue('formats.display', newValue);
            setFieldValue('formats.exhibition', newValue);
            setFieldValue('formats.preview', newValue);
            setFieldValue('formats.print', newValue);
        } else {
            setFieldValue(`formats.${formatType}`, newValue);
        }

        setFieldValue('deleteKeys', newDeleteKeys);
    };

    const handleChangeCrop = (fileChange: File) => {
        const checkSize = isVideo ? mediaConfig.sizeMB?.video : mediaConfig.sizeMB?.image;

        handleUploadFile({
            width: mediaConfig.width,
            height: mediaConfig.height,
            formatUpload: formatType,
            file: fileChange,
            maxSize: checkSize.toString(),
        });
        setFieldValue(`formats.${formatType}.file`, fileChange);
        setShowCrop(false);
    };

    const handleChangeVideoPreview = (fileChange: File, rangeTime: RangeTime) => {
        const checkSize = isVideo ? mediaConfig.sizeMB?.video : mediaConfig.sizeMB?.image;

        handleUploadFile({
            width: mediaConfig.width,
            height: mediaConfig.height,
            formatUpload: formatType,
            file: fileChange,
            rangeTimeStart: rangeTime.start.toString(),
            rangeTimeEnd: rangeTime.end.toString(),
            maxSize: checkSize.toString(),
        });
        setFieldValue(`formats.${formatType}.file`, fileChange);
        setShowVideoPreview(false);
        setFileIsload(true);
    };

    const handleClose = () => {
        setShowCrop(false);
        setShowVideoPreview(false);
    };

    const handleCloseModalError = () => {
        setDimensionError(false);
        setSizeError(false);
        setModalErrorOpen(false);
    };

    const handleError = () => {
        setFileIsload(true);
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.src = `${currentSrcType}?retry=${Date.now()}`;
                setCurrentSrcType(currentSrcType === urlAssetFile ? thumbSRC : urlAssetFile);
            }
        }, 1000);
    };

    const handleVideoError = () => {
        setFileIsload(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.src = `${currentSrcType}?retry=${Date.now()}`;
                setCurrentSrcType(currentSrcType === urlAssetFile ? thumbSRC : urlAssetFile);
            }
        }, 1000);
    };

    const handleLoad = () => {
        setFileIsload(false);
    };

    useEffect(() => {
        if (uploadSuccess && fileStatus && formatType === 'preview' && isVideo) {
            const intervalId = setInterval(() => {
                const checkPreviewURL = `${ASSET_STORAGE_URL}/${fileStatus?.path}?retry=${Date.now()}`;
                fetch(checkPreviewURL, { method: 'GET' }).then((response) => {
                    if (response.ok) {
                        if (videoRef.current) {
                            setFileIsload(false);
                            videoRef.current.src = checkPreviewURL;
                            clearInterval(intervalId);
                        }
                    }
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [uploadSuccess]);

    useEffect(() => {
        const requestAssetUploadComplete = Object.values(upload)?.filter(
            (item) => item.transactionId && item.url && item.uploadProgress === 100 && item.status === 'completed'
        );
        const requestUploadComplete = Object.values(requestAssetUploadComplete);
        if (requestUploadComplete?.length && fileStatus && definition && format)
            dispatch(
                validateUploadedMediaThunk({
                    media: formatType,
                    path: fileStatus.path,
                    orientation: definition,
                })
            );
    }, [upload]);

    return (
        <Box marginLeft={1} width={160}>
            <Box marginTop={2} height={20} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <SvgIcon style={{ width: 20 }}>
                        {!format?.validation?.message ? (
                            <>
                                <circle cx="12" cy="12" r="12" fill={uploadSuccess ? '#4CAF50' : '#D3D3D3'} />
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
                            </>
                        ) : (
                            <>
                                <circle cx="12" cy="12" r="12" fill={'red'} />
                                <IconCircleX
                                    fontSize="small"
                                    style={{
                                        color: '#FFFFFF',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            </>
                        )}
                    </SvgIcon>

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
                            {!thumbSRC || (mediaConfig?.sizeMB && !formatValue.size)
                                ? `${
                                      isVideo
                                          ? formatFileSize(mediaConfig?.sizeMB.video)
                                          : formatFileSize(mediaConfig?.sizeMB.image)
                                  } ${(language['studio.consignArtwork.assetMedia.max'] as TranslateFunction)({
                                      seconds: isVideo && formatType === 'preview' ? 5 : 0,
                                  })}`
                                : getFileSize(formatValue.size)}
                        </Typography>
                    </Typography>
                </Box>
                <Box width="100%" justifyContent="center" alignItems="center" height={200}>
                    <Box paddingInline={1} marginTop={1} height={15}>
                        {fileStatus && fileStatus.status !== 'completed' && fileStatus.status !== 'saved' ? (
                            <UploadProgressBar fileStatus={fileStatus} />
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {formatValue.file ? (
                            <Box display="flex" justifyContent="center" alignItems="center" width={120}>
                                <Box
                                    display={
                                        formatValue.load ||
                                        (fileIsload && !isVideo) ||
                                        (fileIsload && isVideo && formatType === 'preview' && fileStatus)
                                            ? 'flex'
                                            : 'none'
                                    }
                                    justifyContent="center"
                                    height={100}
                                    alignItems="center"
                                    textAlign="center"
                                >
                                    <CircularProgress color="primary" />
                                </Box>
                                {formatType !== 'print' && originalMediaInfo.mediaType === 'video' ? (
                                    <video
                                        ref={videoRef}
                                        onError={handleVideoError}
                                        controls
                                        width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                        height={
                                            definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100
                                        }
                                        src={thumbSRC!}
                                        style={{
                                            objectFit: 'contain',
                                            display:
                                                formatValue.load ||
                                                (fileIsload && fileStatus && formatType === 'preview')
                                                    ? 'none'
                                                    : '',
                                        }}
                                    />
                                ) : (
                                    <img
                                        ref={imgRef}
                                        onLoad={handleLoad}
                                        onError={handleError}
                                        width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                        height={
                                            definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100
                                        }
                                        src={thumbSRC!}
                                        alt=""
                                        style={{
                                            objectFit: 'contain',
                                            opacity: formatValue.load || fileIsload ? 0 : 1,
                                            display: formatValue.load || fileIsload ? 'none' : '',
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

            <Dialog maxWidth="lg" open={showVideoPreview} onClose={handleClose}>
                <DialogTitle color="GrayText">Select a starting point for creating the preview</DialogTitle>
                <DialogContent>
                    <VideoPreview file={mediaCrop} mediaConfig={mediaConfig} onChange={handleChangeVideoPreview} />
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
