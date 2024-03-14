import { useSelector } from '@/store/hooks';
import React, { useEffect, useState, useRef } from 'react';
import { getMediaDefinition, handleGetFileType } from '../../assetMedia/helpers';
import { Theme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import BlankCard from '@/app/home/components/shared/BlankCard';

interface AssetMediaPreviewProps {
    width?: number;
    height?: number;
}

const AssetMediaPreview = (props: AssetMediaPreviewProps) => {
    const [fileIsload, setFileIsload] = useState(true);

    const { formats } = useSelector((state) => state.asset);
    const selectPreviewAsset = Object.entries(formats).find(([key]) => key === 'preview');
    const urlAssetFile = selectPreviewAsset?.[1]?.file as string;

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const isVideo = handleGetFileType(selectPreviewAsset?.[1].file).mediaType === 'video';

    const thumbSRC = urlAssetFile?.replace(/\.[^/.]+$/, `_thumb.${isVideo ? 'mp4' : 'jpg'}`);

    const [currentSrcType, setCurrentSrcType] = useState(urlAssetFile);
    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    if (!selectPreviewAsset || (selectPreviewAsset && !selectPreviewAsset[1].file)) return <></>;

    const handleError = () => {
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.src = `${currentSrcType}?retry=${Date.now()}`;
                setCurrentSrcType(currentSrcType === urlAssetFile ? thumbSRC : urlAssetFile);
            }
        }, 1000);
    };

    const handleVideoError = () => {
        setFileIsload(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.src = `${currentSrcType}?retry=${Date.now()}`;
                setCurrentSrcType(currentSrcType === urlAssetFile ? thumbSRC : urlAssetFile);
            }
        }, 1000);
    };

    const handleLoad = () => {
        setFileIsload(false);
    };

    const width = lgUp || mdUp || smUp ? 480 : 320;
    const height = lgUp || mdUp || smUp ? 480 : 320;

    return (
        <BlankCard>
            <CardContent>
                <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                    Asset preview
                </Typography>
                {isVideo ? (
                    <video ref={videoRef} onError={handleVideoError} width={width} height={height} autoPlay muted loop>
                        <source src={currentSrcType} />
                    </video>
                ) : (
                    <img
                        ref={imgRef}
                        style={{
                            objectFit: 'contain',
                            opacity: fileIsload ? 0 : 1,
                            display: fileIsload ? 'none' : '',
                        }}
                        onLoad={handleLoad}
                        onError={handleError}
                        src={currentSrcType}
                        width={width}
                        height={height}
                    />
                )}
            </CardContent>
        </BlankCard>
    );
};

export default AssetMediaPreview;
