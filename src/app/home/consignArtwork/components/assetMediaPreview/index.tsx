import { useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { getMediaDefinition } from '../../assetMedia/helpers';

interface AssetMediaPreviewProps {
    width?: number;
    height?: number;
}

const AssetMediaPreview = (props: AssetMediaPreviewProps) => {
    const { formats } = useSelector((state) => state.asset);

    const selectOriginalAsset = Object.entries(formats).find(([key]) => key === 'original');

    if (!selectOriginalAsset || (selectOriginalAsset && !selectOriginalAsset[1].file)) return <></>;

    const thumbSRC = (selectOriginalAsset[1].file as string)?.replace(/\.[^/.]+$/, `_thumb.jpg`);

    const definition = 'portrait';

    return (
        <div>
            <img
                src={thumbSRC}
                width={definition === 'landscape' ? 500 : definition === 'portrait' ? 300 : 50}
                height={definition === 'landscape' ? 300 : definition === 'portrait' ? 500 : 100}
            />
        </div>
    );
};

export default AssetMediaPreview;
