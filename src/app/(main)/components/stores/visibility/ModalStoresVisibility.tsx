import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from '@mui/material';
import { useState } from 'react';

interface ModalListOfLicensesProps {
    open: boolean;
    onClose: () => void;
}

export const ModalStoresVisibility = ({ ...rest }: ModalListOfLicensesProps) => {
    const [value, setValue] = useState('radio1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Modal open={rest.open} onClose={rest.onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h3" textAlign="center">
                    Store Visibility
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup name="storesVisibilityOptions" value={value} onChange={handleChange}>
                        <FormControlLabel
                            value="radio1"
                            control={<Radio color="default" />}
                            label="Visible in Stores"
                        />
                        <FormControlLabel
                            value="radio2"
                            control={<Radio color="default"></Radio>}
                            label="Visible in selected Stores"
                        />
                        {value === 'radio2' && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="store-select-label">Select Store</InputLabel>
                                <Select
                                    labelId="store-select-label"
                                    value={''}
                                    onChange={() => {}}
                                    label="Select Store"
                                    style={{
                                        minWidth: '100%',
                                    }}
                                >
                                    <MenuItem value="store1">Store 1</MenuItem>
                                    <MenuItem value="store2">Store 2</MenuItem>
                                    <MenuItem value="store3">Store 3</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <FormControlLabel
                            value="radio3"
                            control={<Radio color="default" />}
                            label="Hidden for selected Stores"
                        />
                        {value === 'radio3' && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="store-select-label">Select Store</InputLabel>
                                <Select
                                    labelId="store-select-label"
                                    value={''}
                                    onChange={() => {}}
                                    label="Select Store"
                                >
                                    <MenuItem value="store1">Store 1</MenuItem>
                                    <MenuItem value="store2">Store 2</MenuItem>
                                    <MenuItem value="store3">Store 3</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <FormControlLabel
                            value="radio4"
                            control={<Radio color="default" />}
                            label="Hidden from Stores"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Modal>
    );
};
