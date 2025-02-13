import React from 'react';
import { useI18n } from '@/app/hooks/useI18n';
import { Dialog, DialogContent, Typography } from '@mui/material';
import { TranslateFunction } from '@/i18n/types';
import { formatFileSize, mediaConfigs } from './helpers';

interface ModalErrorProps {
    isVideo?: boolean;
    dimensionError?: boolean;
    sizeError?: boolean;
    mediaConfig: (typeof mediaConfigs)['landscape']['display'];
    definition?: string;
    format: string;
    open: boolean;
    setClose: () => void;
}

const ModalError = ({
    isVideo,
    definition,
    dimensionError,
    format,
    sizeError,
    mediaConfig,
    open,
    setClose,
}: ModalErrorProps) => {
    const { language } = useI18n();

    const texts = {
        sizeTitle: language['studio.consignArtwork.assetMedia.modalErrorSize.title'],
        modalErrorTitle: language['studio.consignArtwork.assetMedia.modalError.title'],
        dimensionsTitle: language['studio.consignArtwork.assetMedia.modalErrorDimensions.title'],
    } as { [key: string]: string };

    return (
        <Dialog open={open} onClose={setClose}>
            <DialogContent>
                <Typography color="red" marginBottom={2}>
                    {texts.modalErrorTitle}
                </Typography>
                {dimensionError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            {texts.dimensionsTitle}
                        </Typography>{' '}
                        {(
                            language[
                                'studio.consignArtwork.assetMedia.modalErrorDimensions.description'
                            ] as TranslateFunction
                        )({ width: mediaConfig?.width, height: mediaConfig?.height, definition, format })}
                    </Typography>
                )}
                {sizeError && (
                    <Typography color="red">
                        <Typography color="red" fontWeight="bold">
                            {texts.sizeTitle}
                        </Typography>{' '}
                        {(language['studio.consignArtwork.assetMedia.modalErrorSize.description'] as TranslateFunction)(
                            {
                                sizeError: isVideo
                                    ? formatFileSize(mediaConfig?.sizeMB.video)
                                    : formatFileSize(mediaConfig?.sizeMB.image),
                                definition,
                                format,
                            }
                        )}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalError;
