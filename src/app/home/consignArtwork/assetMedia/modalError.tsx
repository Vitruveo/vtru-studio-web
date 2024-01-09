import { Dialog, DialogContent, Typography } from '@mui/material';
import React from 'react';

interface ModalErrorProps {
    dimensionError?: { width: number; height: number };
    sizeError?: number;
    definition: string;
    format: string;
    open: boolean;
    setClose: () => void;
}

const ModalError = ({ definition, dimensionError, format, sizeError, open, setClose }: ModalErrorProps) => {
    return (
        <Dialog open={open} onClose={setClose}>
            <DialogContent>
                <Typography color="red">Uh oh! The media file you uploaded has the following issues:</Typography>
                {dimensionError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            Dimensions
                        </Typography>{' '}
                        {`— The media file for a ${definition} Image (${format}) must be at least ${dimensionError.width} x ${dimensionError.height} pixels`}
                    </Typography>
                )}
                {sizeError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            Size
                        </Typography>{' '}
                        {`— The media file size for a ${definition} Image (${format}) cannot exceed ${sizeError}`}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalError;
