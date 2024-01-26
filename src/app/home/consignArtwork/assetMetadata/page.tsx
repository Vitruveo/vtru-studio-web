'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';

import { AssetMetadataFormValues } from './types';
import { AssetMetadataSchemaValidation } from './formschema';
import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { assetMetadataDefinitions, assetMetadataDomains } from '../mock';
import { assetMetadataThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';

import Section, { SectionOnChangeParams } from './section';
import { ErrorSchema, RJSFSchema } from '@rjsf/utils';
import { useAssetMetadataSchemas } from './useSchemas';

import ajv8Validator from '@rjsf/validator-ajv8';
import { TranslateFunction } from '@/i18n/types';

export type SectionName = 'section1';

export default function AssetMetadata() {
    const { sections: sectionsJSON } = useAssetMetadataSchemas();
    const { assetMetadata } = useSelector((state) => state.asset);

    type SectionsJSONType = typeof sectionsJSON;
    type SectionType = SectionsJSONType[keyof SectionsJSONType];

    type SectionFormatType = {
        [key in keyof SectionsJSONType]: Omit<SectionType, 'schema'> & { schema: RJSFSchema; errors: ErrorSchema<any> };
    };

    const sectionsFormat = Object.entries(sectionsJSON).reduce(
        (acc, [key, value]) => ({ ...acc, [key as keyof typeof sectionsJSON]: { ...value, errors: {} } }),
        {}
    ) as SectionFormatType;

    const [sections, setSections] = useState(sectionsFormat);
    const [showBackModal, setShowBackModal] = useState(false);

    const { status } = useSelector((state) => state.consignArtwork.completedSteps['assetMetadata']);

    const router = useRouter();
    const dispatch = useDispatch();

    const { language } = useI18n();

    const texts = {
        nextButton: language['studio.consignArtwork.form.next.button'],
        homeTitle: language['studio.home.title'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        assetMetadataTitle: language['studio.consignArtwork.stepName.assetMetadata'],
        assetMetadataDescription: language['studio.consignArtwork.assetMetadata.description'],
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
            title: texts.assetMetadataTitle,
        },
    ];

    const initialValues = useMemo(
        () => ({
            assetMetadata: {
                assetMetadataDomains: assetMetadataDomains,
                assetMetadataDefinitions: assetMetadata?.assetMetadataDefinitions.length
                    ? assetMetadata.assetMetadataDefinitions
                    : assetMetadataDefinitions,
            },
        }),
        []
    );

    const { values, setFieldValue, handleSubmit, validateForm } = useFormik<AssetMetadataFormValues>({
        initialValues,
        validateOnChange: false,
        validationSchema: AssetMetadataSchemaValidation,
        onSubmit: async (formValues) => {
            if (JSON.stringify(initialValues) === JSON.stringify(values))
                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/licenses`);
            else {
                await validateForm();

                dispatch(assetMetadataThunk({ assetMetadata: values.assetMetadata }));
                dispatch(
                    consignArtworkActionsCreators.changeStatusStep({
                        stepId: 'assetMetadata',
                        status: 'completed',
                    })
                );
                router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/licenses`);
            }
        },
    });

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

    const handleUpdateErrors = ({
        errors,
        sectionName,
    }: {
        errors: ErrorSchema<any>;
        sectionName: keyof typeof sections;
    }) => {
        setSections((prevSections) => ({ ...prevSections, [sectionName]: { ...prevSections[sectionName], errors } }));
    };

    const handleSaveData = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        const isValid: boolean[] = [];

        Object.entries(sections).forEach(([key, value]) => {
            const ajvValidator = ajv8Validator.rawValidation(value.schema, value.formData);

            if (ajvValidator.errors?.length) {
                const errorSchema = ajvValidator.errors?.reduce((acc, error) => {
                    let path = error.instancePath.substring(1);
                    if (!path && error.params && 'missingProperty' in error.params) {
                        path = error.params.missingProperty;
                    }

                    const message = (language[`studio.consignArtwork.assetMetadata.field.errors`] as TranslateFunction)(
                        { message: error.keyword }
                    );

                    if (message) {
                        isValid.push(false);
                        return { ...acc, [path]: { __errors: [message] } };
                    }

                    return acc;
                }, {});

                handleUpdateErrors({ errors: errorSchema as ErrorSchema<any>, sectionName: key as SectionName });
                return;
            }
            isValid.push(true);
        });

        if (!isValid.length || !isValid.includes(false)) {
            router.push(`/home/consignArtwork/licenses`);
            // await validateForm();
            // handleSubmit();
        }
    };

    const handleOnChange = ({ data, sectionName }: SectionOnChangeParams) => {
        setSections((prevSections) => ({
            ...prevSections,
            [sectionName]: { ...prevSections[sectionName], formData: data.formData },
        }));
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
        <form onSubmit={handleSaveData}>
            <PageContainerFooter
                submitText={texts.nextButton}
                stepStatus={status}
                stepNumber={2}
                title={texts.consignArtworkTitle}
                backOnclick={handleOpenBackModal}
            >
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Typography fontSize="1rem" fontWeight="normal" color="GrayText">
                    {texts.assetMetadataDescription}
                </Typography>
                <Typography marginTop={2} fontSize="1.1rem" color="grey" fontWeight="500">
                    {texts.assetMetadataTitle}
                </Typography>
                <Box marginBottom={5} maxWidth={500} mt={2} alignItems="center">
                    <Box display="flex" flexDirection="column" gap={3}>
                        {Object.entries(sections).map(([key, value]) => (
                            <Box key={key}>
                                <Section
                                    sectionName={key as SectionName}
                                    formData={value.formData}
                                    errors={value.errors}
                                    schema={value.schema}
                                    uiSchema={value.uiSchema}
                                    onChange={handleOnChange}
                                    updateErrors={handleUpdateErrors}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
