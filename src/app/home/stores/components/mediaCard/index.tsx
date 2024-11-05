import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import Image from 'next/image';

import { Pintura } from '@/app/home/components/Pintura';

interface Props {
    file: File | null;
    mediaConfig: {
        width: number;
        height: number;
        definition: string;
    };

    handleChangeFile: (file: File) => void;
}

export const MediaCard = ({ ...rest }: Props) => {
    const [showCrop, setShowCrop] = useState(false);
    const [mediaCrop, setMediaCrop] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setMediaCrop(acceptedFiles[0]);
        setShowCrop(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/svg+xml': [],
            'image/webp': [],
        },
        maxFiles: 1,
    });

    const definition = rest.mediaConfig.definition;

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <main
                    style={{
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        height: 200,
                    }}
                >
                    {isDragActive ? (
                        <Typography align="center">Drop the files here ...</Typography>
                    ) : rest.file ? (
                        <Image
                            src={URL.createObjectURL(rest.file)}
                            alt="media"
                            width={definition === 'landscape' ? 120 : definition === 'portrait' ? 100 : 50}
                            height={definition === 'landscape' ? 100 : definition === 'portrait' ? 120 : 100}
                            style={{
                                objectFit: 'contain',
                                width: '100%',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                padding: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 16,
                                height: 200,
                            }}
                        >
                            <Button variant="contained">Upload</Button>

                            <Typography align="center">
                                This media is <b>Required</b>
                            </Typography>
                        </div>
                    )}
                </main>
            </div>
            <Dialog maxWidth="lg" open={showCrop} onClose={() => setShowCrop(false)}>
                <DialogTitle color="GrayText">
                    <Typography variant="h6">
                        Crop Image {rest.mediaConfig.width}x{rest.mediaConfig.height}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Pintura
                        file={mediaCrop!}
                        initial={{
                            width: 1,
                            height: rest.mediaConfig.height / rest.mediaConfig.width,
                        }}
                        px={{
                            width: rest.mediaConfig.width,
                            height: rest.mediaConfig.height,
                        }}
                        onChange={(finalFile) => {
                            rest.handleChangeFile(finalFile);
                            setShowCrop(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
