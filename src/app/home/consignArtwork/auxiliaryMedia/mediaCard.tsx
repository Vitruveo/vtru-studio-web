/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button, Dialog, DialogContent } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues, FormatMedia } from './types';
import Crop from '../components/crop';
import { mediaConfigs } from './helpers';
import ModalError from './modalError';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import { handleGetFileType, handleGetFileWidthAndHeight } from '../assetMedia/helpers';
import UploadProgressBar from '../components/uploadProgress';
import { useDispatch, useSelector } from '@/store/hooks';
import { userActionsCreators } from '@/features/user/slice';
import { useToastr } from '@/app/hooks/useToastr';

interface MediaCardProps {
    deleteKeys: string[];
    formatType: string;
    formatValue: FormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['formats'];
    handleUploadFile: ({ formatUpload, file }: { formatUpload: string; file: File; maxSize: string }) => Promise<void>;
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
    deleteKeys,
    formatValue,
    setFieldValue,
    handleUploadFile,
}: MediaCardProps) {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const toast = useToastr();
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);
    const [mediaWidth, setMediaWidth] = useState(0);
    const [mediaHeight, setMediaHeight] = useState(0);

    const { language } = useI18n();
    const dispatch = useDispatch();

    const upload = useSelector((state) => state.asset.requestAssetUpload);
    const notify = useSelector((state) => state.user.notify);
    const fileIsLocal = formatValue.file && typeof formatValue.file !== 'string';

    const fileStatus = formatValue.transactionId ? upload[formatValue.transactionId] : undefined;
    const uploadSuccess = fileStatus
        ? fileStatus?.uploadProgress === 100
        : formatValue.successUpload || (formatValue.file && !fileIsLocal);

    const mediaConfig = mediaConfigs[formatType as keyof typeof mediaConfigs] || {};

    const texts = {
        video: language['studio.consignArtwork.assetMedia.video'],
        image: language['studio.consignArtwork.assetMedia.image'],
        mediaIs: language['studio.consignArtwork.assetMedia.mediaIs'],
        uploadButton: language['studio.consignArtwork.assetMedia.upload.button'],
    } as { [key: string]: string };

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            const file = acceptedFiles[0];

            const fileSize = file.size / 1024;
            if (fileSize > parseInt(mediaConfig?.sizeMB.toString()) * 1024) {
                toast.display({ message: 'File size exceeds the limit', type: 'warning' });
                return;
            }

            handleUploadFile({ formatUpload: formatType, file, maxSize: mediaConfig?.sizeMB.toString() });
            setFieldValue(`formats.${formatType}.file`, file);
        },
        [setFieldValue]
    );

    const handleGetAccept = () => {
        let accept = {};

        if (mediaConfig.type == 'Ar Video') {
            accept = {
                'image/jpeg': [],
                'image/png': [],
            };
        } else if (mediaConfig.type === 'Image') {
            accept = {
                'image/jpeg': [],
                'image/png': [],
                'image/gif': [],
                'image/svg+xml': [],
                'image/webp': [],
            };
        } else if (mediaConfig.type === 'Video') {
            accept = {
                'video/mp4': [],
                'video/webm': [],
            };
        } else if (mediaConfig.type === 'Zip') {
            accept = {
                'application/zip': [],
            };
        }

        return accept;
    };

    function convertMBToBytes(sizeInMB: number): number {
        return sizeInMB * 1000000;
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: handleGetAccept(),
    });

    const urlAssetFile = useMemo(() => {
        return fileIsLocal ? URL.createObjectURL(formatValue.file as Blob) : formatValue.file;
    }, [formatValue.file]) as string;

    const thumbSRC = useMemo(() => {
        return fileIsLocal
            ? URL.createObjectURL(formatValue.file as Blob)
            : (formatValue.file as string)?.replace(/\.[^/.]+$/, '_thumb.jpg');
    }, [formatValue.file]) as string;

    const handleDeleteFile = () => {
        setFieldValue('deleteKeys', [...deleteKeys, fileStatus?.path || formatValue.path]);
        setFieldValue(`formats.${formatType}`, { file: undefined, customFile: undefined });
    };

    const handleChangeCrop = (fileChange: File) => {
        setShowCrop(false);
        handleUploadFile({ formatUpload: formatType, file: fileChange, maxSize: mediaConfig?.sizeMB.toString() });
        setFieldValue(`formats.${formatType}.file`, fileChange);
    };

    const handleClose = () => {
        setShowCrop(false);
    };

    const handleCloseModalError = () => {
        setModalErrorOpen(false);
    };

    const handleError = () => {
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.src = `${urlAssetFile}?retry=${Date.now()}`;
            }
        }, 1000);
    };

    useEffect(() => {
        if (formatValue.file) {
            (async () => {
                const imgWidthAndHeight = await handleGetFileWidthAndHeight(formatValue.file!);
                setMediaWidth(imgWidthAndHeight.width);
                setMediaHeight(imgWidthAndHeight.height);
            })();
        }
    }, [formatValue.file]);

    useEffect(() => {
        if (notify === 'deleteAsset') {
            setFieldValue(`formats.codeZip`, { file: undefined, customFile: undefined });
            toast.display({
                message: 'Media deleted due to containing unauthorized content.',
                type: 'warning',
            });
            dispatch(userActionsCreators.change({ notify: '' }));
        }
    }, [notify]);

    return (
        <Box marginLeft={1} width={150}>
            <Box marginTop={2} height={20} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <SvgIcon style={{ width: 20 }}>
                        <circle cx="12" cy="12" r="12" fill={uploadSuccess ? '#4CAF50' : '#D3D3D3'} />
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

                    <Typography marginLeft={1} color="grey" variant="h6" fontWeight="normal">
                        {language[mediaConfig.title] as string}
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
                height={230}
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
                        {mediaConfig.type === 'Zip' ? (
                            <Typography fontSize="0.8rem">
                                ZIP 10 MB max (HTML, JS, CSS, JPG, PNG, GIF, SVG only)
                            </Typography>
                        ) : (
                            <>
                                {handleGetFileType(formatValue.file).contentType}{' '}
                                {mediaConfig.type === 'Video' ? texts.video : texts.image}
                                <Typography fontSize="0.8rem">{mediaConfig?.sizeMB} MB</Typography>
                                <Typography fontSize="0.8rem" color="GrayText">
                                    {(language['studio.consignArtwork.assetMedia.max'] as TranslateFunction)({})}
                                </Typography>
                            </>
                        )}
                    </Typography>
                </Box>
                <Box width="100%" justifyContent="center" alignItems="center" height={200}>
                    <Box padding={1} marginTop={1} height={15}>
                        {fileStatus && fileStatus.status !== 'completed' ? (
                            <UploadProgressBar fileStatus={fileStatus} />
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {formatValue.file ? (
                            <Box display="flex" justifyContent="center" alignItems="center" marginTop={1} width={120}>
                                {mediaConfig.type === 'Video' ? (
                                    <video
                                        controls
                                        src={urlAssetFile!}
                                        style={{
                                            objectFit: 'contain',
                                            maxWidth: 120,
                                            maxHeight: 100,
                                        }}
                                    />
                                ) : mediaConfig.type === 'Image' ? (
                                    <img
                                        ref={imgRef}
                                        onError={handleError}
                                        width={mediaWidth}
                                        height={mediaHeight}
                                        src={thumbSRC!}
                                        alt=""
                                        style={{
                                            objectFit: 'contain',
                                            maxWidth: 120,
                                            maxHeight: 100,
                                        }}
                                    />
                                ) : (
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                    >
                                        <InsertDriveFileIcon style={{ width: 40, height: 40 }} color="primary" />
                                        <Box>
                                            <a
                                                style={{
                                                    display: 'flex',
                                                    color: 'inherit',

                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                }}
                                                href={urlAssetFile!}
                                                download
                                            >
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {formatValue.name ||
                                                        (typeof formatValue.file && typeof formatValue.file !== 'string'
                                                            ? (formatValue.file as File)?.name
                                                            : '')}
                                                </Typography>
                                            </a>
                                        </Box>
                                    </Box>
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
                <DialogContent>
                    <Crop file={mediaCrop} mediaConfig={mediaConfig} onChange={handleChangeCrop} />
                </DialogContent>
            </Dialog>

            <ModalError format={formatType} open={modalErrorOpen} setClose={handleCloseModalError} />
        </Box>
    );
}
