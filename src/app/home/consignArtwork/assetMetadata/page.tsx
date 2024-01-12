'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';

import { StepsFormValues } from '../types';
import CustomSelect from '@/app/home/components/forms/theme-elements/CustomSelect';
import MetadataFields from '../components/metadataFields';

import { AssetMetadataFormErros, AssetMetadataFormValues } from './types';
import { assetSelector } from '@/features/asset';
import { AssetMetadataSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { assetMetadataDefinitions, assetMetadataDomains } from '../mock';
import { assetMetadataThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { ModalBackConfirm } from '../modalBackConfirm';

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
        title: 'Asset Metadata',
    },
];

export default function AssetMetadata() {
    const [showBackModal, setShowBackModal] = useState(false);

    const { assetMetadata } = useSelector((state) => state.asset);
    const { status } = useSelector((state) => state.consignArtwork.completedSteps['assetMetadata']);

    const router = useRouter();
    const dispatch = useDispatch();

    const { values, errors, setFieldValue, handleSubmit, validateForm } = useFormik<AssetMetadataFormValues>({
        initialValues: {
            assetMetadata: {
                assetMetadataDomains: assetMetadataDomains,
                assetMetadataDefinitions: assetMetadata?.assetMetadataDefinitions.length
                    ? assetMetadata.assetMetadataDefinitions
                    : assetMetadataDefinitions,
            },
        },
        validateOnChange: false,
        validationSchema: AssetMetadataSchemaValidation,
        onSubmit: async (formValues) => {
            await validateForm();

            dispatch(assetMetadataThunk({ assetMetadata: values.assetMetadata }));
            dispatch(
                consignArtworkActionsCreators.changeStatusStep({
                    stepId: 'assetMetadata',
                    status: 'completed',
                })
            );
            router.push(`/home/consignArtwork/licenses`);
        },
    });

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
        (async () => {
            if (assetMetadata?.assetMetadataDefinitions.length) {
                const isValid = await validateForm();
                if (isValid && Object.values(isValid).length === 0)
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'assetMetadata',
                            status: 'completed',
                        })
                    );
                else {
                    dispatch(
                        consignArtworkActionsCreators.changeStatusStep({
                            stepId: 'assetMetadata',
                            status: 'inProgress',
                        })
                    );
                }
            }
        })();
    }, [assetMetadata?.assetMetadataDefinitions.length]);

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter
                submitText="Next"
                stepStatus={status}
                stepNumber={2}
                title="Consign Artwork"
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title="Consign Artwork" items={BCrumb} />
                <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                    Complete all tasks and publish your artwork
                </Typography>
                <Box maxHeight={500} overflow="auto" mt={1} alignItems="center" maxWidth={500}>
                    <MetadataFields
                        formkFieldPathChange="assetMetadata.assetMetadataDefinitions"
                        values={values}
                        errors={errors}
                        metadataDefinitions={values.assetMetadata?.assetMetadataDefinitions}
                        setFieldValue={setFieldValue}
                    />
                </Box>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
