'use client';
import React, { useState, useRef, useCallback, useMemo } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Container, Typography, Button, Theme, useMediaQuery } from '@mui/material';

import { TermsOfUseFormValues } from './types';

import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { contractThunk } from '@/features/asset/thunks';
import { useRouter } from 'next/navigation';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import contracts from './contract';

export default function ContractScreen() {
    const [showBackModal, setShowBackModal] = useState(false);
    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const { language } = useI18n();
    const router = useRouter();
    const dispatch = useDispatch();

    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));
    const currentLanguage = useSelector((state) => state.customizer.currentLanguage);
    const { contract, isOriginal, generatedArtworkAI, notMintedOtherBlockchain } = useSelector((state) => state.asset);

    const Contract = contracts[currentLanguage] || contracts.default;

    const texts = {
        nextButton: language['studio.consignArtwork.form.next.button'],
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        termsOfUseTitle: language['studio.consignArtwork.termsOfUse.title'],
        termsOfUseDescription: language['studio.consignArtwork.termsOfUse.description'],
        isOriginal: language['studio.consignArtwork.termsOfUse.isOriginal'],
        generatedArtworkAI: language['studio.consignArtwork.termsOfUse.generatedArtworkAI'],
        notMintedOtherBlockchain: language['studio.consignArtwork.termsOfUse.notMintedOtherBlockchain'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/home/consignArtwork',
            title: texts.consignArtworkTitle,
        },
        {
            title: texts.termsOfUseTitle,
        },
    ];

    const initialValues = useMemo(
        () => ({
            isOriginal,
            generatedArtworkAI,
            notMintedOtherBlockchain,
            contract: contract || false,
        }),
        []
    );

    const { values, errors, setFieldValue, validateForm, handleSubmit } = useFormik<TermsOfUseFormValues>({
        initialValues,
        onSubmit: async (formValues) => {
            if (JSON.stringify(initialValues) === JSON.stringify(values)) {
                router.push(`/home/consignArtwork/auxiliaryMedia`);
            } else {
                dispatch(
                    contractThunk({
                        contract: values.contract,
                        isOriginal: values.isOriginal,
                        generatedArtworkAI: values.generatedArtworkAI,
                        notMintedOtherBlockchain: values.notMintedOtherBlockchain,
                    })
                );
                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'termsOfUse',
                        status:
                            values.contract &&
                            values.isOriginal &&
                            values.generatedArtworkAI &&
                            values.notMintedOtherBlockchain
                                ? 'completed'
                                : checkStatus,
                    })
                );
                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/auxiliaryMedia`);
            }
        },
    });

    const checkStatus =
        values.contract && values.isOriginal && values.generatedArtworkAI && values.notMintedOtherBlockchain
            ? 'completed'
            : 'inProgress';

    const handleScroll = useCallback(() => {
        const tolerance = 2;
        const scrollContainer = scrollContainerRef.current;

        if (
            scrollContainer &&
            Math.abs(scrollContainer.scrollTop + scrollContainer.clientHeight - scrollContainer.scrollHeight) <
                tolerance
        ) {
            setScrolledToBottom(true);
        } else {
            setScrolledToBottom(false);
        }
    }, []);

    const handleChangeContract = () => {
        setFieldValue('contract', !values.contract);
    };

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        if (JSON.stringify(initialValues) === JSON.stringify(values)) {
            router.push(`/home/consignArtwork`);
        } else {
            setShowBackModal(true);
        }
    };

    const handleSaveData = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText={texts.nextButton}
                stepStatus={checkStatus}
                stepNumber={4}
                title={texts.consignArtworkTitle}
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Box marginBottom={lgUp ? 0 : 8}>
                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                        {texts.termsOfUseTitle}
                    </Typography>
                    <Typography fontSize="1.1rem" fontWeight="normal" color="GrayText" marginBottom={2}>
                        {texts.termsOfUseDescription}
                    </Typography>
                    <Box
                        mt={4}
                        marginBottom={3}
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        maxHeight={290}
                        padding={1}
                        style={{
                            textAlign: 'justify',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                        }}
                    >
                        <Contract />
                    </Box>
                    <Box marginBlock={2} alignItems="flex-start" display="flex">
                        <CustomCheckbox
                            sx={{ padding: 0, marginRight: 1, marginTop: 0.5 }}
                            checked={values.isOriginal}
                            onChange={(event) => setFieldValue('isOriginal', event.target.checked)}
                        />
                        <Typography sx={{ padding: 0 }}>{texts.isOriginal}</Typography>
                    </Box>
                    <Box marginBlock={2} alignItems="flex-start" display="flex">
                        <CustomCheckbox
                            sx={{ padding: 0, marginRight: 1, marginTop: 0.5 }}
                            checked={values.generatedArtworkAI}
                            onChange={(event) => setFieldValue('generatedArtworkAI', event.target.checked)}
                        />
                        <Typography>{texts.generatedArtworkAI}</Typography>
                    </Box>
                    <Box marginBlock={2} alignItems="flex-start" display="flex">
                        <CustomCheckbox
                            sx={{ padding: 0, marginRight: 1, marginTop: 0.5 }}
                            checked={values.notMintedOtherBlockchain}
                            onChange={(event) => setFieldValue('notMintedOtherBlockchain', event.target.checked)}
                        />
                        <Typography>{texts.notMintedOtherBlockchain}</Typography>
                    </Box>
                    <Box textAlign="right" mt={2} mb={2}>
                        <Button
                            variant="contained"
                            color={values.contract ? 'success' : 'primary'}
                            onClick={handleChangeContract}
                            disabled={!scrolledToBottom && !values.contract}
                        >
                            {(language['studio.consignArtwork.termsOfUse.accept.button'] as TranslateFunction)({
                                contract: values.contract,
                                scrolledToBottom,
                            })}
                        </Button>
                    </Box>
                </Box>

                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
