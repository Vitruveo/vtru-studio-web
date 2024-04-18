'use client';

import React, { useEffect, useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import { RotateAnimation } from '@/animations/RotateAnimation';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '../../layout/shared/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import { confetti } from '@tsparticles/confetti';
import { useDispatch, useSelector } from '@/store/hooks';
import { consignArtworkThunks } from '@/features/consignArtwork/thunks';
import { useToastr } from '@/app/hooks/useToastr';
import AssetMediaPreview from '../components/assetMediaPreview';
import { createContractThunk, signingMediaC2PAThunk, uploadIPFSByAssetIdThunk } from '@/features/asset/thunks';

interface ConsignStep {
    title: string;
    status?: 'completed' | 'pending' | 'done' | 'error';
    action: () => Promise<any>;
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

const showConfetti = () => {
    confetti({
        particleCount: 500,
        spread: 250,
        origin: { x: 0.5, y: 0.5 },
    });
};

export default function DoneConsign() {
    const router = useRouter();
    const dispatch = useDispatch();
    const toastr = useToastr();

    const token = useSelector((state) => state.user.token);
    const username = useSelector((state) => state.user.username);
    const filename = useSelector((state) => state.asset.formats.original.path) || '';
    const assetId = useSelector((state) => state.asset._id);

    const asyncAction = async () => {
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 5000)));
    };

    const [steps, setSteps] = useState<ConsignStep[]>([
        {
            title: 'Signing media files using C2PA standard',
            action: () => dispatch(signingMediaC2PAThunk({ filename, token, creator: username })),
        },
        {
            title: 'Uploading media files to IPFS decentralized storage',
            action: () => dispatch(uploadIPFSByAssetIdThunk({ id: assetId })),
        },
        {
            title: 'Consigning artwork to Vitruveo blockchain',
            action: () => dispatch(createContractThunk({ id: assetId })),
        },
        {
            title: 'Your artwork is ready!',
            action: async () => asyncAction().then(() => showConfetti()),
        },
    ]);

    const changeStepStatus = (index: number, status: ConsignStep['status']) => {
        steps[index].status = status;
        setSteps([...steps]);
    };

    useEffect(() => {
        const runSteps = async () => {
            if (!assetId) {
                toastr.display({ message: 'Asset not found', type: 'error' });
                return;
            }

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
                    toastr.display({ message: `Error on step ${stepIndex + 1}`, type: 'error' });
                    break;
                }
            }
        };
        runSteps();
    }, []);

    const isDisabled = steps[steps.length - 1].status != 'done';

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            dispatch(consignArtworkThunks.updateStatus('active'));
            router.push('/home/consignArtwork');
        } catch (error) {
            toastr.display({ message: 'Error updating consign artwork status', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Done"
                title={'Consign Artwork'}
                submitDisabled={isDisabled}
                hasBackButton={false}
            >
                <Breadcrumb title={'Consign Artwork'} items={BCrumb} />

                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Stack component="ul" spacing={1}>
                            {steps.map((step, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '16px 1fr',
                                        gap: '12px',
                                        fontSize: 16,
                                    }}
                                >
                                    <RotateAnimation isDisabled={step.status != 'pending'}>
                                        {getListIcon(step.status)}
                                    </RotateAnimation>
                                    <Typography fontSize={20}>{step.title}</Typography>
                                </li>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item lg={6}>
                        <AssetMediaPreview />
                    </Grid>
                </Grid>
            </PageContainerFooter>
        </form>
    );
}
