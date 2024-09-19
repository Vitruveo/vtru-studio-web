import { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Modal as MuiModal, Select, Typography } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    available: number;
}

const labelMapper = {
    0: 'Claim to wallet',
    1: 'Stake for 1 year at 15% APR',
    2: 'Stake for 3 years at 30% APR',
    3: 'Stake for 5 years at 60% APR',
    4: 'Allocate to VIBE Creator Equity Pool',
} as { [key: number]: string };

export default function StakeModal({ isOpen, handleClose, available }: ModalProps) {
    const [unassigned, setUnassigned] = useState(available);
    const [selectOptions, setSelectOptions] = useState([0, 0, 0, 0, 0]);
    const [selectValues, setSelectValues] = useState([0, 0, 0, 0, 0]);

    const handleSelectChange = (index: number, value: number) => {
        const newValues = [...selectOptions];
        newValues[index] = value;
        setSelectOptions(newValues);

        const newSelectValues = [...selectValues];
        newSelectValues[index] = available * (value / 100);
        setSelectValues(newSelectValues);

        const remainder = available - newSelectValues.reduce((acc, cur) => acc + cur, 0);
        setUnassigned(remainder);
    };

    const handleGetOptions = (index: number) => {
        const total = selectOptions.reduce((acc, cur, i) => (i !== index ? acc + cur : acc), 0);
        const maxSum = 100;
        const steps = 10;
        const max = maxSum - total;
        const options = [];
        for (let i = 0; i <= max; i += steps) {
            options.push(i);
        }
        return options;
    };

    return (
        <MuiModal open={isOpen} onClose={handleClose}>
            <Box
                borderRadius={4}
                onClick={(e) => e.target === e.currentTarget && handleClose()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box width={600} bgcolor="#fff" padding={5}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Box>
                            <Typography variant="caption">Available</Typography>
                            <Typography variant="h3">{available.toFixed(2)} VTRU</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption">Unassigned</Typography>
                            <Typography variant="h3">{unassigned.toFixed(2)} VTRU</Typography>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        {selectOptions.map((value, index) => (
                            <Box display="flex" alignItems="center" gap={3} mb={1} key={index}>
                                <FormControl>
                                    <Select
                                        value={value}
                                        onChange={(e) => handleSelectChange(index, e.target.value as number)}
                                        sx={{ width: 90 }}
                                    >
                                        {handleGetOptions(index).map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}%
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Typography variant="caption">
                                    {selectValues[index].toFixed(2)} {labelMapper[index]}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">
                            <a href="#">How-to Guide</a>
                        </Typography>
                        <Button variant="contained">Go</Button>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
}
