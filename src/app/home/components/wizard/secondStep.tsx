import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import Img from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Stack } from '@mui/system';
import { Box, MenuItem, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { IconTrash } from '@tabler/icons-react';

import { StepsFormValues, StepsProps } from './types';

import { useDispatch } from '@/store/hooks';
import { sendRequestUploadThunk } from '@/features/user/thunks';
import { Crop } from '../Crop';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

export type FormatNames = 'display' | 'exhibition' | 'preview';

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
    {
        value: 'portrait',
        label: 'Portrait',
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
                width: 1000,
                height: 1000,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 2000,
                height: 2000,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 3000,
                height: 3000,
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
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 1200,
                height: 800,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 1800,
                height: 1200,
            },
        ],
    },
    {
        name: 'portrait',
        title: 'Portrait',
        formats: [
            {
                name: 'display',
                title: 'Display',
                width: 400,
                height: 600,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 800,
                height: 1200,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 1200,
                height: 1800,
            },
        ],
    },
];

interface PreviewImageProps {
    file: File;
}

const PreviewImage = memo(function imagePreview({ file }: PreviewImageProps) {
    return <Img width={40} height={40} src={URL.createObjectURL(file)} alt="" />;
});

const SecondStep = ({ values, errors, handleChange, handleSubmit, setFieldValue }: StepsProps) => {
    const dispatch = useDispatch();

    const [tab, setTab] = useState('1');

    const onDrop = (acceptedFiles: File[]) => {
        setFieldValue('asset.file', acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        const fields: Array<keyof StepsFormValues> = ['asset'];

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
    }, [values.asset, errors]);

    const formatBytesToMB = (bytes: number) => {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const handleDeleteFile = () => {
        setFieldValue('asset.file', undefined);
        setFieldValue('definition', '');
    };

    const handleRequestUpload = ({ mimetype, originalName }: { mimetype: string; originalName: string }) => {
        dispatch(sendRequestUploadThunk({ mimetype, originalName }));
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleOnLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (values.definition) return;

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

    const urlAssetFile = useMemo(() => {
        return values.asset.file ? URL.createObjectURL(values.asset.file) : '';
    }, [values.asset.file]);

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
                    <input id="asset" {...getInputProps()} />
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
                {errors?.asset?.file}
            </Typography>

            {values.asset.file && (
                <Stack direction="row" alignItems="center" gap={10}>
                    <img src={urlAssetFile!} style={{ display: 'none' }} alt="" onLoad={handleOnLoad} />
                    <Box display="flex" flexDirection="column" gap={2}>
                        <>
                            <Box
                                key={values.asset.file.name}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconTrash color="red" onClick={handleDeleteFile} size="16" stroke={1.5} />
                                    <Img width={40} height={40} src={urlAssetFile!} alt="" />
                                    <Typography>{values.asset.file.name}</Typography>
                                </Box>
                            </Box>
                        </>
                    </Box>
                    <Box width={400}>
                        <Typography variant="subtitle1" fontWeight={600} component="label">
                            Select a definition mode
                        </Typography>
                        <CustomSelect
                            value={values.definition}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFieldValue('definition', e.target.value)
                            }
                            fullWidth
                            variant="outlined"
                            size="small"
                        >
                            {definitionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </Box>
                </Stack>
            )}

            {values.asset.file && (
                <TabContext value={tab}>
                    {mediaDefinitions
                        .filter((item) => item.name === values.definition)
                        .map((mediaDefinition) => {
                            return (
                                <Fragment key={mediaDefinition.name}>
                                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                        {mediaDefinition.formats.map((format, indexFormat) => {
                                            return (
                                                <Tab
                                                    key={indexFormat}
                                                    label={format.title}
                                                    value={(indexFormat + 1).toString()}
                                                />
                                            );
                                        })}
                                    </TabList>

                                    {mediaDefinition.formats.map((format, indexFormat) => {
                                        return (
                                            <Fragment key={format.name}>
                                                <Box display={indexFormat + 1 === Number(tab) ? 'block' : 'none'}>
                                                    <Stack direction="column" justifyContent="center" gap={2}>
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                        >
                                                            <Box display="flex" flexDirection="row">
                                                                <Typography>scale</Typography>
                                                                <input
                                                                    id="scale-input"
                                                                    type="range"
                                                                    step="0.1"
                                                                    min={0.1}
                                                                    max={2}
                                                                    value={
                                                                        values.asset.formats[format.name as FormatNames]
                                                                            .scale
                                                                    }
                                                                    onChange={(e) =>
                                                                        setFieldValue(
                                                                            `asset.formats.${format.name}.scale`,
                                                                            Number(e.target.value)
                                                                        )
                                                                    }
                                                                />
                                                            </Box>
                                                            {values.asset.formats[format.name as FormatNames].file && (
                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                    <IconTrash
                                                                        color="red"
                                                                        onClick={() =>
                                                                            setFieldValue(
                                                                                `asset.formats.${format.name}.file`,
                                                                                undefined
                                                                            )
                                                                        }
                                                                        size="16"
                                                                        stroke={1.5}
                                                                    />
                                                                    <PreviewImage
                                                                        file={
                                                                            values.asset.formats[
                                                                                format.name as FormatNames
                                                                            ].file!
                                                                        }
                                                                    />
                                                                    <Typography>
                                                                        {
                                                                            values.asset.formats[
                                                                                format.name as FormatNames
                                                                            ].file!.name
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                            <Box display="flex" alignItems="center">
                                                                <CustomFormLabel
                                                                    color="primary"
                                                                    htmlFor={`file.${format.name}`}
                                                                    style={{ marginBottom: 0, marginTop: 0 }}
                                                                >
                                                                    Upload here
                                                                </CustomFormLabel>
                                                            </Box>
                                                            <input
                                                                id={`file.${format.name}`}
                                                                type="file"
                                                                onChange={(e) =>
                                                                    e.target.files &&
                                                                    setFieldValue(
                                                                        `asset.formats.${format.name}.file`,
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                                style={{ display: 'none' }}
                                                            />
                                                        </Box>

                                                        <Crop
                                                            image={URL.createObjectURL(
                                                                values.asset.formats[format.name as FormatNames].file ||
                                                                    values.asset.file!
                                                            )}
                                                            width={format.width}
                                                            height={format.height}
                                                            zoom={
                                                                values.asset.formats[format.name as FormatNames].scale
                                                            }
                                                            onChange={(pixelCrop) =>
                                                                setFieldValue(`asset.formats.${format.name}`, {
                                                                    ...values.asset.formats[format.name as FormatNames],
                                                                    ...pixelCrop,
                                                                })
                                                            }
                                                        />
                                                    </Stack>
                                                </Box>
                                            </Fragment>
                                        );
                                    })}
                                </Fragment>
                            );
                        })}
                </TabContext>
            )}
        </Stack>
    );
};

export default SecondStep;
