import { useSelector } from '@/store/hooks';
import React from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import BlankCard from '@/app/home/components/shared/BlankCard';
import { ASSET_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
import Image from 'next/image';
import isVideoExtension from '@/utils/isVideo';

interface AssetMediaPreviewProps {
    width?: number;
    height?: number;
    maxWidth?: number;
}

const AssetMediaPreview = (props: AssetMediaPreviewProps) => {
    const { formats, assetMetadata } = useSelector((state) => state.asset);
    const path = formats?.preview?.path ? `${ASSET_STORAGE_URL}/${formats.preview.path}` : NO_IMAGE_ASSET;
    const isVideo = isVideoExtension(path);

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const handleError = () => {};

    const width = lgUp || mdUp || smUp ? 500 : 320;
    const height = lgUp || mdUp || smUp ? 500 : 320;

    return (
        <Box maxWidth={props.maxWidth} width={props.maxWidth && '100%'}>
            <Box display={'flex'} gap={2}>
                <Typography variant="h3" mb={1}>
                    {(assetMetadata?.context.formData as any)?.title ?? 'Untitled'}
                </Typography>
            </Box>
            <BlankCard sx={{ width: '100%' }}>
                <CardContent
                    sx={{ width: '100%' }}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {isVideo ? (
                        <video autoPlay muted loop style={{ objectFit: 'cover' }}>
                            <source src={path} type="video/mp4" />
                        </video>
                    ) : (
                        <Image
                            style={{
                                objectFit: 'cover',
                            }}
                            onError={handleError}
                            src={path}
                            width={width}
                            height={height}
                            alt="asset preview"
                        />
                    )}
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export default AssetMediaPreview;
