import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface Props {
  image: string;
  width: number;
  height: number;
  originalHeight: number;
}

export function Crop({ image, width, height }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <Stack direction="column" alignItems="center">
      <Box minHeight={600} height={height} width={1200}>
        <Box position="relative" height="100%" width="100%">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropSize={{ width: width, height: height }}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>

        <Stack direction="row">
          <Typography>resize</Typography>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="zoom-range"
          />
        </Stack>
      </Box>
    </Stack>
  );
}
