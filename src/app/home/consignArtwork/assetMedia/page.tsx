'use client';

import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import Img from 'next/image';
import { FormikErrors, useFormik } from 'formik';
import { useSelector } from '@/store/hooks';

import { useDropzone } from 'react-dropzone';
import { Stack } from '@mui/system';
import { Box, Button, IconButton, MenuItem, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { IconTrash } from '@tabler/icons-react';

import type { StepsFormValues, StepsProps, FormatNames } from '../types';

import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import { Pintura } from '@/app/home/components/Pintura';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { useRouter, useSearchParams } from 'next/navigation';
import { AssetMediaFormErros, AssetMediaFormValues } from './types';
import { AssetMediaSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

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
                width: 3840,
                height: 3840,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 3000,
                height: 3000,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 2000,
                height: 2000,
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
                width: 3840,
                height: 2160,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 3000,
                height: 2000,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 2000,
                height: 2000,
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
                width: 2160,
                height: 3840,
            },
            {
                name: 'exhibition',
                title: 'Exhibition',
                width: 2000,
                height: 3000,
            },
            {
                name: 'preview',
                title: 'Preview',
                width: 2000,
                height: 2000,
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

function validateErrorsAssetUpload({
    errors,
    values,
    setFieldValue,
}: {
    values: AssetMediaFormValues;
    errors: AssetMediaFormErros;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}) {
    const fields: Array<keyof StepsFormValues> = ['asset'];

    // if (!fields.some((field) => errors[field])) {
    //     values.completedSteps[currentStep] = {
    //         ...values.completedSteps[currentStep],
    //         status: 'completed',
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // } else {
    //     values.completedSteps[currentStep] = {
    //         ...values.completedSteps[currentStep],
    //         status: 'inProgress',
    //     };
    //     setFieldValue('completedSteps', { ...values.completedSteps });
    // }
}

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        to: '/home/consignArtwork',
        title: 'Consign Artwork',
    },
    {
        title: 'Asset Media',
    },
];

