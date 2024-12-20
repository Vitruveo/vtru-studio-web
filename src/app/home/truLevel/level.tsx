import React, { useState } from 'react';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { dynamicStyles } from './styles';
import Square from './square';
import Dot from './dot';
import ProgressBar from './progressBar';
import { novaSquare } from './utils';
import { LevelItem } from '@/features/user/types';

interface LevelProps {
    id: string;
    items: LevelItem[];
    levelNumber: number;
    levelsCompleted: { [key: string]: boolean };
}

const labels = {
    email: 'Email',
    avatar: 'Avatar',
    social: 'Social',
    profile: 'Profile Link',
    vault: 'Vault',
    liveness: 'Liveness',
    idaml: 'ID+AML',
    facts2: '0 Facts',
    address: 'Address',
    phone: 'Phone',
    facts3: '0 Facts',
    facts4: '0 Facts',
};

const levelsDescriptions = [
    { name: '', description: 'All users start at this level.' },
    { name: 'STARTERS', description: 'These artists are at the very beginning of their artistic journey.' },
    { name: 'NOVAS', description: 'These emerging artists are on the rise, showing promising talent and potential.' },
    {
        name: 'VIRTUOSOS',
        description: 'These artists are highly skilled and have achieved considerable success in their careers.',
    },
    { name: 'MAESTROS', description: 'These artists represent the pinnacle of their craft.' },
];

const Level = ({ id, items, levelNumber, levelsCompleted }: LevelProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const xlUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    const isCurrentLevel = Object.keys(levelsCompleted).length - 1 + 1 === levelNumber;
    const isNextLevel = Object.keys(levelsCompleted).length - 1 + 2 === levelNumber;

    const stepPoints = items.reduce((acc, cur) => (cur.completed ? acc + (cur.points || 0) : acc), 0);
    const stepTotalPoints = items.reduce((acc, cur) => acc + (cur.points || 0), 0);

    return (
        <Box
            onClick={handleFlip}
            sx={{ cursor: 'pointer', perspective: '1000px', gridRow: 'span 3 / span 3', gridRowStart: 3 }}
        >
            <Box
                sx={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={dynamicStyles.levelCard({
                            completed: levelsCompleted[id],
                            isCurrentLevel,
                            isNextLevel,
                            xlUp,
                        })}
                    >
                        <Box>
                            <Typography
                                marginTop={1}
                                textAlign="center"
                                fontSize="2.5em"
                                fontWeight="bold"
                                color="white"
                            >
                                {`Level ${id}`}
                            </Typography>
                            <Box marginTop={3} width="100%" display="flex" justifyContent="center">
                                <Square count={levelNumber} />
                            </Box>
                            <Box marginTop={5}>
                                {items.map((item, index) => {
                                    return (
                                        <Box key={item.label}>
                                            <Box marginBottom={2} gap={1} display="flex" alignItems="center">
                                                <Dot isCompleted={item.completed} />
                                                <Typography fontSize={20} color="white" fontWeight="bold">
                                                    {labels[item.label as keyof typeof labels]}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                fontFamily={stepTotalPoints > 0 ? novaSquare.style.fontFamily : 'inherit'}
                                marginBottom={2}
                                fontSize={20}
                                textAlign="center"
                                color="white"
                                fontWeight="bold"
                            >
                                {stepTotalPoints > 0 ? `${stepPoints} / ${stepTotalPoints}` : 'No Points'}
                            </Typography>
                            <Box sx={{ visibility: stepTotalPoints > 0 ? 'visible' : 'hidden' }}>
                                <ProgressBar currentPoints={stepPoints} totalPoints={stepTotalPoints} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        ...dynamicStyles.levelCard({
                            completed: levelsCompleted[id],
                            isCurrentLevel,
                            isNextLevel,
                            xlUp,
                        }),
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <Box>
                        <Typography marginTop={1} textAlign="center" fontSize={40} fontWeight="bold" color="white">
                            {`Level ${id}`}
                        </Typography>
                        <Box marginTop={3} width="100%" display="flex" justifyContent="center">
                            <Square count={levelNumber} />
                        </Box>
                        <Box marginTop={5}>
                            {levelsDescriptions[levelNumber] && (
                                <Typography fontWeight="bold" fontSize={20} color="white" textAlign="center">
                                    {levelsDescriptions[levelNumber].name}
                                </Typography>
                            )}
                        </Box>
                        <Box marginTop={5}>
                            {levelsDescriptions[levelNumber] && (
                                <Typography fontWeight={500} fontSize={20} color="white" textAlign="center">
                                    {levelsDescriptions[levelNumber].description}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Level;
