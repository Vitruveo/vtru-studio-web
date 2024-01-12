import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ModalBackConfirmProps {
    yesClick: () => void;
    show: boolean;
    handleClose: () => void;
}

export const ModalBackConfirm = ({ handleClose, yesClick, show }: ModalBackConfirmProps) => {
    const router = useRouter();

    const handleChangePage = () => {
        router.push('/home/consignArtwork');
    };

    return (
        <Dialog maxWidth="lg" open={show} onClose={handleClose}>
            <DialogTitle color="GrayText">Would you like to save the information?</DialogTitle>
            <DialogContent>
                <Box marginTop={3} width="100%" justifyContent="center" display="flex">
                    <Button
                        size="small"
                        style={{ width: '122px', marginRight: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleChangePage}
                    >
                        No
                    </Button>
                    <Button
                        size="small"
                        style={{ width: '122px' }}
                        variant="contained"
                        color="primary"
                        onClick={yesClick}
                    >
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
