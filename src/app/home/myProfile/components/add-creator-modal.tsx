import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

interface AddCreatorModalProps {
    open: boolean;
    onClose: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    creatorsLength: number;
    onAdd: () => void;
}

export const AddCreatorModal = ({ open, onClose, handleChange, creatorsLength, onAdd }: AddCreatorModalProps) => {

    const onAddClick = () => {
      onAdd();
      onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Creator</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new creator to this website, please fill the empty fields below.
                </DialogContentText>
                <Box mt={2}>
                    <CustomTextField
                        autoFocus
                        margin="dense"
                        name="currentCreator.name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onAddClick}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};
