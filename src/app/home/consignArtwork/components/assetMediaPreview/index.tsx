import { useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import BlankCard from '@/app/home/components/shared/BlankCard';
import { useI18n } from '@/app/hooks/useI18n';
import { ASSET_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
import Image from 'next/image';

interface AssetMediaPreviewProps {
    width?: number;
    height?: number;
    maxWidth?: number;
}

const AssetMediaPreview = (props: AssetMediaPreviewProps) => {
    const [fileIsload, setFileIsload] = useState(true);

    const { formats, assetMetadata } = useSelector((state) => state.asset);
    const path = formats?.preview?.path ? `${ASSET_STORAGE_URL}/${formats.preview.path}` : NO_IMAGE_ASSET;

    useEffect(() => {
        if (path === NO_IMAGE_ASSET) {
            setFileIsload(false);
        }
    }, [path]);

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const { language } = useI18n();

    const texts = {
        preview: language['studio.consignArtwork.assetPreview'],
    } as { [key: string]: string };

    const handleError = () => {};

    const handleLoad = () => {
        setFileIsload(false);
    };

    const width = lgUp || mdUp || smUp ? 500 : 320;
    const height = lgUp || mdUp || smUp ? 500 : 320;

    return (
        <Box
            maxWidth={props.maxWidth}
            width={props.maxWidth && '100%'}
            style={{ opacity: fileIsload ? 0 : 1, display: fileIsload ? 'none' : '' }}
        >
            <Box display={'flex'} gap={2}>
                <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                    {texts.preview}
                </Typography>
                <Typography marginBottom={2} fontSize="1.2rem" fontWeight="100">
                    {(assetMetadata?.context.formData as any)?.title ?? 'Untitled'}
                </Typography>
            </Box>
            <BlankCard sx={{ width: '100%' }}>
                <CardContent
                    sx={{ width: '100%' }}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        style={{
                            objectFit: 'cover',
                            opacity: fileIsload ? 0 : 1,
                            display: fileIsload ? 'none' : '',
                        }}
                        onLoad={handleLoad}
                        onError={handleError}
                        src={path}
                        width={width}
                        height={height}
                        alt="asset preview"
                    />
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export default AssetMediaPreview;
