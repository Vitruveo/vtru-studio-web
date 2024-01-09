import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Img from 'next/image';
import HelpIcon from '@mui/icons-material/Help';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues, FormatMedia } from './types';
import { format } from 'path';
import Crop from './crop';
import { getFileSize, handleGetFileWidthAndHeight } from './helpers';

interface MediaCardProps {
    formatType: string;
    formatValue: FormatMedia;
    errors: AssetMediaFormErros;
    formats: AssetMediaFormValues['asset']['formats'];
    urlAssetFile: string;
    definition: AssetMediaFormValues['definition'];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}

export interface MediaConfig {
    width: number;
    height: number;
    sizeMB: number;
    required: boolean;
}

export const mediaConfigs = {
    display: {
        width: 2160,
        height: 3840,
        sizeMB: 10,
        required: true,
    },
    exhibition: {
        width: 2000,
        height: 3000,
        sizeMB: 10,
        required: true,
    },
    preview: {
        width: 2000,
        height: 2000,
        sizeMB: 10,
        required: true,
    },
    print: {
        width: 8000,
        height: 12000,
        sizeMB: 500,
        required: false,
    },
};

export default function MediaCard({
    formatType,
    formatValue,
    definition,
    errors,
    formats,
    setFieldValue,
}: MediaCardProps) {
    const [mediaCrop, setMediaCrop] = useState<File | undefined>(undefined);
    const [showCrop, setShowCrop] = useState(false);
    const [mediaWidth, setMediaWidth] = useState(0);
    const [mediaHeight, setMediaHeight] = useState(0);

    const handleDeleteFile = () => {
        if (formatType === 'original') {
            setFieldValue('asset.file', undefined);
            setFieldValue('definition', '');
        } else {
            setFieldValue(`asset.formats.${formatType}`, { file: undefined, customFile: undefined });
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setMediaCrop(acceptedFiles[0]);
            setShowCrop(true);
            // setFieldValue(`asset.formats.${formatType}`, { file: acceptedFiles[0] });
        },
        [setFieldValue]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const urlAssetFile = useMemo(() => {
        return formatValue.file ? URL.createObjectURL(formatValue.file) : '';
    }, [formatValue.file]);

    const mediaConfig = mediaConfigs[formatType as keyof typeof mediaConfigs];

    useEffect(() => {
        if (formatType === 'original') {
            (async () => {
                const imgWidthAndHeight = await handleGetFileWidthAndHeight(formatValue.file!);
                setMediaWidth(imgWidthAndHeight.width);
                setMediaHeight(imgWidthAndHeight.height);
            })();
        }
    }, []);

    const handleChangeCrop = (fileChange: File) => {
        setShowCrop(false);
        setFieldValue(`asset.formats.${formatType}.file`, fileChange);
    };

    const handleClose = () => {
        setShowCrop(false);
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
                        {formatType.charAt(0).toUpperCase() + formatType.slice(1)}
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
                        JPEG image
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.width || mediaWidth} X {mediaConfig?.height || mediaHeight}
                        </Typography>
                        <Typography fontSize="0.8rem">
                            {mediaConfig?.sizeMB ? `${mediaConfig?.sizeMB} MB maximum` : getFileSize(formatValue.file!)}
                        </Typography>
                    </Typography>
                </Box>
                <Box display="flex" width="100%" justifyContent="center" alignItems="center" height={190}>
                    {formatValue.file ? (
                        <Box display="flex" justifyContent="center" alignItems="center" width={120}>
                            <Img
                                width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                                height={definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100}
                                src={urlAssetFile!}
                                alt=""
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
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
                                    Upload
                                </Button>
                            </Box>

                            <Box>
                                <Typography>This media is</Typography>
                                <Typography textAlign="center" fontWeight="bold">
                                    {mediaConfig.required ? 'Required' : 'Optional'}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <Dialog maxWidth="lg" open={showCrop} onClose={handleClose}>
                <DialogTitle color="GrayText">
                    {`Crop media for Display to ${mediaConfig?.width} x ${mediaConfig?.height} pixels. Click “Done” to save.`}
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
        </Box>
    );
}
