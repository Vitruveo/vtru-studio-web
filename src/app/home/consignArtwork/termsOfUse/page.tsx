'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';

import { FormikErrors, useFormik } from 'formik';
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
import Head from 'next/head';
import { Contract } from './contract';

const BCrumb = [
    {
        to: '/home',
        title: 'Home',
    },
    {
        to: '/home/consignArtwork',
        title: 'Consign Artwork',
    },
    {
        title: 'Terms of Use',
    },
];

export default function ContractScreen() {
    const [showBackModal, setShowBackModal] = useState(false);
    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const router = useRouter();
    const dispatch = useDispatch();
    const { contract } = useSelector((state) => state.asset);

    const { values, errors, setFieldValue, validateForm, handleSubmit } = useFormik<TermsOfUseFormValues>({
        initialValues: {
            contract: contract || false,
        },
        validationSchema: TermsOfUseSchemaValidation,
        onSubmit: async (formValues) => {
            router.push(`/home/consignArtwork`);
        },
    });

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
        const validate = await validateForm();
        if (validate && Object.values(validate).length === 0) {
            handleSubmit();
        } else {
            setShowBackModal(false);
        }
    };

    useEffect(() => {
        dispatch(contractThunk({ contract: values.contract }));

        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'termsOfUse',
                status: values.contract ? 'completed' : 'inProgress',
            })
        );
    }, [values.contract]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Next"
                stepStatus={values.contract ? 'completed' : 'inProgress'}
                stepNumber={4}
                title="Consign Artwork"
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title="Consign Artwork" items={BCrumb} />
                <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                    Complete all tasks and publish your artwork
                </Typography>
                <Container>
                    <Box
                        mt={4}
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        maxHeight={400}
                        padding={2}
                        style={{
                            textAlign: 'justify',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                        }}
                    >
                        <Contract />
                    </Box>
                    {/* <Typography my={1} color="error">
                    {errors.contract}
                </Typography> */}
                    <Box textAlign="right" mt={4} mb={2}>
                        <Button
                            variant="contained"
                            color={values.contract ? 'success' : 'primary'}
                            onClick={handleChangeContract}
                            disabled={!scrolledToBottom && !values.contract}
                        >
                            {values.contract
                                ? 'Contract accepted'
                                : scrolledToBottom
                                  ? 'Accept Contract'
                                  : 'Scroll to the End'}
                        </Button>
                    </Box>
                </Container>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
