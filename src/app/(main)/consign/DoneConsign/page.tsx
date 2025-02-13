'use client';

import React, { useEffect, useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import { RotateAnimation } from '@/animations/RotateAnimation';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '../../layout/shared/breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import { confetti } from '@tsparticles/confetti';
import { useDispatch, useSelector } from '@/store/hooks';
import { useToastr } from '@/app/hooks/useToastr';
import AssetMediaPreview from '../components/assetMediaPreview';
import { CONSIGN_STATUS_MAP, consignThunk } from '@/features/asset/thunks';

type Status = undefined | 'completed' | 'pending' | 'done' | 'failed' | 'running' | 'finished';

interface ConsignStep {
    check: {
        status: Status;
        title: string;
    };
    c2pa: {
        status: Status;
        title: string;
    };
    ipfs: {
        status: Status;
        title: string;
    };
    contractExplorer: {
        status: Status;
        title: string;
    };
}

const getListIcon = (status: ConsignStep[keyof ConsignStep]['status']) => {
    switch (status) {
        case 'completed':
            return '✔';
        case 'pending':
        case 'running':
            return '⏳';
        case 'finished':
        case 'done':
            return '🎉';
        case 'failed':
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
        to: '/consign',
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

const initialSteps = {
    check: {
        status: undefined,
        title: 'Checking artwork files',
    },
    c2pa: {
        status: undefined,
        title: 'Signing media files using C2PA standard',
    },
    ipfs: {
        status: undefined,
        title: 'Uploading media files to IPFS decentralized storage',
    },
    contractExplorer: {
        status: undefined,
        title: 'Consigning artwork to Vitruveo blockchain',
    },
};

export default function DoneConsign() {
    const router = useRouter();
    const dispatch = useDispatch();
    const toastr = useToastr();

    const asset = useSelector((state) => state.asset);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);

    const [steps, setSteps] = useState<ConsignStep>(initialSteps);

    const isCompleted = Object.values(steps).every((step) => step.status === 'completed');
    const hasError = asset.consign.status === CONSIGN_STATUS_MAP.failed;

    useEffect(() => {
        setSteps(initialSteps);
        dispatch(consignThunk(asset._id));
    }, []);

    useEffect(() => {
        if (isCompleted) {
            showConfetti();
        }
    }, [isCompleted]);

    useEffect(() => {
        if (!steps.check.status && asset.consign.steps.check) {
            setSteps((prevStep) => ({
                ...prevStep,
                check: {
                    ...prevStep.check,
                    status: 'completed',
                },
            }));
        }

        if (!steps.c2pa.status && asset.consign.steps.c2pa) {
            setSteps((prevStep) => ({
                ...prevStep,
                c2pa: {
                    ...prevStep.c2pa,
                    status: 'completed',
                },
            }));
        }

        if (!steps.ipfs.status && asset.consign.steps.ipfs) {
            setSteps((prevStep) => ({
                ...prevStep,
                ipfs: {
                    ...prevStep.ipfs,
                    status: 'completed',
                },
            }));
        }

        if (!steps.contractExplorer.status && asset.consign.steps.contractExplorer) {
            setSteps((prevStep) => ({
                ...prevStep,
                contractExplorer: {
                    ...prevStep.contractExplorer,
                    status: 'completed',
                },
            }));
        }
    }, [asset.consign.steps, steps]);

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();

            router.push('/consign');
        } catch (error) {
            toastr.display({ message: 'Error updating consign artwork status', type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText={'Done'}
                title={'Consign Artwork'}
                submitDisabled={!isCompleted || hasError}
                hasBackButton={hasError ? true : false}
            >
                <Breadcrumb
                    title={'Consign Artwork'}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />

                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Stack component="ul" spacing={1}>
                            {Object.values(steps).map((step, index) => (
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
                        <Stack
                            style={{
                                display: 'flex',
                                gap: '12px',
                                fontSize: 16,
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}
                        >
                            <RotateAnimation
                                isDisabled={asset.consign.status !== 'pending' && asset.consign.status !== 'running'}
                            >
                                {getListIcon(asset.consign.status as ConsignStep[keyof ConsignStep]['status'])}{' '}
                            </RotateAnimation>{' '}
                            <Typography
                                variant="h6"
                                component="h2"
                                style={{
                                    wordBreak: 'break-all',
                                }}
                            >
                                {asset.consign.message}
                            </Typography>
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
