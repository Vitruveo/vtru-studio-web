'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, Button, MenuItem, Theme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from '@/store/hooks';
import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { licenseThunk } from '@/features/asset/thunks';
import { useI18n } from '@/app/hooks/useI18n';
import { TranslateFunction } from '@/i18n/types';

import { LicensesFormValues } from './types';
import MetadataFields from '../components/metadataFields';
import { licenseMetadataDefinitionsSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { licenses } from '../mock';
import { ModalBackConfirm } from '../modalBackConfirm';

import Nft from './nft';
import Print from './print';
import Stream from './stream';
import Remix from './remix';

type YupErrors = {
    [key: string]: string;
};

type Result = {
    [key: string]: any;
};

const allLicenses = {
    NFT: Nft,
    Stream: Stream,
    Print: Print,
    Remix: Remix,
};

export default function Licenses() {
    const [currentLicense, setCurrentLicense] = useState<keyof typeof allLicenses>('NFT');
    const [showBackModal, setShowBackModal] = useState(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { language } = useI18n();
    const router = useRouter();
    const dispatch = useDispatch();
    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    const { licenses: licensesState } = useSelector((state) => state.asset);

    const texts = {
        nextButton: language['studio.consignArtwork.form.next.button'],
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        licensesTitle: language['studio.consignArtwork.licenses.title'],
        licensesDescription: language['studio.consignArtwork.licenses.description'],
        oneLicenseError: language['studio.consignArtwork.licenses.oneLicense.error'],
        fillFieldsError: language['studio.consignArtwork.licenses.fillFields.error'],
        alreadyAdded: language['studio.consignArtwork.licenses.alreadyAdded'],
        deleteButton: language['studio.consignArtwork.licenses.delete.button'],
        addButton: language['studio.consignArtwork.licenses.add.button'],
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
            title: texts.licensesTitle,
        },
    ];

    const initialValues = useMemo(
        () =>
            licensesState
                ? licensesState
                : {
                      nft: {
                          version: '1',
                          added: false,
                          license: '',
                          elastic: {
                              editionPrice: 0,
                              numberOfEditions: 0,
                              totalPrice: 0,
                              editionDiscount: false,
                          },
                          single: {
                              editionPrice: 0,
                          },
                          unlimited: {
                              editionPrice: 0,
                          },

                          editionOption: '',
                      },
                      stream: {
                          version: '1',
                          added: false,
                      },
                      print: {
                          version: '1',
                          added: false,

                          unitPrice: 0,
                      },
                      remix: {
                          version: '1',
                          added: false,
                          unitPrice: 0,
                      },
                  },

        []
    );

    const { values, errors, setFieldValue, handleSubmit, setErrors, setFieldError, validateForm, handleChange } =
        useFormik<LicensesFormValues>({
            initialValues: initialValues,
            onSubmit: async (formValues) => {
                dispatch(licenseThunk(values));
                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'licenses',
                        status: Object.values(values).filter((v) => v?.added).length ? 'completed' : 'inProgress',
                    })
                );

                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/termsOfUse`);
            },
        });

    const licensesAdded = Object.values(values).filter((v) => v?.added);

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
        if (JSON.stringify(initialValues) === JSON.stringify(values)) {
            router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/termsOfUse`);
        } else {
            const validate = await validateForm();
            if (validate && Object.values(validate).length === 0) {
                handleSubmit();
            } else {
                setShowBackModal(false);
            }
        }
    };

    const handleScrollToElement = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, key: string) => {
        event.preventDefault();
        const element = document.getElementById(key);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <form onSubmit={handleSaveData}>
            <PageContainerFooter
                submitText={texts.nextButton}
                title={texts.consignArtworkTitle}
                stepStatus={licensesAdded.length > 0 ? 'completed' : 'inProgress'}
                stepNumber={3}
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Box marginBottom={10}>
                    <Box
                        paddingBottom={1}
                        position="sticky"
                        top={0}
                        bgcolor="white"
                        zIndex={10}
                        alignItems="center"
                        gap={2}
                        display="flex"
                    >
                        <Typography marginRight={1} fontSize="1.2rem" fontWeight="500">
                            {texts.licensesTitle}
                        </Typography>
                        {Object.entries(allLicenses).map(([key, Component]) => (
                            <a key={key} href={`#${key}`} onClick={(e) => handleScrollToElement(e, key)}>
                                <Typography
                                    onClick={() => setCurrentLicense(key as keyof typeof allLicenses)}
                                    style={{ color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}
                                    fontSize="1.1rem"
                                >
                                    {key}
                                </Typography>
                            </a>
                        ))}
                    </Box>

                    <Grid mt={1} sx={{ overflowX: 'auto' }} alignItems="center" lg={6} xs={12}>
                        <Typography fontSize="1.1rem" fontWeight="normal" color="GrayText">
                            {texts.licensesDescription}
                        </Typography>

                        {Object.values(allLicenses).map((License, i) => (
                            <Box key={i} id={Object.keys(allLicenses)[i]}>
                                <License
                                    allValues={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    setFieldError={setFieldError}
                                />
                            </Box>
                        ))}

                        <CustomizedSnackbar
                            type={toastr.type}
                            open={toastr.open}
                            message={toastr.message}
                            setOpentate={setToastr}
                        />
                    </Grid>
                </Box>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
