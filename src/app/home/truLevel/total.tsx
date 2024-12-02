import React from 'react';
import { Box, Typography } from '@mui/material';
import { staticStyles } from './styles';
import { LevelsType } from './page';
import { getCurrentLevel, novaSquare } from './utils';

interface TotalProps {
    levels?: LevelsType[];
}

const Total = ({ levels }: TotalProps) => {
    const totalPoints = levels?.reduce((acc, level) => {
        if (level)
            return acc + level.steps.reduce((accSteps, step) => accSteps + (step.completed ? step.points || 0 : 0), 0);
        return acc;
    }, 0);

    const currentLevel = getCurrentLevel({ levels });

    return (
        <Box sx={staticStyles.totalCard}>
            <Box width="28.4%">
                <Box sx={staticStyles.totalCardLevel}>
                    <Typography
                        fontFamily={novaSquare.style.fontFamily}
                        fontWeight="600"
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
                    <Typography fontFamily={novaSquare.style.fontFamily} fontWeight="600" color="white" fontSize={112}>
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
