import { useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { getMediaDefinition } from '../../assetMedia/helpers';

interface AssetMediaPreviewProps {
    width?: number;
    height?: number;
}

const AssetMediaPreview = (props: AssetMediaPreviewProps) => {
    const { formats } = useSelector((state) => state.asset);

    const selectOriginalAsset = Object.entries(formats).find(([key]) => key === 'preview');

    if (!selectOriginalAsset || (selectOriginalAsset && !selectOriginalAsset[1].file)) return <></>;

    const thumbSRC = (selectOriginalAsset[1].file as string)?.replace(/\.[^/.]+$/, `.jpeg`);

    return (
        <div>
            <img src={thumbSRC} width={600} height={600} />
        </div>
    );
};

export default AssetMediaPreview;
