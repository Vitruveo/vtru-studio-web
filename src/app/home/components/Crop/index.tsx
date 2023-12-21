import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { IconEye } from '@tabler/icons-react';
import { CropDialog } from './CropDialog';

interface CropProps {
    x: number;
    y: number;
}

interface Props {
    image: string;
    width: number;
    height: number;
    zoom: number;
    onChange(crop: CropProps): void;
}

interface GetCroppedImgProps {
    imageSrc: string;
    pixelCrop: Area;
}

const createImage = (url: string) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

async function getCroppedImg({ imageSrc, pixelCrop }: GetCroppedImgProps) {
    const image: any = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
    }

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) resolve(URL.createObjectURL(file));
        }, 'image/jpeg');
    });
}

export function Crop({ image, width, height, zoom, onChange }: Props) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [croppedPixels, setCroppedPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [croppedImage, setCroppedImage] = useState('');
    const [showCroppedImage, setShowCroppedImage] = useState(false);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        onChange({
            x: croppedAreaPixels.x,
            y: croppedAreaPixels.y,
        });

        setCroppedPixels(croppedAreaPixels);
    };

    const handleGetCropperArea = async () => {
        const croppedImageURL = await getCroppedImg({
            imageSrc: image,
            pixelCrop: croppedPixels,
        });

        setCroppedImage(croppedImageURL as string);
        setShowCroppedImage(true);
    };

    return (
        <Stack direction="column" gap={2} alignItems="center">
            <IconButton size="small" color="primary" onClick={handleGetCropperArea}>
                <IconEye />
                show cropper
            </IconButton>
            <Box height={600} width={800}>
                <Box position="relative" width="100%" height="100%">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        cropSize={{ width: width / 10, height: height / 10 }}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        restrictPosition={false}
                    />
                </Box>
            </Box>

            <CropDialog
                handleCancel={() => setShowCroppedImage(false)}
                isOpen={showCroppedImage}
                image={croppedImage}
                definition={width > height ? 'landscape' : height > width ? 'portrait' : 'square'}
            />
        </Stack>
    );
}
