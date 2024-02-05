import { useCallback, useEffect, useRef, useState } from 'react';
import smartcrop from 'smartcrop';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { pintura } from '@pqina/pintura/pintura.module.css';
import { PinturaEditor } from '@pqina/react-pintura';

import {
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    markup_editor_defaults,
    markup_editor_locale_en_gb,
    plugin_resize_locale_en_gb,
    PinturaDefaultImageReaderResult,
} from '@pqina/pintura';
import { Box, Theme, useMediaQuery } from '@mui/material';

setPlugins(plugin_crop);

const editorDefaults = {
    imageReader: createDefaultImageReader(),
    ...markup_editor_defaults,
    locale: {
        ...locale_en_gb,
        ...plugin_crop_locale_en_gb,
        ...markup_editor_locale_en_gb,
        ...plugin_resize_locale_en_gb,
    },
};

interface PinturaProps {
    file: File;
    initial: {
        width: number;
        height: number;
    };
    px: {
        width: number;
        height: number;
    };
    onChange: (file: File) => void;
}

export function Pintura({ file, initial, px, onChange }: PinturaProps) {
    const editorRef = useRef<PinturaEditor>(null);

    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    const handleEditorLoad = useCallback((imageState: PinturaDefaultImageReaderResult) => {
        if (!editorRef.current) {
            console.error('Editor not loaded');
            return;
        }

        const image = new Image();
        image.src = URL.createObjectURL(imageState.dest);
        image.onload = async () => {
            const { topCrop } = await smartcrop.crop(image, {
                width: initial.width,
                height: initial.height,
            });

            editorRef.current!.editor.imageCrop = topCrop;
        };
    }, []);

    return (
        <Box height={lgUp ? 500 : 300} width={lgUp ? 800 : '80vw'} boxShadow={`0 0 10px #763EBD`}>
            <PinturaEditor
                ref={editorRef}
                {...editorDefaults}
                imageWriter={createDefaultImageWriter({
                    targetSize: {
                        width: px.width,
                        height: px.height,
                        fit: 'force',
                    },
                })}
                imageCropAspectRatio={initial.width / initial.height}
                className={pintura}
                src={file}
                onLoad={handleEditorLoad}
                onProcess={({ dest }) => {
                    onChange(dest);
                }}
                cropEnableZoomInput={true}
                cropEnableZoomAutoHide={false}
                cropEnableRotationInput={false}
                cropEnableImageSelection={false}
                enableDropImage
                enablePasteImage
            />
        </Box>
    );
}
