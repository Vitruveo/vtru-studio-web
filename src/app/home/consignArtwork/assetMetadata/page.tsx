'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box, Theme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from '@/store/hooks';

import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { assetMetadataThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { ModalBackConfirm } from '../modalBackConfirm';
import { useI18n } from '@/app/hooks/useI18n';

import Section, { SectionOnChangeParams } from './section';
import { ErrorSchema, RJSFSchema } from '@rjsf/utils';
import sectionsJSON from './newSections.json';

import ajv8Validator from '@rjsf/validator-ajv8';
import { TranslateFunction } from '@/i18n/types';
import AssetMediaPreview from '../components/assetMediaPreview';

export type SectionName = 'context' | 'taxonomy' | 'creators' | 'provenance' | 'custom' | 'assets';
type SectionsJSONType = typeof sectionsJSON;
type SectionType = SectionsJSONType[keyof SectionsJSONType];

export type SectionsFormData = { [key in keyof SectionsJSONType]: Pick<SectionType, 'formData'> };

export type SectionFormatType = {
    [key in keyof SectionsJSONType]: Omit<SectionType, 'schema'> & { schema: RJSFSchema; errors: ErrorSchema<any> };
};

const removeEmptyProperties = (obj: Record<string, any> | any[] | null): Record<string, any> | any[] | null => {
    if (obj === null) {
        return null;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => (typeof item === 'object' ? removeEmptyProperties(item) : item));
    } else {
        const newObj = Object.entries(obj).reduce(
            (acc, [key, value]) => {
                if (value !== null && value !== undefined && value.length !== 0) {
                    if (typeof value === 'object') {
                        acc[key] = removeEmptyProperties(value);
                    } else {
                        acc[key] = value;
                    }
                }
                return acc;
            },
            {} as Record<string, any>
        );

        return newObj;
    }
};

export default function AssetMetadata() {
    const { assetMetadata } = useSelector((state) => state.asset);

    const sectionsFormat = Object.entries(sectionsJSON).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key as keyof typeof sectionsJSON]: {
                ...value,
                formData: removeEmptyProperties(
                    assetMetadata && assetMetadata[key as keyof typeof sectionsJSON]
                        ? assetMetadata[key as keyof typeof sectionsJSON].formData
                        : value.formData
                ),
                errors: {},
            },
        }),
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

    const handleCloseBackModal = () => {
        setShowBackModal(false);
    };

    const handleOpenBackModal = () => {
        if (JSON.stringify(sectionsFormat) === JSON.stringify(sections)) {
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

    const handleSaveData = async (event?: React.FormEvent, skip?: boolean) => {
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

                handleUpdateErrors({ errors: errorSchema as ErrorSchema<any>, sectionName: key as any });
                return;
            }
            isValid.push(true);
        });

        if (skip) return;

        const isCompleted = !isValid.length || !isValid.includes(false);

        dispatch(
            assetMetadataThunk(
                Object.entries(sections).reduce(
                    (acc, [key, v]) => ({
                        isCompleted: isCompleted,
                        ...acc,
                        [key]: { formData: v.formData },
                    }),
                    {} as SectionsFormData
                )
            )
        );
        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'assetMetadata',
                status: isCompleted ? 'completed' : 'inProgress',
            })
        );

        router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/licenses`);

        setShowBackModal(false);
    };

    useEffect(() => {
        if (assetMetadata) handleSaveData(undefined, true);
    }, []);

    const handleOnChange = ({ data, sectionName }: SectionOnChangeParams) => {
        setSections((prevSections) => ({
            ...prevSections,
            [sectionName as keyof typeof prevSections]: {
                ...prevSections[sectionName as keyof typeof prevSections],
                formData: data.formData,
            },
        }));
    };

    // useEffect(() => {
    //     (async () => {
    //         if (assetMetadata?.assetMetadataDefinitions.length) {
    //             const isValid = await validateForm();
    //             if (isValid && Object.values(isValid).length === 0)
    //                 dispatch(
    //                     consignArtworkActionsCreators.changeStatusStep({
    //                         stepId: 'assetMetadata',
    //                         status: 'completed',
    //                     })
    //                 );
    //             else {
    //                 dispatch(
    //                     consignArtworkActionsCreators.changeStatusStep({
    //                         stepId: 'assetMetadata',
    //                         status: 'inProgress',
    //                     })
    //                 );
    //             }
    //         }
    //     })();
    // }, [assetMetadata?.assetMetadataDefinitions.length]);

    const xL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

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
                <Box alignItems="flex-start" height="auto" display="flex" flexWrap="wrap">
                    <Box width={680}>
                        <Typography marginBottom={2} fontSize="1.2rem" fontWeight="500">
                            {texts.assetMetadataTitle}
                        </Typography>
                        <Typography fontSize="1.1rem" fontWeight="normal" color="GrayText">
                            {texts.assetMetadataDescription}
                        </Typography>

                        {!xL && (
                            <Box display="flex" maxWidth={550} marginTop={2} marginBottom={2} flex={1}>
                                <AssetMediaPreview maxWidth={550} />
                            </Box>
                        )}

                        <Box marginBottom={10} maxWidth={550} mt={2} alignItems="center">
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
                    </Box>
                    {xL && (
                        <Box
                            flex={1}
                            position="sticky"
                            top={0}
                            display="flex"
                            justifyContent={!xL ? 'flex-start' : 'center'}
                        >
                            <AssetMediaPreview />
                        </Box>
                    )}
                </Box>

                <ModalBackConfirm show={showBackModal} handleClose={handleCloseBackModal} yesClick={handleSaveData} />
            </PageContainerFooter>
        </form>
    );
}
