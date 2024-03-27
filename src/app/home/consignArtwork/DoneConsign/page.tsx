'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { RotateAnimation } from '@/animations/RotateAnimation';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '../../layout/shared/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';

interface ConsignStep {
    title: string;
    status?: 'completed' | 'pending' | 'done' | 'error';
    action: () => Promise<unknown>;
}

const getListIcon = (status: ConsignStep['status']) => {
    switch (status) {
        case 'completed':
            return '✔';
        case 'pending':
            return '⏳';
        case 'done':
            return '🎉';
        case 'error':
            return '❌';
        default:
            return null;
    }
};

const BCrumb: BreadCrumbItem[] = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        title: 'Consign Artwork',
        to: '/home/consignArtwork',
    },
    {
        title: 'Done',
    },
];

export default function DoneConsign() {
    const customizer = useSelector((state: any) => state.customizer); // TODO: ADICIONAR TIPAGEM CORRETA
    const router = useRouter();

    const asyncAction = async () => {
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 5000)));
    };

    const [steps, setSteps] = useState<ConsignStep[]>([
        {
            title: 'Signing media files using C2PA standard',
            action: asyncAction,
        },
        {
            title: 'Uploading media files to IPFS decentralized storage',
            action: asyncAction,
        },
        {
            title: 'Consigning artwork to Vitruveo blockchain',
            action: asyncAction,
        },
        {
            title: 'Generating artwork listing',
            action: asyncAction,
        },
        {
            title: 'Your artwork is ready! View',
            action: asyncAction,
        },
    ]);

    const changeStepStatus = (index: number, status: ConsignStep['status']) => {
        steps[index].status = status;
        setSteps([...steps]);
    };

    useEffect(() => {
        const runSteps = async () => {
            for await (const step of steps) {
                const stepIndex = steps.indexOf(step);
                const isLastStep = stepIndex === steps.length - 1;

                changeStepStatus(stepIndex, 'pending');

                try {
                    await step.action();
                    isLastStep ? changeStepStatus(stepIndex, 'done') : changeStepStatus(stepIndex, 'completed');
                    setSteps([...steps]);
                } catch (error) {
                    step.status = 'error';
                    alert('An error occurred. Please try again later.');
                    break;
                }
            }
        };
        runSteps();
    }, []);

    const isDisabled = steps[steps.length - 1].status != 'done';

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        router.push('/home/consignArtwork');
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Done"
                title={'Consign Artwork'}
                submitDisabled={isDisabled}
                backOnclick={() => router.push(`/home/consignArtwork`)}
            >
                <Breadcrumb title={'Consign Artwork'} items={BCrumb} />

                <Stack component="ul" spacing={1}>
                    {steps.map((step, index) => (
                        <li key={index} style={{ display: 'flex', gap: '8px', fontSize: 16 }}>
                            <RotateAnimation isDisabled={step.status != 'pending'}>
                                {getListIcon(step.status)}
                            </RotateAnimation>
                            <Typography fontSize={16}>{step.title}</Typography>
                        </li>
                    ))}
                </Stack>
            </PageContainerFooter>
        </form>
    );
}
