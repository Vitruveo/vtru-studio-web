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
import {
    createContractThunk,
    signingMediaC2PAThunk,
    updateConsignArtworkStepThunk,
    uploadIPFSByAssetIdThunk,
} from '@/features/asset/thunks';
import { updateAssetStep } from '@/features/asset/requests';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { ConsignArtworkSteps } from '@/features/asset/types';

interface ConsignStep {
    id?: ConsignArtworkSteps;
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

    const asset = useSelector((state) => state.asset);
    const assetId = asset._id;

    const asyncAction = async () => {
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 5000)));
    };
    const [retry, setRetry] = useState(false);

    const [steps, setSteps] = useState<ConsignStep[]>([
        {
            id: 'c2pa',
            status: asset.c2pa?.finishedAt ? 'done' : undefined,
            title: 'Signing media files using C2PA standard',
            action: () => dispatch(signingMediaC2PAThunk({ filename, token, creator: username })),
        },
        {
            id: 'ipfs',
            status: asset.ipfs?.finishedAt ? 'done' : undefined,
            title: 'Uploading media files to IPFS decentralized storage',
            action: () => dispatch(uploadIPFSByAssetIdThunk({ id: assetId })),
        },
        {
            id: 'contractExplorer',
            status: asset.contractExplorer?.finishedAt ? 'done' : undefined,
            title: 'Consigning artwork to Vitruveo blockchain',
            action: () => dispatch(createContractThunk({ id: assetId })),
        },
        {
            title: 'Your artwork is ready!',
            status:
                asset.c2pa?.finishedAt && asset.ipfs?.finishedAt && asset.contractExplorer?.finishedAt
                    ? 'completed'
                    : undefined,
            action: async () => asyncAction().then(() => showConfetti()),
        },
    ]);

    const changeStepStatus = (index: number, status: ConsignStep['status']) => {
        steps[index].status = status;
        setSteps([...steps]);
    };

    const runSteps = async () => {
        setRetry(false);

        if (!assetId) {
            toastr.display({ message: 'Asset not found', type: 'error' });
            return;
        }

        if (steps.filter((v) => v.id).every((step) => step.status === 'done')) return;

        for await (const step of steps) {
            if (step.status === 'done') continue;
            const stepIndex = steps.indexOf(step);
            const isLastStep = stepIndex === steps.length - 1;

            changeStepStatus(stepIndex, 'pending');

            try {
                await step.action();
                isLastStep ? changeStepStatus(stepIndex, 'done') : changeStepStatus(stepIndex, 'completed');
                if (step.id) dispatch(updateConsignArtworkStepThunk({ stepName: step.id }));
                setSteps([...steps]);
            } catch (error) {
                step.status = 'error';
                toastr.display({ message: `Error on step ${stepIndex + 1}`, type: 'error' });
                break;
            }
        }
    };

    useEffect(() => {
        runSteps();
    }, []);

    useEffect(() => {
        if (retry) runSteps();
    }, [retry]);

    const isDisabled = steps[steps.length - 1].status != 'done';

    const hasError = steps.some((step) => step.status === 'error');

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();

            if (hasError) {
                setSteps((prevState) =>
                    prevState.map((step) => {
                        delete step.status;
                        return step;
                    })
                );
                setRetry(true);
                return;
            }

            dispatch(consignArtworkThunks.updateStatus('active'));
            await updateAssetStep({
                stepName: 'consignArtworkListing',
                consignArtwork: {
                    listing: new Date().toISOString(),
                },
            });
            dispatch(
                consignArtworkActionsCreators.changePreviewAndConsign({
                    artworkListing: {
                        checked: true,
                    },
                })
            );
            router.push('/home/consignArtwork');
        } catch (error) {
            toastr.display({ message: 'Error updating consign artwork status', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText={hasError ? 'Retry' : 'Done'}
                title={'Consign Artwork'}
                submitDisabled={hasError ? false : isDisabled}
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
