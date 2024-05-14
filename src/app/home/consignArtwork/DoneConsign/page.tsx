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
import { consignThunk } from '@/features/asset/thunks';
import { updateAssetStep } from '@/features/asset/requests';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { assetActionsCreators } from '@/features/asset/slice';
import { ConsignArtworkSteps } from '@/features/asset/types';

interface ConsignStep {
    id?: ConsignArtworkSteps;
    title: string;
    status?: 'completed' | 'pending' | 'done' | 'error';
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
    const router = useRouter();
    const dispatch = useDispatch();
    const toastr = useToastr();

    const web3 = useSelector((state) => state.asset.web3);

    const asset = useSelector((state) => state.asset);

    const [retry, setRetry] = useState(false);

    const [steps, setSteps] = useState<ConsignStep[]>([
        {
            id: 'c2pa',
            status: asset.c2pa?.finishedAt ? 'completed' : undefined,
            title: 'Signing media files using C2PA standard',
        },
        {
            id: 'ipfs',
            status: asset.ipfs?.finishedAt ? 'completed' : undefined,
            title: 'Uploading media files to IPFS decentralized storage',
        },
        {
            id: 'consign',
            status: asset.contractExplorer?.finishedAt ? 'completed' : undefined,
            title: 'Consigning artwork to Vitruveo blockchain',
        },
    ]);

    const changeStepStatus = (index: number, status: ConsignStep['status']) => {
        steps[index].status = status;
        setSteps([...steps]);
    };

    useEffect(() => {
        dispatch(consignThunk());
        changeStepStatus(0, 'pending');
    }, []);

    useEffect(() => {
        const hasError = Object.values(web3).some((item) => item.error);
        if (hasError) {
            const itemError = Object.entries(web3).find(([_, value]) => value.error);
            if (itemError) {
                const index = steps.findIndex((step) => step.id === itemError[0]);
                if (index !== -1) {
                    changeStepStatus(index, 'error');
                }
            }

            return;
        }

        if (web3.c2pa.finishedAt) {
            changeStepStatus(0, 'completed');
            changeStepStatus(1, 'pending');
        }
        if (web3.ipfs.finishedAt) {
            changeStepStatus(1, 'completed');
            changeStepStatus(2, 'pending');
        }
        if (web3.consign.finishedAt) {
            changeStepStatus(2, 'completed');
        }

        if (Object.values(web3).every((item) => item.finishedAt) && steps[steps.length - 1].status !== 'done') {
            confetti({
                particleCount: 500,
                spread: 250,
                origin: { x: 0.5, y: 0.5 },
            });
            changeStepStatus(steps.length - 1, 'done');
        }
    }, [web3]);

    useEffect(() => {
        if (retry) {
            dispatch(assetActionsCreators.resetConsign());
            setRetry(false);
            dispatch(consignThunk());
            changeStepStatus(0, 'pending');
        }
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
                                        display: 'flex',
                                        gap: '12px',
                                        fontSize: 16,
                                        alignItems: 'flex-start',
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
