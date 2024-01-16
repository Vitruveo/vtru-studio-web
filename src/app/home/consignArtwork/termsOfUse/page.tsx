'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Container, Typography, Button } from '@mui/material';

import { TermsOfUseFormValues } from './types';

import { TermsOfUseSchemaValidation } from './formschema';
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

    const { values, errors, setFieldValue, validateForm, handleSubmit } = useFormik<TermsOfUseFormValues>({
        initialValues: {
            isOriginal,
            generatedArtworkAI,
            notMintedOtherBlockchain,
            contract: contract || false,
        },
        validationSchema: TermsOfUseSchemaValidation,
        onSubmit: async (formValues) => {
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
            router.push(`/home/consignArtwork`);
        },
    });

    const checkStatus =
        values.contract && values.isOriginal && values.generatedArtworkAI && values.notMintedOtherBlockchain
            ? 'completed'
            : 'inProgress';

    const handleScroll = useCallback(() => {
        const tolerance = 1;
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
        setShowBackModal(true);
    };

    const handleSaveData = async () => {
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
                <Typography fontSize="1rem" fontWeight="normal" color="GrayText" marginBottom={2}>
                    {texts.termsOfUseDescription}
                </Typography>
                <Box alignItems="center" display="flex">
                    <CustomCheckbox
                        checked={values.isOriginal}
                        onChange={(event) => setFieldValue('isOriginal', event.target.checked)}
                    />
                    <Typography>{texts.isOriginal}</Typography>
                </Box>
                <Box alignItems="center" display="flex">
                    <CustomCheckbox
                        checked={values.generatedArtworkAI}
                        onChange={(event) => setFieldValue('generatedArtworkAI', event.target.checked)}
                    />
                    <Typography>{texts.generatedArtworkAI}</Typography>
                </Box>
                <Box alignItems="center" display="flex">
                    <CustomCheckbox
                        checked={values.notMintedOtherBlockchain}
                        onChange={(event) => setFieldValue('notMintedOtherBlockchain', event.target.checked)}
                    />
                    <Typography>{texts.notMintedOtherBlockchain}</Typography>
                </Box>
                <Container>
                    <Box
                        mt={4}
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        maxHeight={300}
                        padding={2}
                        style={{
                            textAlign: 'justify',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                        }}
                    >
                        <Contract />
                    </Box>
                    <Box textAlign="right" mt={4} mb={2}>
                        <Button
                            variant="contained"
                            color={values.contract ? 'success' : 'primary'}
                            onClick={handleChangeContract}
                            disabled={!scrolledToBottom && !values.contract}
                        >
                            {(language['studio.consignArtwork.termsOfUse.accept.button'] as TranslateFunction)({
                                contract,
                                scrolledToBottom,
                            })}
                        </Button>
                    </Box>
                </Container>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
