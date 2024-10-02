import React, { useEffect, useId, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { ASSET_STORAGE_URL, GENERAL_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
import { Asset } from '@/features/asset/types';

interface CardProps {
    asset?: Asset;
    path?: string;
    size?: number;
    onUpload?: (file: File | null) => void;
}

const isVideoExtension = (file?: string): boolean => {
    const videoExtensions = ['.mp4', '.avi', '.mov'];
    return videoExtensions.some((ext) => file?.endsWith(ext));
};

const Card: React.FC<CardProps> = ({ asset, path, size, onUpload }) => {
    const formatAsset = {
        ...asset,
        title: (asset?.assetMetadata?.context?.formData as unknown as { title: string })?.title || 'Untitled',
        image:
            asset?.formats?.preview?.path || path
                ? `${path ? GENERAL_STORAGE_URL : ASSET_STORAGE_URL}/${asset?.formats.preview.path || path}`
                : undefined,
    };

    const [imageSrc, setImageSrc] = useState(formatAsset?.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const inputId = useId();

    const handleError = () => {
        setImageSrc(NO_IMAGE_ASSET);
    };

    useEffect(() => {
        if (formatAsset.image) setSelectedFile(null);
        if (formatAsset?.image !== imageSrc) setImageSrc(formatAsset?.image);
    }, [formatAsset.image]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            const fileURL = URL.createObjectURL(event.target.files[0]);
            if (onUpload) onUpload(event.target.files[0]);
            setImageSrc(fileURL);
        }
        if (onUpload) onUpload(event?.target?.files?.[0] || null);
    };

    const handleCardClick = () => {
        if (onUpload) {
            const fileInput = document.getElementById(inputId);
            if (fileInput) {
                fileInput.click();
            }
        }
    };

    const CardContainer = styled('div')<{ hasImage: boolean }>(({ theme, hasImage }) => ({
        backgroundColor: '#fff',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.3s',
        border: hasImage ? 'none' : '2px dashed #ccc',
        paddingRight: '0px',
        margin: '0px',
        position: 'relative',
        width: `${size || 160}px`,
        height: `${size || 120}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
    }));

    return (
        <CardContainer
            key={new Date().getTime()}
            hasImage={!!asset?._id || (!!selectedFile && !!onUpload) || imageSrc === NO_IMAGE_ASSET || !!path}
            onClick={handleCardClick}
        >
            <input id={inputId} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            {!asset?._id && !selectedFile && onUpload && imageSrc !== NO_IMAGE_ASSET ? (
                <Box
                    width="100%"
                    display="flex"
                    textAlign="center"
                    flexDirection="column"
                    justifyContent="center"
                    padding="8px"
                >
                    <Typography variant="body2" color="textSecondary">
                        Click to upload image
                    </Typography>
                </Box>
            ) : isVideoExtension(imageSrc) ? (
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <source src={imageSrc} type="video/mp4" />
                </video>
            ) : (
                <Image
                    key={imageSrc}
                    src={imageSrc || ''}
                    alt="Asset"
                    width={size || 160}
                    height={size || 120}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                    onError={handleError}
                />
            )}
        </CardContainer>
    );
};

export default Card;
