import React from 'react';
import { Box, Stack } from '@mui/material';
import { Pintura } from '@/app/home/components/Pintura';

interface CropProps {
    mediaConfig: {
        width: number;
        height: number;
    };
    onChange: (file: File) => void;
    file?: File;
}

export default function Crop({ mediaConfig, file, onChange }: CropProps) {
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
