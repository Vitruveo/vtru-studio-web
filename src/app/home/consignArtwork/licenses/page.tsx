'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { licenseThunk } from '@/features/asset/thunks';
import { useI18n } from '@/app/hooks/useI18n';
import { LicensesFormValues } from './types';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { ModalBackConfirm } from '../modalBackConfirm';
import Nft, { checkStepProgress } from './nft';
import Print from './print';
import Stream from './stream';
import Remix from './remix';
import { useToastr } from '@/app/hooks/useToastr';

const allLicenses = {
    NFT: Nft,
    Stream: Stream,
    Print: Print,
    Remix: Remix,
};

export default function Licenses() {
    const [currentLicense, setCurrentLicense] = useState<keyof typeof allLicenses>('NFT');
    const [showBackModal, setShowBackModal] = useState(false);
    const toast = useToastr();

    const { language } = useI18n();
    const router = useRouter();
    const dispatch = useDispatch();

    const { licenses: licensesState, formats } = useSelector((state) => state.asset);
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer);
    const formData = useSelector((state) => state.asset.assetMetadata?.context.formData);
    const selectPreviewAsset = Object.entries(formats).find(([key]) => key === 'print');
    const printExists = selectPreviewAsset && selectPreviewAsset[1].file;

    const allLicensesFiltered: Partial<Record<keyof typeof allLicenses, typeof Remix>> = printExists
        ? allLicenses
        : Object.fromEntries(Object.entries(allLicenses).filter(([key]) => key !== 'Print'));

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
        warning: language['studio.consignArtwork.licenses.warning'],
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

    const initialValues: LicensesFormValues = licensesState
        ? licensesState
        : {
              nft: {
                  version: '1',
                  added: true,
                  license: 'CC BY-NC-ND',
                  elastic: {
                      editionPrice: 0,
                      numberOfEditions: 0,
                      totalPrice: 0,
                      editionDiscount: false,
                  },
                  single: {
                      editionPrice: 150,
                  },
                  unlimited: {
                      editionPrice: 0,
                  },
                  editionOption: 'single',
                  availableLicenses: 1,
              },
              stream: {
                  version: '1',
                  added: true,
              },
              print: {
                  version: '1',
                  added: false,
                  unitPrice: 1,
                  availableLicenses: 1,
              },
              remix: {
                  version: '1',
                  added: false,
                  unitPrice: 1,
                  availableLicenses: 1,
              },
          };

    const { values, setFieldValue, handleSubmit, setFieldError, validateForm, handleChange } =
        useFormik<LicensesFormValues>({
            initialValues: initialValues,
            onSubmit: async () => {
                dispatch(licenseThunk(values));
                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'licenses',
                        status: checkStepProgress({ values }),
                    })
                );

                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/termsOfUse`);
            },
        });

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        if (hasContract) {
            router.push(`/home/consignArtwork`);
            return;
        }

        if (JSON.stringify(initialValues) === JSON.stringify(values)) {
            router.push(`/home/consignArtwork`);
        } else {
            setShowBackModal(true);
        }
    };

    const handleSaveData = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        if (hasContract) {
            router.push('/home/consignArtwork/termsOfUse');
            return;
        }

        if (values.nft.added && !values.nft.availableLicenses) {
            values.nft.availableLicenses = 1;
        }

        if (values.remix.added && !values.remix.availableLicenses) {
            toast.display({ type: 'error', message: 'The available field must be greater than 0 on REMIX' });
            return;
        }

        if (values.print.added && !values.print.availableLicenses) {
            toast.display({ type: 'error', message: 'The available field must be greater than 0 on PRINT' });
            return;
        }

        if (
            values.nft.availableLicenses < 1 ||
            values.remix.availableLicenses < 1 ||
            values.print.availableLicenses < 1
        ) {
            toast.display({ type: 'error', message: 'The available field must be greater than 0' });
            return;
        }

        const validate = await validateForm();
        if (validate && Object.values(validate).length === 0) {
            handleSubmit();
        } else {
            setShowBackModal(false);
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
                stepStatus={checkStepProgress({ values })}
                stepNumber={3}
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />

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

                        {Object.entries(allLicensesFiltered).map(([key, Component]) => (
                            <a key={key} href={`#${key}`} onClick={(e) => handleScrollToElement(e, key)}>
                                <Typography
                                    onClick={() => setCurrentLicense(key as keyof typeof allLicensesFiltered)}
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

                        {Object.values(allLicensesFiltered).map((License, i) => (
                            <Box key={i} id={Object.keys(allLicensesFiltered)[i]}>
                                <License
                                    allValues={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    setFieldError={setFieldError}
                                />
                            </Box>
                        ))}
                    </Grid>
                </Box>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
