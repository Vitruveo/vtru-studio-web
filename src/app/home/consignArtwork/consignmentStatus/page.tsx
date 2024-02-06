'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import Box from '@mui/material/Box';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import { StepId, StepStatus } from '@/features/consignArtwork/types';
import { publishThunk } from '@/features/asset/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import { ConsignmentStatusCard } from './card';

const ConsignArtwork = () => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [statusRadio, setStatusRadio] = useState('Draft');

    const pathname = usePathname();
    const router = useRouter();

    const { language } = useI18n();

    const theme = useTheme();
    const dispatch = useDispatch();

    const { completedSteps } = useSelector((state) => state.consignArtwork);

    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

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
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            title: texts.title,
        },
    ];

    const handleChangePage = (page: StepId, stepStatus: StepStatus) => {
        router.push(`${pathname}/${page}`);
    };

    const handleSubmit = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        dispatch(publishThunk({ status: 'published' }));
        setToastr({
            type: 'info',
            open: true,
            message: texts.message,
        });
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitDisabled={statusRadio === 'Draft'}
                stepNumber={6}
                title={texts.consignArtworkTitle}
                submitText={texts.viewArtworkButton}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Grid marginBottom={10} item xs={12} lg={6}>
                    <Box marginBottom={3}>
                        <Typography variant="h6" fontWeight="normal" color="GrayText">
                            🎉 {texts.description}
                        </Typography>
                    </Box>
                    <Typography marginRight={1} fontSize="1.2rem" fontWeight="500">
                        {texts.title}
                    </Typography>
                    <Box gap={3} display="flex" p={2} marginTop={1}>
                        <RadioGroup aria-label="options" value={statusRadio} onChange={handleRadioChange}>
                            <Grid alignItems="center" spacing={2} container>
                                {Object.values(status).map((v, i) => (
                                    <Grid key={i} item width={180}>
                                        {v.type === 'radio' ? (
                                            <Box marginBottom={1} alignItems="center" display="flex">
                                                <Box>
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
