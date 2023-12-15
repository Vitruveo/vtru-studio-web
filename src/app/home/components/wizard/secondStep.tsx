import { useEffect, useRef, useState } from 'react';
import Img from 'next/image';
import { useDropzone } from 'react-dropzone';
import { IconTrash } from '@tabler/icons-react';

import { Box, MenuItem, Typography } from '@mui/material';
import { StepsFormValues, StepsProps } from './types';

import { sendRequestUploadThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';
import { Crop } from '../Crop';
import { Stack } from '@mui/system';
import CustomSelect from '../forms/theme-elements/CustomSelect';

const currentStep = 2;

const definitionOptions = [
    {
        value: 'square',
        label: 'Square',
    },
    {
        value: 'landscape',
        label: 'Landscape',
    },
];

const mediaDefinitions = [
    {
        name: 'square',
        title: 'Square',
        formats: [
            {
                name: 'display',
                title: 'Display',
                width: 200,
                height: 200,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 400,
                height: 400,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 600,
                height: 600,
            },
        ],
    },
    {
        name: 'landscape',
        title: 'Landscape',
        formats: [
            {
                name: 'display',
                title: 'Display',
                width: 600,
                height: 400,
            },
        ],
    },
];

const SecondStep = ({ values, errors, handleChange, handleSubmit, setFieldValue }: StepsProps) => {
    const dispatch = useDispatch();

    const imgRef = useRef<HTMLImageElement>(null);

    const [isUpload, setIsUpload] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrop = (acceptedFiles: File[]) => {
        setFieldValue('file', acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (isUpload && progress < 100) {
            setTimeout(() => {
                setProgress((prevState) => prevState + 10);
            }, 1_000);
        }
    }, [isUpload, progress]);

    useEffect(() => {
        const fields: Array<keyof StepsFormValues> = ['file'];

        if (!fields.some((field) => errors[field])) {
            values.completedSteps[currentStep] = {
                step: currentStep,
                errors: false,
            };
            setFieldValue('completedSteps', { ...values.completedSteps });
        } else {
            values.completedSteps[currentStep] = {
                step: currentStep,
                errors: true,
            };
            setFieldValue('completedSteps', { ...values.completedSteps });
        }
    }, [values.wallets, errors]);

    useEffect(() => {
        if (imgRef.current) {
            // Acesse a altura original da imagem
            const height = imgRef.current.naturalHeight;
            console.log(height);
        }
    }, [imgRef]);

    const formatBytesToMB = (bytes: number) => {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const handleDeleteFile = () => {
        setFieldValue('file', null);
    };

    const handleRequestUpload = ({ mimetype, originalName }: { mimetype: string; originalName: string }) => {
        dispatch(sendRequestUploadThunk({ mimetype, originalName }));
    };

    return (
        <Stack my={3} direction="column" alignItems="center" justifyContent="center" gap={2}>
            <Box width={600}>
                <Typography variant="subtitle1" fontWeight={600} component="label">
                    Asset
                </Typography>

                <Box
                    border="1px dashed"
                    padding={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    {...getRootProps()}
                >
                    <input id="file" {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                    ) : (
                        <Typography align="center">
                            Drag and drop files here or click to select files. Please note that only JPG, GIF, PNG, or
                            MP4 file types are accepted.
                        </Typography>
                    )}
                </Box>
            </Box>
            <Typography my={1} color="error">
                {errors.file}
            </Typography>

            {values.file && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <>
                        <Box key={values.file?.name} display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconTrash color="red" onClick={handleDeleteFile} size="16" stroke={1.5} />
                                <Img
                                    ref={imgRef}
                                    width={40}
                                    height={40}
                                    src={values.file ? URL.createObjectURL(values.file) : ''}
                                    alt=""
                                />
                                <Typography>{values.file?.name}</Typography>
                            </Box>
                        </Box>
                    </>
                </Box>
            )}

            {values.file && (
                <Box width={400}>
                    <Typography variant="subtitle1" fontWeight={600} component="label">
                        Select a definition mode{' '}
                    </Typography>
                    <CustomSelect
                        value={values.definition}
                        onChange={(e) => setFieldValue('definition', e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        {definitionOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Box>
            )}

            <Box>
                {values.file &&
                    values.definition &&
                    mediaDefinitions
                        .filter((item) => item.name === values.definition)
                        .map((mediaDefinition) => {
                            return (
                                <Box key={mediaDefinition.name}>
                                    <Box display="flex" flexDirection="column" gap={10}>
                                        {mediaDefinition.formats.map((format) => {
                                            return (
                                                <Stack direction="column" alignItems="center" key={format.name}>
                                                    <Typography variant="h5">
                                                        {mediaDefinition.title} - {format.title} ({format.width}x
                                                        {format.height})
                                                    </Typography>
                                                    <Crop
                                                        key={format.name}
                                                        image={URL.createObjectURL(values.file!)}
                                                        width={format.width}
                                                        height={format.height}
                                                    />
                                                </Stack>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            );
                        })}
            </Box>
        </Stack>
    );
};

export default SecondStep;
