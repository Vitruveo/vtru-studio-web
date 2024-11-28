'use client';
import React, { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import Synaps from './synaps';
import Total from './total';
import PageContainer from '../components/container/PageContainer';
import Levels from './levels';
import { useDispatch, useSelector } from '@/store/hooks';
import { getTruLevelThunk } from '@/features/user/thunks';

export interface LevelStep {
    name: string;
    completed: boolean;
    points?: number;
}

export interface LevelsType {
    name: string;
    steps: LevelStep[];
}

const levels: LevelsType[] = [
    {
        name: 'Level 0',
        steps: [{ name: 'Email', completed: true }],
    },
    {
        name: 'Level 1',
        steps: [
            { name: 'Avatar', completed: true, points: 100 },
            { name: 'Social', completed: true, points: 100 },
            { name: 'Profile Link', completed: true, points: 100 },
            { name: 'Vault', completed: true, points: 200 },
        ],
    },
    {
        name: 'Level 2',
        steps: [
            { name: 'Liveness', completed: true, points: 1000 },
            { name: 'ID+AML', completed: false, points: 1500 },
            { name: '0 Facts', completed: false, points: 1500 },
        ],
    },
    {
        name: 'Level 3',
        steps: [
            { name: 'Address', completed: false, points: 1000 },
            { name: 'Phone', completed: false, points: 500 },
            { name: '0 Facts', completed: false, points: 1500 },
        ],
    },
    {
        name: 'Level 4',
        steps: [{ name: '0 Facts', completed: false, points: 2500 }],
    },
];

export default function TruLevel() {
    const dispatch = useDispatch();
    const truLevel = useSelector((state) => state.user.truLevel);

    const { language } = useI18n();

    const texts = {
        home: language['studio.myProfile.home'],
        title: language['studio.sidebar.truLevel'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.home,
        },
        {
            title: texts.title,
        },
    ];

    useEffect(() => {
        dispatch(getTruLevelThunk());
    }, []);

    return (
        <PageContainer title={texts.title} margin>
            <Box margin="auto 0" marginBottom={10} display="relative">
                <Breadcrumb title={texts.title} items={BCrumb} />
                <Box
                    width="75%"
                    gap={4}
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)"
                    gridTemplateRows="repeat(5, 1fr)"
                    my={2}
                >
                    <Total levels={levels} />
                    <Box
                        sx={{
                            gridColumn: 'span 2 / span 2',
                            gridRow: 'span 2 / span 2',
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} color="primary" lineHeight={0.9} fontSize={50}>
                                tru
                            </Typography>
                            <Typography fontWeight={500} color="black" lineHeight={0.9} fontSize={50}>
                                Level
                            </Typography>
                        </div>
                        <Typography color="GrayText" lineHeight={1.3} fontSize={20}>
                            truLevel increases trust and confidence for Patrons and Subscribers in the Xibit ecosystem.
                        </Typography>
                        <Box gap={4} display="flex">
                            <Box flex={1}>
                                <Synaps />
                            </Box>
                            <Box flex={1}>
                                <Button
                                    sx={{
                                        backgroundColor: '#CCCCCC',
                                        height: '64px',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        fontSize: '1.5rem',
                                        '&:hover': {
                                            backgroundColor: '#CCCCCC',
                                            boxShadow: 'none',
                                            cursor: 'not-allowed',
                                        },
                                    }}
                                    variant="contained"
                                >
                                    Claim
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Levels levels={levels} />
                </Box>
                <Box marginLeft={2}>
                    <Typography color="GrayText" lineHeight={1.3} fontSize={20}>
                        Points are added to your profile after a Level has been completed.
                    </Typography>
                </Box>
            </Box>
        </PageContainer>
    );
}
