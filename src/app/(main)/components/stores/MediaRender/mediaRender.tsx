import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import isVideoExtension from '@/utils/isVideo';

interface MediaRenderProps {
    path: string;
    width: number;
    height: number;
    fallback: string;
    alt: string;
}

const MediaRender = ({ path, width, height, alt, fallback }: MediaRenderProps) => {
    const [src, setSrc] = useState(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setSrc(fallback);
    }, [path, fallback]);

    useEffect(() => {
        if (!isLoading && !isError) {
            setSrc(path);
        } else if (isError) {
            setSrc(fallback);
        }
    }, [isLoading, isError, path, fallback]);

    return (
        <Box>
            {isVideoExtension(path) ? (
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        objectFit: 'contain',
                    }}
                    width={width}
                    height={height}
                    onLoadedData={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setIsError(true);
                    }}
                >
                    <source src={isError ? fallback : path} type="video/mp4" />
                </video>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    style={{
                        objectFit: 'contain',
                    }}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setIsError(true);
                    }}
                />
            )}
        </Box>
    );
};

export default MediaRender;
