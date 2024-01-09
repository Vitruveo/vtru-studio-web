import React, { Fragment, memo, useState } from 'react';
import Img from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { Box, Typography, Tab, Stack, Button } from '@mui/material';

import { AssetMediaFormErros, AssetMediaFormValues, FormatMedia } from './types';
import { TabContext, TabList } from '@mui/lab';
import { mediaDefinitions } from './mediaDefinitions';
import { FormatNames } from '../types';
import { Pintura } from '@/app/home/components/Pintura';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import { MediaConfig } from './mediaCard';

interface CropProps {
    mediaConfig: MediaConfig;
    onChange: (file: File) => void;
    file?: File;
    definition: AssetMediaFormValues['definition'];
}

interface PreviewImageProps {
    file: File;
}

const PreviewImage = memo(function imagePreview({ file }: PreviewImageProps) {
    return <Img width={40} height={40} src={URL.createObjectURL(file)} alt="" />;
});

export default function Crop({ mediaConfig, file, onChange }: CropProps) {
    console.log({ mediaConfig });
    return (
        <>
            <Box>
                <Stack direction="column" justifyContent="center" alignItems="center" gap={2}>
                    <>
                        <Pintura
                            file={file!}
                            initial={{
                                width: 1,
                                height: mediaConfig.height / mediaConfig.width,
                            }}
                            px={{
                                width: mediaConfig.width,
                                height: mediaConfig.height,
                            }}
                            onChange={onChange}
                        />
                    </>
                </Stack>
            </Box>
        </>
    );
}
