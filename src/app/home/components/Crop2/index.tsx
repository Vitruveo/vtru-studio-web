import { Box } from '@mui/material';
import ReactCrop, { PixelCrop } from 'react-image-crop';

interface Crop2Props {
    src: string;
    scale: number;

    width: number;
    height: number;

    crop: PixelCrop;
    onChange(crop: PixelCrop): void;
}

export function Crop2({ src, scale, width, height, crop, onChange }: Crop2Props) {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <ReactCrop
                crop={crop}
                onChange={(pxCrop, percentCrop) => onChange(pxCrop)}
                onComplete={(pxCrop, percentCrop) => onChange(pxCrop)}
                locked
                style={{ width: 800 }}
                // aspect={1}
            >
                <img alt="Crop me" src={src} style={{ transform: `scale(${scale}) ` }} />
            </ReactCrop>
        </Box>
    );
}
