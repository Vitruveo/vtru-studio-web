import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
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
import { useSelector } from '@/store/hooks';

interface MediaCardProps {
    formatType: string;
    formatValue: FormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['formats'];
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
    setFieldValue,
    handleUploadFile,
}: MediaCardProps) {
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);
    const [mediaWidth, setMediaWidth] = useState(0);
    const [mediaHeight, setMediaHeight] = useState(0);

    const { language } = useI18n();

    const upload = useSelector((state) => state.asset.requestAssetUpload);
    const fileStatus = formatValue.transactionId ? upload[formatValue.transactionId] : undefined;

    const mediaConfig = mediaConfigs[formatType as keyof typeof mediaConfigs] || {};

    const texts = {
        video: language['studio.consignArtwork.assetMedia.video'],
        image: language['studio.consignArtwork.assetMedia.image'],
        max: language['studio.consignArtwork.assetMedia.max'],
        mediaIs: language['studio.consignArtwork.assetMedia.mediaIs'],
        uploadButton: language['studio.consignArtwork.assetMedia.upload.button'],
    } as { [key: string]: string };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (mediaConfig.type === 'Image') {
                setMediaCrop(acceptedFiles[0]);
                setShowCrop(true);
            } else {
                handleUploadFile({ formatUpload: formatType, file });
                setFieldValue(`formats.${formatType}.file`, file);
            }
        },
        [setFieldValue]
    );

    const handleGetAccept = () => {
        let accept = {};
        if (mediaConfig.type === 'Image') {
            accept = {
                'image/jpeg': [],
                'image/png': [],
                'image/gif': [],
            };
        } else if (mediaConfig.type === 'Video') {
            accept = {
                'video/mp4': [],
                'video/webm': [],
            };
        }
        return accept;
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: handleGetAccept(),
    });

    const urlAssetFile = useMemo(() => {
        return formatValue.file && typeof formatValue.file !== 'string'
            ? URL.createObjectURL(formatValue.file)
            : formatValue.file;
    }, [formatValue.file]);

    const handleDeleteFile = () => {
        setFieldValue(`formats.${formatType}`, { file: undefined, customFile: undefined });
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
        if (formatValue.file) {
            (async () => {
                const imgWidthAndHeight = await handleGetFileWidthAndHeight(formatValue.file!);
                setMediaWidth(imgWidthAndHeight.width);
                setMediaHeight(imgWidthAndHeight.height);
            })();
        }
    }, [formatValue.file]);

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
                                    {texts.max}
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
                                    <Img
                                        width={mediaWidth}
                                        height={mediaHeight}
                                        src={urlAssetFile!}
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
