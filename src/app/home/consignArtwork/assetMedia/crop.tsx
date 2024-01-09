import React, { Fragment, memo, useState } from 'react';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, Typography, Tab, Stack, Button } from '@mui/material';

import { AssetMediaFormErros, AssetMediaFormValues } from './types';
import { TabContext, TabList } from '@mui/lab';
import { mediaDefinitions } from './mediaDefinitions';
import { FormatNames } from '../types';
import { Pintura } from '@/app/home/components/Pintura';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';

interface CropProps {
    formats: AssetMediaFormValues['asset']['formats'];
    errors: AssetMediaFormErros;
    file: AssetMediaFormValues['asset']['file'];
    definition: AssetMediaFormValues['definition'];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<AssetMediaFormErros>;
}

interface PreviewImageProps {
    file: File;
}

const PreviewImage = memo(function imagePreview({ file }: PreviewImageProps) {
    return <Img width={40} height={40} src={URL.createObjectURL(file)} alt="" />;
});

export default function Crop({ definition, file, formats, setFieldValue }: CropProps) {
    const [tab, setTab] = useState('1');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <>
            {file && (
                <TabContext value={tab}>
                    {mediaDefinitions
                        .filter((item) => item.name === definition)
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
                                                {!formats[format.name as FormatNames].file ? (
                                                    <Stack
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        gap={2}
                                                    >
                                                        {formats[format.name as FormatNames].customFile ? (
                                                            <Typography color="success.main">File saved</Typography>
                                                        ) : (
                                                            <>
                                                                <Pintura
                                                                    file={file!}
                                                                    initial={{
                                                                        width: 1,
                                                                        height: format.height / format.width,
                                                                    }}
                                                                    px={{
                                                                        width: format.width,
                                                                        height: format.height,
                                                                    }}
                                                                    onChange={(fileChange) =>
                                                                        setFieldValue(
                                                                            `asset.formats.${format.name}.file`,
                                                                            fileChange
                                                                        )
                                                                    }
                                                                />
                                                                {!formats[format.name as FormatNames].file && (
                                                                    <Typography color="error">
                                                                        Press done to save
                                                                    </Typography>
                                                                )}
                                                                {formats[format.name as FormatNames].file && (
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
                                                            {formats[format.name as FormatNames].customFile && (
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
                                                                            formats[format.name as FormatNames]
                                                                                .customFile!
                                                                        }
                                                                    />
                                                                    <Typography>
                                                                        {
                                                                            formats[format.name as FormatNames]
                                                                                .customFile!.name
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                            {!formats[format.name as FormatNames].customFile && (
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
                                                                    formats[format.name as FormatNames].file!
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
                                                                <Typography color="success.main">File Saved</Typography>
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
        </>
    );
}
