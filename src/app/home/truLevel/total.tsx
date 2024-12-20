import React from 'react';
import { Box, Typography } from '@mui/material';
import { staticStyles } from './styles';
import { getCurrentLevel, novaSquare } from './utils';
import { TruLevel } from '@/features/user/types';

interface TotalProps {
    truLevel?: TruLevel;
}

const Total = ({ truLevel }: TotalProps) => {
    const totalPoints = (truLevel?.totalPoints || 0) + (truLevel?.extraPoints || 0);

    const currentLevel = truLevel?.currentLevel || 0;

    return (
        <Box sx={staticStyles.totalCard}>
            <Box width="28.4%">
                <Box sx={staticStyles.totalCardLevel}>
                    <Typography
                        fontFamily={novaSquare.style.fontFamily}
                        fontWeight="500"
                        color="primary"
                        fontSize={112}
                    >
                        {currentLevel}
                    </Typography>
                </Box>
                <Typography fontWeight="600" marginTop={2.5} fontSize={31} color="white" textAlign="center">
                    Level
                </Typography>
            </Box>
            <Box flex={2}>
                <Box sx={staticStyles.totalCardPoints}>
                    <Typography fontFamily={novaSquare.style.fontFamily} fontWeight="500" color="white" fontSize={112}>
                        {totalPoints}
                    </Typography>
                </Box>
                <Typography fontWeight="600" marginTop={2.5} fontSize={31} color="white" textAlign="center">
                    Points
                </Typography>
            </Box>
        </Box>
    );
};

export default Total;
