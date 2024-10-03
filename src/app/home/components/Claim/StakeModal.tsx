import { useState } from 'react';
import { Box, Button, CircularProgress, Modal as MuiModal, Slider, Typography } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    claimAllocate: (values: number[]) => void;
    available: number;
    loading: boolean;
}

const labelMapper = {
    0: 'Claim to wallet',
    1: 'Stake for 1 year at 15% APR',
    2: 'Stake for 3 years at 30% APR',
    3: 'Stake for 5 years at 60% APR',
    4: 'Allocate to VIBE Creator Equity Pool',
} as { [key: number]: string };

export default function StakeModal({ isOpen, available, loading, claimAllocate, handleClose }: ModalProps) {
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
                            <Typography variant="h3">{Math.trunc(available)} VTRU</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color={'GrayText'}>
                                Unassigned
                            </Typography>
                            <Typography variant="h3" color={'GrayText'}>
                                {Math.trunc(unassigned)} VTRU
                            </Typography>
                        </Box>
                    </Box>

                    <Box mb={2} ml={2} width={'88%'}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Box key={index} mb={1}>
                                <Box display={'flex'} gap={1.5}>
                                    <Typography fontSize={16} color={index === 4 ? 'GrayText' : 'inherit'}>
                                        {Math.trunc((available * selectValues[index]) / 100)}
                                    </Typography>
                                    <Typography fontSize={16} color={index === 4 ? 'GrayText' : 'inherit'}>
                                        {labelMapper[index]}
                                    </Typography>
                                </Box>
                                <Box display="flex" gap={3} mb={3} key={index}>
                                    <Slider
                                        value={selectValues[index]}
                                        onChange={(_e, v) => handleSelectChange(index, v as number)}
                                        disabled={(totalAssigned === 100 && selectValues[index] === 0) || index === 4}
                                    />
                                    <Typography fontSize={16} color={index === 4 ? 'GrayText' : 'inherit'}>
                                        {selectValues[index].toFixed(0)}%
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box display="flex" justifyContent={'space-between'}>
                        <a href="https://scope.vitruveo.xyz/staking/vtru" target="_new">
                            Current stakes
                        </a>
                        <Button
                            disabled={loading || totalAssigned !== 100}
                            variant="contained"
                            onClick={() => claimAllocate(selectValues)}
                            sx={{ width: '120px' }}
                        >
                            Go {loading && <CircularProgress size={16} style={{ marginLeft: 10 }} />}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
}
