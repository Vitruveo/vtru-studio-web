'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Button, Grid, Radio, RadioGroup, Typography } from '@mui/material';

import Box from '@mui/material/Box';

import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import { publishThunk } from '@/features/asset/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';
import { ConsignmentStatusCard } from './card';
import WarningCard from '../components/warningCard';

const ConsignArtwork = () => {
    const [showInfo, setShowInfo] = useState(true);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const assetStatus = useSelector((state) => state.asset.status);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);

    const checkStatus = assetStatus === 'draft' ? 'Draft' : 'Preview';

    const [statusRadio, setStatusRadio] = useState(checkStatus);

    const router = useRouter();

    const { language } = useI18n();

    const dispatch = useDispatch();

    const texts = {
        consignArtworkTitle: language['studio.consignArtwork.title'],
        homeTitle: language['studio.home.title'],
        message: language['studio.consignArtwork.consignmentStatus.message'],
        title: language['studio.consignArtwork.consignmentStatus.title'],
        description: language['studio.consignArtwork.consignmentStatus.description'],
        yes: language['studio.consignArtwork.consignmentStatus.yes'],
        no: language['studio.consignArtwork.consignmentStatus.no'],
        edit: language['studio.consignArtwork.consignmentStatus.edit'],
        view: language['studio.consignArtwork.consignmentStatus.view'],
        search: language['studio.consignArtwork.consignmentStatus.search'],
        license: language['studio.consignArtwork.consignmentStatus.license'],
        draftTitle: language['studio.consignArtwork.consignmentStatus.draft.title'],
        previewTitle: language['studio.consignArtwork.consignmentStatus.preview.title'],
        activateTitle: language['studio.consignArtwork.consignmentStatus.activate.title'],
        activationTitle: language['studio.consignArtwork.consignmentStatus.activation.title'],
        activationDescription: language['studio.consignArtwork.consignmentStatus.activation.description'],
        creatorCreditsRequired: language['studio.consignArtwork.consignmentStatus.creatorCreditsRequired'],
        creatorCreditsAvailable: language['studio.consignArtwork.consignmentStatus.creatorCreditsAvailable'],
        viewArtworkButton: language['studio.consignArtwork.consignmentStatus.viewArtwork.button'],
        warning: language['studio.consignArtwork.consignmentStatus.warning'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/consign',
            title: texts.consignArtworkTitle,
        },
        {
            title: texts.title,
        },
    ];

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        setToastr({ message: texts.message, open: true, type: 'info' });
    };

    const status = [
        {
            search: false,
            license: false,
            title: texts.draftTitle,
            edit: true,
            view: false,
            backgroundColor: '#EEEEEE',
            type: 'radio',
        },
        {
            search: true,
            license: false,
            title: texts.previewTitle,
            edit: false,
            view: true,
            backgroundColor: '#FFF2CC',
            type: 'radio',
        },
        {
            search: true,
            license: true,
            title: texts.activateTitle,
            edit: false,
            view: true,
            backgroundColor: '#D9EAD3',
            type: 'button',
        },
    ];

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusRadio(e.target.value);
        if (e.target.value === 'Draft') {
            dispatch(publishThunk({ status: 'draft' }));
        }
        if (e.target.value === 'Preview') {
            dispatch(publishThunk({ status: 'preview' }));
        }
    };

    const handleOpenBackModal = () => {
        if (statusRadio === 'Draft') {
            router.push(`/consign`);
        }
        if (statusRadio === 'Preview') {
            router.push(`/home`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitDisabled={statusRadio === 'Draft'}
                backOnclick={handleOpenBackModal}
                stepNumber={6}
                title={texts.consignArtworkTitle}
                submitText={texts.viewArtworkButton}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />
                <Grid marginBottom={10} item xs={12} lg={6}>
                    <Typography marginBottom={2} marginRight={1} fontSize="1.2rem" fontWeight="500">
                        {texts.title}
                    </Typography>
                    <Box marginTop={2}>
                        <Typography marginBottom={2} fontSize="1.1rem" fontWeight="normal" color="GrayText">
                            🎉 {texts.description}
                        </Typography>
                    </Box>
                    {showInfo && (
                        <WarningCard setShowInfo={setShowInfo}>
                            <Typography fontSize="0.9">{texts.warning}</Typography>
                        </WarningCard>
                    )}
                    <Box gap={3} display="flex" p={2} marginTop={1}>
                        <RadioGroup aria-label="options" value={statusRadio} onChange={handleRadioChange}>
                            <Grid alignItems="center" spacing={2} container>
                                {Object.values(status).map((v, i) => (
                                    <Grid key={i} item width={180}>
                                        {v.type === 'radio' ? (
                                            <Box marginBottom={1} alignItems="center" display="flex">
                                                <Box marginRight={1}>
                                                    <Radio sx={{ padding: 0 }} value={v.title} size="medium" />
                                                </Box>
                                                <Typography style={{ textTransform: 'uppercase' }}>
                                                    {v.title}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box
                                                marginInline={2}
                                                marginBottom={1}
                                                display="flex"
                                                justifyContent="center"
                                            >
                                                <Button fullWidth disabled size="small" variant="contained">
                                                    {texts.activateTitle}
                                                </Button>
                                            </Box>
                                        )}
                                        <ConsignmentStatusCard
                                            backgroundColor={v.backgroundColor}
                                            edit={v.edit}
                                            license={v.license}
                                            search={v.search}
                                            view={v.view}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                        <Box marginTop={2}>
                            <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                                {texts.activationTitle}
                            </Typography>

                            <Typography marginTop={6} color="gray" fontSize="1rem" fontWeight="bold">
                                {texts.creatorCreditsRequired}:
                            </Typography>
                            <Typography color="gray" fontSize="1rem" fontWeight="bold">
                                1
                            </Typography>

                            <Typography marginTop={3} color="gray" fontSize="1rem" fontWeight="bold">
                                {texts.creatorCreditsAvailable}:
                            </Typography>
                            <Typography color="gray" fontSize="1rem" fontWeight="bold">
                                0
                            </Typography>
                        </Box>
                    </Box>

                    <CustomizedSnackbar
                        type={toastr.type}
                        open={toastr.open}
                        message={toastr.message}
                        setOpentate={setToastr}
                    />
                </Grid>
            </PageContainerFooter>
        </form>
    );
};

export default ConsignArtwork;
