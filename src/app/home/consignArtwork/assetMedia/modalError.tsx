import React from 'react';
import { useI18n } from '@/app/hooks/useI18n';
import { Dialog, DialogContent, Typography } from '@mui/material';
import { TranslateFunction } from '@/i18n/types';

interface ModalErrorProps {
    dimensionError?: { width: number; height: number };
    sizeError?: number;
    definition: string;
    format: string;
    open: boolean;
    setClose: () => void;
}

const ModalError = ({ definition, dimensionError, format, sizeError, open, setClose }: ModalErrorProps) => {
    const { language } = useI18n();

    const texts = {
        sizeTitle: language['studio.consignArtwork.assetMedia.modalErrorSize.title'],
        modalErrorTitle: language['studio.consignArtwork.assetMedia.modalError.title'],
        dimensionsTitle: language['studio.consignArtwork.assetMedia.modalErrorDimensions.title'],
    } as { [key: string]: string };

    return (
        <Dialog open={open} onClose={setClose}>
            <DialogContent>
                <Typography color="red">{texts.modalErrorTitle}</Typography>
                {dimensionError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            {texts.dimensionsTitle}
                        </Typography>{' '}
                        {(
                            language[
                                'studio.consignArtwork.assetMedia.modalErrorDimensions.description'
                            ] as TranslateFunction
                        )({ width: dimensionError.width, height: dimensionError.height, definition, format })}
                    </Typography>
                )}
                {sizeError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            {texts.sizeTitle}
                        </Typography>{' '}
                        {(language['studio.consignArtwork.assetMedia.modalErrorSize.description'] as TranslateFunction)(
                            { sizeError, definition, format }
                        )}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalError;
