'use client';

import React, { useEffect, useState } from 'react';
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

import { useToastr } from '@/app/hooks/useToastr';
import { assetActionsCreators } from '@/features/asset/slice';

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

const convertHexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

export default function AssetMetadata() {
    const [sectionsStatus, setSectionsStatus] = useState<{ [key: string]: string }>({});
    const toast = useToastr();
    const tempColors = useSelector((state) => state.asset.tempColors);

    const asset = useSelector((state) => state.asset);
    const { assetMetadata } = asset;

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

    // gets the temporary colors and sets it into the form
    useEffect(() => {
        if (tempColors.length) {
            setSections((prevSections) => ({
                ...prevSections,
                context: {
                    ...prevSections.context,
                    formData: {
                        ...prevSections.context.formData,
                        colors: tempColors as any,
                    },
                },
            }));
        }
    }, [tempColors]);

    const router = useRouter();
    const dispatch = useDispatch();

    const { language } = useI18n();

    const getAssetOrientation = () => {
        const { definition } = asset.formats.original;

        if (definition === 'landscape') return 'horizontal';
        if (definition === 'portrait') return 'vertical';
        return 'square';
    };

    const setOrientation = (orientation: 'horizontal' | 'vertical' | 'square') => {
        setSections((prevSections) => ({
            ...prevSections,
            context: {
                ...prevSections.context,
                formData: {
                    ...prevSections.context.formData,
                    orientation,
                },
            },
        }));
    };

    useEffect(() => {
        const orientation = getAssetOrientation();

        if (orientation) {
            setOrientation(orientation);
        } else {
            toast.display({ type: 'info', message: 'The asset orientation could not be determined.' });
        }
    }, []);

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
        // Object.values(sectionsFormat).forEach((v, i) => {
        //     if (JSON.stringify(v.formData) !== JSON.stringify(Object.values(sections)[i].formData)) {
        //         console.log('v.formData', v.formData, Object.values(sections)[i].formData);
        //     }
        // });
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

    const handleUpdateStatus = () => {
        const isCompleted = Object.values(sectionsStatus).every((v) => v === 'completed');
        dispatch(
            consignArtworkActionsCreators.changeStatusStep({
                stepId: 'assetMetadata',
                status: isCompleted ? 'completed' : 'inProgress',
            })
        );
    };

    const filterArray = (object: any, key: string) => {
        const value = object[key];
        if (Array.isArray(value)) {
            object[key] = value.filter(Boolean);
        }
    };
    const filterObjects = (object: any, key: string) => {
        const value = object[key];
        if (Array.isArray(value)) {
            object[key] = value.filter((item) => Object.keys(item).length !== 0);
        }
    };

    const handleSaveData = async (event?: React.FormEvent, skip?: boolean) => {
        if (event) event.preventDefault();

        const isValid: boolean[] = [];

        Object.entries(sections).forEach(([key, value]) => {
            const ajvValidator = ajv8Validator.rawValidation(value.schema, value.formData);

            if (ajvValidator.errors?.length) {
                const errorSchema = ajvValidator.errors?.reduce((acc, error) => {
                    let path: string = error.instancePath.substring(1);
                    if (error.params?.missingProperty) {
                        path = path ? `${path}/${error.params.missingProperty}` : error.params.missingProperty;
                    }

                    const message = (language[`studio.consignArtwork.assetMetadata.field.errors`] as TranslateFunction)(
                        { message: error.keyword }
                    );

                    if (message) {
                        const [parentPath, childPath] = path.split('/');
                        isValid.push(false);
                        return childPath
                            ? {
                                  ...acc,
                                  [parentPath]: {
                                      ...acc[parentPath],
                                      [childPath]: {
                                          __errors: [...(acc[parentPath]?.[childPath]?.__errors || []), message],
                                      },
                                  },
                              }
                            : { ...acc, [parentPath]: { __errors: [message] } };
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

        const colors = (sections.context.formData as any).colors;

        if (Array.isArray(colors)) {
            (sections.context.formData as any).colors = colors.filter(Boolean).map((color) => {
                if (typeof color === 'string') {
                    return convertHexToRGB(color);
                }
                return color;
            });
        }

        const formDataTaxonomy = sections.taxonomy.formData as any;
        const taxonomyKeys = ['tags', 'collections', 'subject'];
        taxonomyKeys.forEach((key) => filterArray(formDataTaxonomy, key));

        const formDataCreators = sections.creators.formData as any[];
        formDataCreators.forEach((creator) => filterArray(creator, 'roles'));

        sections.creators.formData = formDataCreators.filter((creator) => {
            const objKeys = Object.keys(creator);
            return !(
                objKeys.length === 1 &&
                objKeys[0] === 'roles' &&
                Array.isArray(creator.roles) &&
                creator.roles.length === 0
            );
        });

        const formDataProvenance = sections.provenance.formData as any;
        const provenanceKeys = ['exhibitions', 'awards'];
        provenanceKeys.forEach((key) => filterObjects(formDataProvenance, key));

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

        dispatch(assetActionsCreators.setTempColors([]));

        handleUpdateStatus();

        router.push(showBackModal ? '/home/consignArtwork' : `/home/consignArtwork/licenses`);

        setShowBackModal(false);
    };

    useEffect(() => {
        if (assetMetadata) handleSaveData(undefined, true);
    }, []);

    useEffect(() => {
        handleUpdateStatus();
    }, [sectionsStatus]);

    const handleOnChange = ({ data, sectionName }: SectionOnChangeParams) => {
        setSections((prevSections) => ({
            ...prevSections,
            [sectionName as keyof typeof prevSections]: {
                ...prevSections[sectionName as keyof typeof prevSections],
                formData: data.formData,
            },
        }));
    };

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
                                            setSectionsStatus={setSectionsStatus}
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
