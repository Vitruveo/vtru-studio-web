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

const options = [
    {
        label: 'Claim to wallet',
        enable: true,
    },
    {
        label: 'Stake for 1 year at 15% APR',
        enable: true,
    },
    {
        label: 'Stake for 3 years at 30% APR',
        enable: true,
    },
    {
        label: 'Stake for 5 years at 60% APR',
        enable: true,
    },
    // {
    //     label: 'Stake for 3 years at 0% APR - Get VERSE',
    //     enable: CLAIM_VERSE_ENABLE,
    // },
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
    const [coin, setCoin] = useState('VTRU');

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

    const handleChangeCoin = (coinValue: string) => {
        setCoin(coinValue);
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
                            <Typography variant="h3">{available} VTRU</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color={'GrayText'}>
                                Unassigned
                            </Typography>
                            <Typography variant="h3" color={'GrayText'}>
                                {unassigned} VTRU
                            </Typography>
                        </Box>
                    </Box>

                    <Box mb={2} ml={2} width={'96%'}>
                        {options.map((item, index) => {
                            const valueStaked =
                                index === 4
                                    ? Math.floor((available * selectValues[index]) / 100)
                                    : (available * selectValues[index]) / 100;
                            return (
                                <Box key={index} mb={1}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display={'flex'} gap={1.5}>
                                            <Typography fontSize={16}>{valueStaked}</Typography>
                                            <Typography fontSize={16}>{item.label}</Typography>
                                        </Box>
                                        {index === 0 && (
                                            <Box display="flex" marginBottom={1} alignItems="center" gap={1}>
                                                <Button
                                                    variant={coin === 'VTRU' ? 'contained' : 'outlined'}
                                                    onClick={() => handleChangeCoin('VTRU')}
                                                    color={coin === 'VTRU' ? 'primary' : 'inherit'}
                                                >
                                                    VTRU
                                                </Button>
                                                <Typography fontSize={16}>or</Typography>
                                                <Button
                                                    variant={coin === 'VUSD' ? 'contained' : 'outlined'}
                                                    onClick={() => handleChangeCoin('VUSD')}
                                                    color={coin === 'VUSD' ? 'primary' : 'inherit'}
                                                >
                                                    VUSD
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box display="flex" gap={3} mb={3} key={index}>
                                        <Slider
                                            value={selectValues[index]}
                                            onChange={(_e, v) => handleSelectChange(index, v as number)}
                                            disabled={
                                                !item.enable || (totalAssigned === 100 && selectValues[index] === 0)
                                            }
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
