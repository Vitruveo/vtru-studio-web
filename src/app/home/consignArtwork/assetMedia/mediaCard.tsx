import React, { useEffect, useMemo, useState } from 'react';
import Img from 'next/image';
import HelpIcon from '@mui/icons-material/Help';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues, FormatMedia } from './types';
import { format } from 'path';

interface MediaCardProps {
    formatType: string;
    formatValue: FormatMedia;
    urlAssetFile: string;
    definition: AssetMediaFormValues['definition'];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}

const mediaConfigs = {
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

export default function MediaCard({ formatType, formatValue, definition, setFieldValue }: MediaCardProps) {
    const [mediaWidth, setMediaWidth] = useState(0);
    const [mediaHeight, setMediaHeight] = useState(0);

    const handleDeleteFile = () => {
        setFieldValue('asset.file', undefined);
        setFieldValue('asset.formats.display', { file: undefined, customFile: undefined });
        setFieldValue('asset.formats.exhibition', { file: undefined, customFile: undefined });
        setFieldValue('asset.formats.preview', { file: undefined, customFile: undefined });
        setFieldValue('definition', '');
    };

    const urlAssetFile = useMemo(() => {
        return formatValue.file ? URL.createObjectURL(formatValue.file) : '';
    }, [formatValue.file]);

    const mediaConfig = mediaConfigs[formatType as keyof typeof mediaConfigs];

    function handleGetFileWidthAndHeight(): Promise<{ width: number; height: number }> {
        return new Promise((resolve, reject) => {
            const file = formatValue.file;

            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                if (!e.target) {
                    return;
                }

                const img = new Image();
                img.src = e.target.result as string;

                img.onload = function () {
                    const width = img.width;
                    const height = img.height;

                    resolve({ width, height });
                };
            };

            reader.readAsDataURL(file);
        });
    }

    function getFileSize() {
        const bytes = formatValue.file?.size || 0;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return '0 Byte';

        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));

        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }

    useEffect(() => {
        if (formatType === 'original') {
            (async () => {
                const imgWidthAndHeight = await handleGetFileWidthAndHeight();
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
                            {mediaConfig?.sizeMB ? `${mediaConfig?.sizeMB} MB maximum` : getFileSize()}
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
                            <Box height={80} width="100%" display="flex" justifyContent="center" alignItems="center">
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
        </Box>
    );
}
