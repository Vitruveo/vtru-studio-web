import { useEffect, useState } from 'react';
import { Box, Button, Modal as MuiModal, Slider, Typography } from '@mui/material';
import { BigNumber } from '@ethersproject/bignumber';

import { VUSD } from './actions';

const total = 10_000;

interface Props {
    isOpen: boolean;
    isLoading: boolean;
    handleClose: () => void;
    handleClaim: (params: { vusd: number; vtru: number }) => Promise<void>;

    vusd: number;
    vtru: number;
    usdc: number;
}

export const ClaimModal = ({ isOpen, isLoading, handleClose, handleClaim, vusd = 10, vtru, usdc }: Props) => {
    const [percentage, setPorcentage] = useState(0);

    const [currentVusd, setCurrentVusd] = useState(vusd);
    const [currentVtru, setCurrentVtru] = useState(vtru);

    const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
        setPorcentage(newValue as number);
    };

    useEffect(() => {
        // current vuds
        setCurrentVusd((vusd * (100 - percentage)) / 100);

        // current vtru
        VUSD.convertVusdToVtru(((vusd * percentage) / 100) * 10 ** 6)
            .then((data) => {
                const converted = data / BigInt(10 ** 18);
                const convertedToNumber = BigNumber.from(converted).toNumber();
                setCurrentVtru(convertedToNumber);
            })
            .catch((err) => {
                console.error('Error converting VUSD to VTRU', err);
            });
    }, [percentage]);

    const handleClickClaim = () => {
        const vtruValue = (percentage / 100) * total;
        const vusdValue = total - vtruValue;

        handleClaim({ vusd: vusdValue, vtru: vtruValue });
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
                    {/* This is currently a placeholder */}
                    <Typography fontWeight="bold">VUSD: {vusd.toFixed(4)}</Typography>
                    <Typography color="gray">Use the slider to convert from VUSD to VTRU</Typography>

                    {/* This is slider for converting VUSD to VTRU */}
                    <Box display="flex" marginTop={2} marginBottom={4}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                            <Typography>VUSD</Typography>
                            <Typography>{currentVusd.toFixed(4)}</Typography>
                        </Box>
                        <Box width="100%" marginInline={2} display="flex" flexDirection="column" alignItems="center">
                            <Slider value={percentage} onChange={handleChangeSlider} />
                            <Typography>{percentage}%</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                            <Typography>VTRU</Typography>
                            <Typography>{currentVtru.toFixed(4)}</Typography>
                        </Box>
                    </Box>

                    {/* This is currently a placeholder */}
                    <Typography fontWeight="bold">VTRU: {vtru.toFixed(4)}</Typography>
                    <Typography color="gray">Your VTRU balance will be transferred to your wallet </Typography>
                    <br />
                    <Typography fontWeight="bold">USDC.pol: {usdc.toFixed(4)}</Typography>

                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleClickClaim} disabled={isLoading || vusd <= 0}>
                            Claim
                        </Button>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
};
