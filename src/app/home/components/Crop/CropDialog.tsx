import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';

interface Props {
    image: string;
    isOpen: boolean;
    definition: 'square' | 'landscape' | 'portrait';
    handleCancel(): void;
}

const definitions = {
    square: {
        width: 400,
        height: 400,
    },
    landscape: {
        width: 500,
        height: 300,
    },
    portrait: {
        width: 300,
        height: 500,
    },
};

export function CropDialog({ image, isOpen, definition, handleCancel }: Props) {
    return (
        <Dialog open={isOpen} onClose={handleCancel}>
            <DialogTitle>Show cropper</DialogTitle>
            <DialogContent>
                <Image
                    width={definitions[definition].width}
                    height={definitions[definition].height}
                    src={image}
                    alt="cropper"
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="outlined" size="small" onClick={handleCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