export default function AssetMedia() {
    const params = useSearchParams();
    params.values();

    const asset = useSelector((state) => state.asset);

    const { values, errors, setFieldValue } = useFormik<AssetMediaFormValues>({
        initialValues: {
            definition: '',
            asset: {
                file: undefined,
                formats: {
                    display: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                    exhibition: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                    preview: {
                        file: undefined,
                        customFile: undefined,
                        transactionId: undefined,
                    },
                },
            },
        },
        validationSchema: AssetMediaSchemaValidation,
        onSubmit: async (formValues) => {},
    });

    const [tab, setTab] = useState('1');

    const onDrop = (acceptedFiles: File[]) => {
        if (values.asset.file) {
            setFieldValue('asset.file', undefined);
            setFieldValue('asset.formats.display', { file: undefined, customFile: undefined });
            setFieldValue('asset.formats.exhibition', { file: undefined, customFile: undefined });
            setFieldValue('asset.formats.preview', { file: undefined, customFile: undefined });
            setFieldValue('definition', '');
        }

        setFieldValue('asset.file', acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        validateErrorsAssetUpload({ values, errors, setFieldValue });
    }, [values.asset, errors]);

    const handleDeleteFile = () => {
        setFieldValue('asset.file', undefined);
        setFieldValue('asset.formats.display', { file: undefined, customFile: undefined });
        setFieldValue('asset.formats.exhibition', { file: undefined, customFile: undefined });
        setFieldValue('asset.formats.preview', { file: undefined, customFile: undefined });
        setFieldValue('definition', '');
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
        <PageContainerFooter
            stepStatus="inProgress"
            stepNumber={1}
            title="Consign Artwork"
            backPathRouter="/home/consignArtwork"
        >
            <Breadcrumb title="Consign Artwork" items={BCrumb} />
            <Stack my={3} direction="column" alignItems="center" justifyContent="center" gap={2}>
                <Box width={600}>
                    <Typography variant="subtitle1" fontWeight={600} component="label">
                        Asset
                    </Typography>

                    <Box
                        border="1px dashed"
                        padding={values.definition ? 1 : 10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        {...getRootProps()}
                    >
                        <input id="asset" {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here...</p>
                        ) : values.asset.file ? (
                            <Stack direction="row" alignItems="center" gap={10}>
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
                                                width={
                                                    values.definition === 'landscape'
                                                        ? 200
                                                        : values.definition === 'portrait'
                                                          ? 150
                                                          : 100
                                                }
                                                height={
                                                    values.definition === 'landscape'
                                                        ? 100
                                                        : values.definition === 'portrait'
                                                          ? 200
                                                          : 100
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
                                                <Typography>{values.asset.file.name}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                </Box>
                            </Stack>
                        ) : (
                            <Typography align="center">
                                Drag and drop files here or click to select files. Please note that only JPG, GIF, PNG,
                                or MP4 file types are accepted.
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Typography my={1} color="error">
                    {errors?.asset?.file}
                </Typography>

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
                                                        label={`${format.title} (${format.width}x${format.height})`}
                                                        value={(indexFormat + 1).toString()}
                                                    />
                                                );
                                            })}
                                        </TabList>

                                        {mediaDefinition.formats.map((format, indexFormat) => {
                                            return (
                                                <Box
                                                    key={format.name}
                                                    display={indexFormat + 1 === Number(tab) ? 'block' : 'none'}
                                                >
                                                    {!values.asset.formats[format.name as FormatNames].file ? (
                                                        <Stack
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            gap={2}
                                                        >
                                                            {values.asset.formats[format.name as FormatNames]
                                                                .customFile ? (
                                                                <Typography color="success.main">File saved</Typography>
                                                            ) : (
                                                                <>
                                                                    <Pintura
                                                                        file={values.asset.file!}
                                                                        initial={{
                                                                            width: 1,
                                                                            height: format.height / format.width,
                                                                        }}
                                                                        px={{
                                                                            width: format.width,
                                                                            height: format.height,
                                                                        }}
                                                                        onChange={(file) =>
                                                                            setFieldValue(
                                                                                `asset.formats.${format.name}.file`,
                                                                                file
                                                                            )
                                                                        }
                                                                    />
                                                                    {!values.asset.formats[format.name as FormatNames]
                                                                        .file && (
                                                                        <Typography color="error">
                                                                            Press done to save
                                                                        </Typography>
                                                                    )}
                                                                    {values.asset.formats[format.name as FormatNames]
                                                                        .file && (
                                                                        <Typography color="success.main">
                                                                            File saved
                                                                        </Typography>
                                                                    )}
                                                                </>
                                                            )}

                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                            >
                                                                {values.asset.formats[format.name as FormatNames]
                                                                    .customFile && (
                                                                    <Box display="flex" alignItems="center" gap={1}>
                                                                        <IconTrash
                                                                            color="red"
                                                                            onClick={() =>
                                                                                setFieldValue(
                                                                                    `asset.formats.${format.name}.customFile`,
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
                                                                                ].customFile!
                                                                            }
                                                                        />
                                                                        <Typography>
                                                                            {
                                                                                values.asset.formats[
                                                                                    format.name as FormatNames
                                                                                ].customFile!.name
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                                {!values.asset.formats[format.name as FormatNames]
                                                                    .customFile && (
                                                                    <>
                                                                        <Box display="flex" alignItems="center">
                                                                            <CustomFormLabel
                                                                                color="primary"
                                                                                htmlFor={`file.${format.name}`}
                                                                                style={{
                                                                                    marginBottom: 0,
                                                                                    marginTop: 0,
                                                                                }}
                                                                            >
                                                                                Upload custom media here (
                                                                                {`${format.width}x${format.height}`})
                                                                            </CustomFormLabel>
                                                                        </Box>
                                                                        <input
                                                                            id={`file.${format.name}`}
                                                                            type="file"
                                                                            onChange={(e) =>
                                                                                e.target.files &&
                                                                                setFieldValue(
                                                                                    `asset.formats.${format.name}.customFile`,
                                                                                    e.target.files[0]
                                                                                )
                                                                            }
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Box>
                                                        </Stack>
                                                    ) : (
                                                        <Stack
                                                            direction="row"
                                                            boxShadow={`0 0 10px #763EBD`}
                                                            height={500}
                                                            width={800}
                                                        >
                                                            <Box
                                                                width="70%"
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                p={2}
                                                            >
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        values.asset.formats[format.name as FormatNames]
                                                                            .file!
                                                                    )}
                                                                    alt=""
                                                                    width="100%"
                                                                    height="100%"
                                                                    style={{
                                                                        objectFit: 'contain',
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Stack
                                                                width="30%"
                                                                direction="column"
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                                borderLeft="1px dashed #763EBD"
                                                                paddingY={5}
                                                            >
                                                                <Box
                                                                    display="flex"
                                                                    flexDirection="column"
                                                                    alignItems="center"
                                                                >
                                                                    <Typography variant="h4">{format.title}</Typography>
                                                                    <Typography>
                                                                        {format.width}x{format.height}
                                                                    </Typography>
                                                                    <Typography color="success.main">
                                                                        File Saved
                                                                    </Typography>
                                                                </Box>

                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setFieldValue(
                                                                            `asset.formats.${format.name}.file`,
                                                                            undefined
                                                                        );
                                                                        setFieldValue(
                                                                            `asset.formats.${format.name}.customFile`,
                                                                            undefined
                                                                        );
                                                                    }}
                                                                >
                                                                    edit now
                                                                </Button>
                                                            </Stack>
                                                        </Stack>
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Fragment>
                                );
                            })}
                    </TabContext>
                )}
            </Stack>
        </PageContainerFooter>
    );
}
