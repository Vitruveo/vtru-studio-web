import React, { useState } from 'react';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, SvgIcon, Typography, IconButton, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AssetMediaFormErros, AssetMediaFormValues } from './types';
import { useDropzone } from 'react-dropzone';
import { handleGetFileWidthAndHeight, mediaConfigs } from './helpers';
import ModalError from './modalError';

interface SelectMediaProps {
    urlAssetFile?: string;
    errors: AssetMediaFormErros;
    file?: File | string;
    definition: AssetMediaFormValues['definition'];
    handleUploadFile: ({ formatUpload, file }: { formatUpload: string; file: File }) => Promise<void>;
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

        const imgWidthAndHeight = await handleGetFileWidthAndHeight(acceptedFiles[0]);

        if (imgWidthAndHeight.width > imgWidthAndHeight.height) {
            setFieldValue('definition', 'landscape');
        } else if (imgWidthAndHeight.height > imgWidthAndHeight.width) {
            setFieldValue('definition', 'portrait');
        } else {
            setFieldValue('definition', 'square');
        }

        handleUploadFile({ formatUpload: 'original', file: acceptedFiles[0] });
        setFieldValue('formats.original.file', acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
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
                width="80vw"
                height="40vh"
                border="1px dashed"
                padding={definition ? 1 : 2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...getRootProps()}
            >
                <input id="asset" {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here...</p>
                ) : file ? (
                    <Stack direction="row" alignItems="center" gap={2}>
                        <img src={urlAssetFile!} style={{ display: 'none' }} alt="" onLoad={handleOnLoad} />
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
                        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }} variant="h6">
                            Drag and drop a single media asset file or click to upload.
                        </Typography>
                        <Typography
                            sx={{ fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                            marginTop={2}
                            variant="h6"
                        >
                            Image: JPEG, PNG, GIF, SVG, WEBP
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }} variant="h6">
                            Video: MP4, WEBM
                        </Typography>
                    </Box>
                )}
            </Box>
            {/* <Typography my={1} color="error">
                {errors?.asset?.file}
            </Typography> */}
            <ModalError
                format="original"
                open={modalErrorOpen}
                definition={definition}
                setClose={handleCloseModalError}
            />
        </Box>
    );
}
