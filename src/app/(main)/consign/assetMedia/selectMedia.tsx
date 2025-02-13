import React, { useState } from 'react';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, Typography, IconButton, Stack } from '@mui/material';

import { AssetMediaFormErros, Definition } from './types';
import { useDropzone } from 'react-dropzone';
import { getMediaDefinition } from './helpers';
import { useI18n } from '@/app/hooks/useI18n';

interface SelectMediaProps {
    urlAssetFile?: string;
    errors: AssetMediaFormErros;
    file?: File | string;
    definition?: Definition;
    handleUploadFile: ({
        formatUpload,
        file,
    }: {
        width?: number;
        height?: number;
        formatUpload: string;
        file: File;
        maxSize: string;
    }) => Promise<void>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}

export default function SelectMedia({
    definition,
    file,
    urlAssetFile,
    errors,
    setFieldValue,
    handleUploadFile,
}: SelectMediaProps) {
    const [modalErrorOpen, setModalErrorOpen] = useState(false);

    const { language } = useI18n();

    const texts = {
        dragAndDrop: language['studio.consignArtwork.assetMedia.dragAndDrop'],
        dragAndDropDescription: language['studio.consignArtwork.assetMedia.dragAndDrop.description'],
        imageTypes: language['studio.consignArtwork.assetMedia.imageTypes'],
        videoTypes: language['studio.consignArtwork.assetMedia.videoTypes'],
    } as { [key: string]: string };

    const handleDeleteFile = () => {
        setFieldValue('formats.original', { file: undefined, customFile: undefined });
        setFieldValue('formats.display', { file: undefined, customFile: undefined });
        setFieldValue('formats.exhibition', { file: undefined, customFile: undefined });
        setFieldValue('formats.preview', { file: undefined, customFile: undefined });
        setFieldValue('definition', '');
    };

    const onDrop = async (acceptedFiles: File[]) => {
        if (file) {
            setFieldValue('formats.original', { file: undefined, customFile: undefined });
            setFieldValue('formats.display', { file: undefined, customFile: undefined });
            setFieldValue('formats.exhibition', { file: undefined, customFile: undefined });
            setFieldValue('formats.preview', { file: undefined, customFile: undefined });
            setFieldValue('definition', '');
        }

        const { width, height, definition: newDefinition } = await getMediaDefinition({ fileOrUrl: acceptedFiles[0] });

        setFieldValue('formats.original.size', acceptedFiles[0].size);
        setFieldValue('formats.original.width', width);
        setFieldValue('formats.original.height', height);
        setFieldValue('formats.original.definition', newDefinition);

        handleUploadFile({ formatUpload: 'original', file: acceptedFiles[0], maxSize: '500' });
        setFieldValue('formats.original.file', acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/mp4': [],
            'video/webm': [],
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/svg+xml': [],
            'image/webp': [],
        },
    });

    const handleOnLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (definition) return;

        const width = e.currentTarget.width;
        const height = e.currentTarget.height;

        if (width > height) {
            setFieldValue('definition', 'landscape');
        } else if (height > width) {
            setFieldValue('definition', 'portrait');
        } else {
            setFieldValue('definition', 'square');
        }
    };

    const handleCloseModalError = () => {
        setModalErrorOpen(false);
    };

    return (
        <Box marginTop={2} display="flex" alignItems="center" justifyContent="center" width="100%">
            <Box
                width="100%"
                height="40vh"
                border="1px dashed"
                padding={definition ? 1 : 2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...getRootProps()}
            >
                <input id="asset" {...getInputProps()} />
                {file ? (
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Img
                                        width={definition === 'landscape' ? 200 : definition === 'portrait' ? 150 : 100}
                                        height={
                                            definition === 'landscape' ? 100 : definition === 'portrait' ? 200 : 100
                                        }
                                        src={urlAssetFile!}
                                        alt=""
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                    />
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteFile();
                                            }}
                                        >
                                            <IconTrash color="red" size="16" stroke={1.5} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </>
                        </Box>
                    </Stack>
                ) : (
                    <Box
                        padding={1}
                        maxWidth="450px"
                        display="flex"
                        flexDirection={'column'}
                        alignItems="flex-start"
                        width="100%"
                    >
                        <Typography sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1rem' } }} variant="h6">
                            {texts.dragAndDrop}
                        </Typography>

                        <Typography
                            marginTop={2}
                            sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1rem' } }}
                            variant="h6"
                        >
                            {texts.dragAndDropDescription}
                        </Typography>
                        <Typography
                            sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1rem' } }}
                            marginTop={2}
                            variant="h6"
                        >
                            {texts.imageTypes}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1rem' } }} variant="h6">
                            {texts.videoTypes}
                        </Typography>
                    </Box>
                )}
            </Box>
            {/* <ModalError
                format="original"
                open={modalErrorOpen}
                definition={definition}
                setClose={handleCloseModalError}
            /> */}
        </Box>
    );
}
