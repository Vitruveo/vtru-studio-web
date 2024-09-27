import { useState } from 'react';
import { Box, Button, Modal as MuiModal, Slider, Typography } from '@mui/material';

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
    const [selectValues, setSelectValues] = useState([0, 0, 0, 0, 0]);

    const handleSelectChange = (index: number, value: number) => {
        const newSelectValues = [...selectValues];
        const totalAssigned = newSelectValues.reduce((acc, cur) => acc + cur, 0) - newSelectValues[index] + value;

        if (totalAssigned <= 100) {
            newSelectValues[index] = value;
            setSelectValues(newSelectValues);
            const totalAssignedPercentage = totalAssigned / 100;
            const remainder = available * (1 - totalAssignedPercentage);
            setUnassigned(remainder);
        }
    };

    const totalAssigned = selectValues.reduce((acc, cur) => acc + cur, 0);

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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Box display="flex" alignItems="center" gap={3} mb={1} key={index}>
                                <Slider
                                    sx={{ width: 90 }}
                                    value={selectValues[index]}
                                    onChange={(_e, v) => handleSelectChange(index, v as number)}
                                    disabled={totalAssigned === 100 && selectValues[index] === 0}
                                />
                                <Typography variant="caption">
                                    {selectValues[index].toFixed(0)}% {labelMapper[index]}
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
