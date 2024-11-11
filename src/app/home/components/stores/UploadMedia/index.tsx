import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
    file: File | string | null;
    onChange: (file: File) => void;
}

export const UploadMedia = ({ file, onChange }: Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
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
                ) : file instanceof File ? (
                    <Image
                        src={URL.createObjectURL(file)}
                        alt=""
                        style={{
                            width: '100%',
                            height: 150,
                            objectFit: 'contain',
                        }}
                    />
                ) : typeof file === 'string' ? (
                    <img src={file} alt="" />
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
    );
};
