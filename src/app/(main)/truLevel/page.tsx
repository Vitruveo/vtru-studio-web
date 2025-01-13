'use client';
import React, { useEffect, memo } from 'react';

import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { useI18n } from '@/app/hooks/useI18n';
import Synaps from './synaps';
import Total from './total';
import PageContainer from '../components/container/PageContainer';
import Levels from './levels';
import { useDispatch, useSelector } from '@/store/hooks';
import { getTruLevelThunk } from '@/features/user/thunks';
import { TruLevel as TruLevelType } from '@/features/user/types';

export interface LevelStep {
    name: string;
    completed: boolean;
    points?: number;
}

export interface LevelsType {
    name: string;
    steps: LevelStep[];
}

const TruLevel = () => {
    const dispatch = useDispatch();

    const { emails, myWebsite, profile, socials } = useSelector((state) => state.user);

    const initLevels = [
        {
            id: '0',
            items: [
                {
                    label: 'email',
                    points: 0,
                    completed: !!emails.length,
                },
            ],
        },
        {
            id: '1',
            items: [
                {
                    label: 'avatar',
                    points: 100,
                    completed: !!profile.avatar,
                },
                {
                    label: 'social',
                    points: 100,
                    completed: !!socials?.x?.avatar,
                },
                {
                    label: 'profile',
                    points: 100,
                    completed: !!myWebsite,
                },
                {
                    label: 'vault',
                    points: 200,
                    completed: false,
                },
            ],
        },
        {
            id: '2',
            items: [
                {
                    label: 'liveness',
                    points: 1000,
                    completed: false,
                },
                {
                    label: 'idaml',
                    points: 1500,
                    completed: false,
                },
                {
                    label: 'facts2',
                    points: 1500,
                    completed: false,
                },
            ],
        },
        {
            id: '3',
            items: [
                {
                    label: 'address',
                    points: 1000,
                    completed: false,
                },
                {
                    label: 'phone',
                    points: 500,
                    completed: false,
                },
                {
                    label: 'facts3',
                    points: 1500,
                    completed: false,
                },
            ],
        },
        {
            id: '4',
            items: [
                {
                    label: 'facts4',
                    points: 2500,
                    completed: false,
                },
            ],
        },
    ];

    const initTruLevel: TruLevelType = {
        currentLevel: 0,
        totalPoints: 0,
        extraPoints: initLevels.reduce((acc, cur) => {
            cur.items.forEach((v) => {
                if (v.completed) acc += v.points;
            });
            return acc;
        }, 0),
        levels: initLevels,
    };

    const truLevelState = useSelector((state) => state.user.truLevel);
    const truLevel = truLevelState || initTruLevel;

    const xlUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

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
        const getTrulevelInterval = setInterval(() => {
            dispatch(getTruLevelThunk());
        }, 5000);
        dispatch(getTruLevelThunk());
        return () => {
            clearInterval(getTrulevelInterval);
        };
    }, []);

    return (
        <PageContainer title={texts.title} margin>
            <Box margin="auto 0" marginBottom={10} display="relative">
                <Breadcrumb title={texts.title} items={BCrumb} />
                <Box
                    width={xlUp ? '75%' : '100%'}
                    maxWidth={xlUp ? 800 : '100%'}
                    gap={4}
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)"
                    gridTemplateRows="repeat(5, 1fr)"
                    my={2}
                >
                    <Total truLevel={truLevel} />
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
                    <Levels truLevel={truLevel} />
                </Box>
                <Box marginLeft={2}>
                    <Typography color="GrayText" lineHeight={1.3} fontSize={20}>
                        Points are added to your profile after a Level has been completed.
                    </Typography>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default memo(TruLevel);
