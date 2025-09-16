import { useEffect, useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import isVideoExtension from '@/utils/isVideo';

interface MediaRenderProps {
    path: string;
    width: number;
    height: number;
    fallback: string;
    alt: string;
    forceLoad?: boolean;
    isLoading?: boolean;
}

const MediaRender = ({
    path,
    width,
    height,
    alt,
    fallback,
    forceLoad = false,
    isLoading = false,
}: MediaRenderProps) => {
    const [src, setSrc] = useState(isLoading ? fallback : path);
    const [isError, setIsError] = useState(false);

    // Memoizar a verificação de vídeo para evitar recalcular
    const isVideo = useMemo(() => isVideoExtension(path), [path]);

    useEffect(() => {
        // Se não está carregando, usar o path; senão usar fallback
        if (!isLoading) {
            setIsError(false);
            setSrc(path);

            // Preload da imagem para forçar carregamento imediato
            if (forceLoad && !isVideo) {
                const img = document.createElement('img');
                img.onload = () => {
                    setSrc(path);
                };
                img.onerror = () => {
                    setIsError(true);
                    setSrc(fallback);
                };
                img.src = path;
            }
        } else {
            setSrc(fallback);
        }
    }, [path, fallback, forceLoad, isLoading, isVideo]);

    const handleError = () => {
        if (!isError && src !== fallback) {
            setIsError(true);
            setSrc(fallback);
        }
    };

    const handleLoad = () => {
        if (isError && src === path) {
            setIsError(false);
        }
    };

    return (
        <Box>
            {isVideo ? (
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        objectFit: 'contain',
                    }}
                    width={width}
                    height={height}
                    onLoadedData={handleLoad}
                    onError={handleError}
                >
                    <source src={src} type="video/mp4" />
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
                    onLoad={handleLoad}
                    onError={handleError}
                    priority={forceLoad}
                    loading={forceLoad ? 'eager' : 'lazy'}
                    unoptimized={forceLoad}
                />
            )}
        </Box>
    );
};

export default memo(MediaRender);
