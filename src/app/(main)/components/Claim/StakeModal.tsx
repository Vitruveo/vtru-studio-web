import { useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { Box, Button, CircularProgress, Modal as MuiModal, Slider, Typography } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    claimAllocate: (values: number[]) => void;
    available: number;
    loading: boolean;
    vaultCreatedAt: string | null;
}

const optionsToWallet = [
    {
        label: 'For buying Art',
        currency: 'VUSD',
    },
    {
        label: 'For trading on exchanges',
        currency: 'VTRU',
    },
];

const options = [
    {
        label: '1 year at 15% APR',
        currency: 'VTRU',
    },
    {
        label: '3 years at 30% APR',
        currency: 'VTRU',
    },
    {
        label: '5 years at 60% APR',
        currency: 'VTRU',
    },
];

export default function StakeModal({
    isOpen,
    available,
    loading,
    claimAllocate,
    handleClose,
    vaultCreatedAt,
}: ModalProps) {
    const [unassigned, setUnassigned] = useState(available);
    const [selectValues, setSelectValues] = useState([0, 0, 0, 0, 0]);

    const isLessThan30Days = (): boolean => {
        if (!vaultCreatedAt) return false;

        const createdAt = parseISO(vaultCreatedAt);
        const now = new Date();
        const daysDifference = differenceInDays(now, createdAt);

        return daysDifference < 30;
    };

    const handleSelectChange = (index: number, value: number) => {
        const newSelectValues = [...selectValues];
        const totalAssigned = newSelectValues.reduce((acc, cur) => acc + cur, 0) - newSelectValues[index] + value;

        if (totalAssigned <= 100) {
            newSelectValues[index] = value;
            setSelectValues(newSelectValues);
            const totalAssignedPercentage = totalAssigned / 100;
            const remainder = Math.trunc(available * (1 - totalAssignedPercentage));

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
                            <Typography variant="h3">{available} VUSD</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="caption">VTRU Pirce</Typography>
                            <Typography variant="h3">$0.2012</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <Typography variant="caption" color={'GrayText'}>
                                Unassigned
                            </Typography>
                            <Typography variant="h3" color={'GrayText'}>
                                {unassigned} VUSD
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Long-term Income: Stake for Interest
                    </Typography>
                    <Box
                        mb={2}
                        padding={2}
                        sx={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        {options.map((item, indexOptions) => {
                            const index = indexOptions + optionsToWallet.length;
                            const valueStaked = (available * selectValues[index]) / 100;
                            return (
                                <Box key={index} mb={1}>
                                    <Box display={'flex'} mb={1} justifyContent="space-between">
                                        <Typography fontSize={16}>{item.label}</Typography>
                                        <Typography fontSize={16}>
                                            {valueStaked} {item.currency}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" gap={3} mb={3} key={index}>
                                        <Slider
                                            value={selectValues[index]}
                                            onChange={(_e, v) => handleSelectChange(index, v as number)}
                                            disabled={totalAssigned === 100 && selectValues[index] === 0}
                                            max={100}
                                        />

                                        <Typography fontSize={16}>{selectValues[index].toFixed(0)}%</Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Short-term Income: Claim to Wallet
                    </Typography>
                    <Box
                        mb={2}
                        padding={2}
                        sx={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        {optionsToWallet.map((item, index) => {
                            const valueStaked = (available * selectValues[index]) / 100;
                            return (
                                <Box key={index} mb={1}>
                                    <Box display={'flex'} mb={1} justifyContent="space-between">
                                        <Typography fontSize={16}>{item.label}</Typography>
                                        <Typography fontSize={16}>
                                            {valueStaked} {item.currency}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" gap={3} mb={3} key={index}>
                                        <Slider
                                            value={selectValues[index]}
                                            onChange={(_e, v) => handleSelectChange(index, v as number)}
                                            disabled={totalAssigned === 100 && selectValues[index] === 0}
                                            max={100}
                                        />

                                        <Typography fontSize={16}>{selectValues[index].toFixed(0)}%</Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box display="flex" justifyContent={'space-between'}>
                        <a href="https://scope.vitruveo.xyz/staking/vtru" target="_new">
                            Current stakes
                        </a>
                        <Button
                            disabled={loading || totalAssigned !== 100 || isLessThan30Days()}
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
