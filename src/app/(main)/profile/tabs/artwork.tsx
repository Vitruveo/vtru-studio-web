import React, { useEffect, useState, memo } from 'react';
import { Box, Typography, Link, IconButton, CircularProgress } from '@mui/material';
import { getAssetById } from '@/features/asset/requests';
import { Asset } from '@/features/asset/types';
import AssetCard from './assetCard';
import { IconTrash } from '@tabler/icons-react';
import { ArtworkType } from '@/features/user/types';

interface ArtworkProps {
    name: string;
    url: string;
    artwork: ArtworkType;
    handleDelete: () => void;
}

const Artwork = memo(({ artwork, name, url, handleDelete }: ArtworkProps) => {
    const [asset, setAsset] = useState<Asset>();

    const handleGetAsset = async () => {
        if (artwork.type === 'assetRef') {
            const res = await getAssetById(artwork.value);
            if (res.data) setAsset(res.data);
        }
    };

    useEffect(() => {
        handleGetAsset();
    }, [artwork]);

    if (artwork.type === 'assetRef' && !asset)
        return (
            <Box
                width="100%"
                maxWidth="36%"
                mb={2}
                height={70}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress size={30} />
            </Box>
        );

    return (
        <Box width="100%" mb={2} display="flex" alignItems="center">
            <AssetCard size={70} path={artwork.type === 'upload' ? artwork.value : undefined} asset={asset} />
            <Box marginLeft="10px" width="32%">
                <Box>
                    <Typography
                        fontSize="1rem"
                        style={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        fontWeight="500"
                    >
                        {artwork.type === 'upload'
                            ? artwork.title
                            : (asset?.assetMetadata?.context?.formData as unknown as { title: string })?.title}
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    style={{
                        marginTop: '3px',
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
                        {name}
                    </Link>
                </Typography>
            </Box>
            <Box marginLeft="10px" width="10%">
                <IconButton
                    sx={{ padding: 0, margin: 0 }}
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    <IconTrash color={'red'} size="16" stroke={1.5} />
                </IconButton>
            </Box>
        </Box>
    );
});

export default Artwork;
