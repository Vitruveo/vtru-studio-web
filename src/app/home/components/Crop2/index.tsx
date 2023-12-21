import { Box } from '@mui/material';
import { useState } from 'react';
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
    const [currentCrop, setCurrentCrop] = useState<PixelCrop>({
        height: height / 10,
        width: width / 10,
        x: 10,
        y: 10,
        unit: 'px',
    });

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <ReactCrop
                crop={currentCrop}
                onChange={(pxCrop, percentCrop) => setCurrentCrop(pxCrop)}
                onComplete={(pxCrop, percentCrop) => onChange(pxCrop)}
                locked
                style={{ maxWidth: '800px' }}
                // aspect={1}
            >
                <img alt="Crop me" src={src} style={{ transform: `scale(${scale}) ` }} />
            </ReactCrop>
        </Box>
    );
}

// const cropImageNow = () => {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx:any = canvas.getContext('2d');

//     const pixelRatio = window.devicePixelRatio;
//     canvas.width = crop.width * pixelRatio;
//     canvas.height = crop.height * pixelRatio;
//     ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//     ctx.imageSmoothingQuality = 'high';

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height,
//     );

//     const base64Image = canvas.toDataURL('image/jpeg');
//     croppedImage(base64Image);
//   };
