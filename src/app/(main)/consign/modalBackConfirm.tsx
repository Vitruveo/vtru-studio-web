import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/app/hooks/useI18n';

interface ModalBackConfirmProps {
    yesClick: () => void;
    noClick?: () => void;
    show: boolean;
    handleClose: () => void;
    disabledSave?: boolean;
    saveText?: string;
}

export const ModalBackConfirm = ({
    handleClose,
    yesClick,
    noClick,
    show,
    disabledSave = false,
    saveText,
}: ModalBackConfirmProps) => {
    const router = useRouter();
    const { language } = useI18n();

    const texts = {
        title: language['studio.consignArtwork.backModal.title'],
        confirm: language['studio.consignArtwork.backModal.confirm.button'],
        cancel: language['studio.consignArtwork.backModal.cancel.button'],
    } as { [key: string]: string };

    const handleChangePage = () => {
        if (noClick) noClick();
        else router.push('/consign');
    };

    return (
        <Dialog maxWidth="lg" open={show} onClose={handleClose}>
            <DialogTitle color="GrayText">{texts.title}</DialogTitle>
            <DialogContent>
                <Box marginTop={3} width="100%" justifyContent="center" display="flex">
                    <Button
                        size="small"
                        style={{ width: '122px', marginRight: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleChangePage}
                    >
                        {texts.cancel}
                    </Button>
                    <Button
                        size="small"
                        style={{ width: '122px' }}
                        variant="contained"
                        color="primary"
                        onClick={yesClick}
                        disabled={disabledSave}
                    >
                        {saveText || texts.confirm}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
