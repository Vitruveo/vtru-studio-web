'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import { Box, Theme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from '@/store/hooks';

import PageContainerFooter from '../../components/container/PageContainerFooter';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import { assetMetadataThunk, signerUpdateAssetHeaderThunk, updateAssetHeaderThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consign/slice';
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
import { UserSliceState } from '@/features/user/types';
import { useAccount, useConnectorClient } from 'wagmi';
import add from 'date-fns/esm/add';

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

const initValues = ({
    formData,
    creator,
}: {
    formData: { key: string; value: Record<string, any> | any[] | null };
    creator: UserSliceState;
}) => {
    switch (formData.key) {
        case 'creators':
            return formData.value?.map((v: SectionsFormData['creators']['formData']) => ({
                ...v,
                profileUrl: creator?.myWebsite,
                name: creator?.displayName,
                bio: creator.personalDetails?.bio,
                nationality: creator.personalDetails?.nationality,
                residence: creator.personalDetails?.residence,
                ethnicity: creator.personalDetails?.ethnicity,
                gender: creator.personalDetails?.gender,
            }));
        case 'provenance':
            return {
                ...formData.value,
                country: creator.personalDetails?.residence,
                plusCode: creator.personalDetails?.plusCode,
                exhibitions: creator.artworkRecognition?.exhibitions?.map((v) => ({
                    exhibitionName: v.name,
                    exhibitionUrl: v.url,
                })),
                awards: creator.artworkRecognition?.awards?.map((v) => ({ awardName: v.name, awardUrl: v.url })),
            };
        default:
            return formData.value;
    }
};

const convertHexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

export default function AssetMetadata() {
    const [sectionsStatus, setSectionsStatus] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [changedTitleOrDescription, setChangedTitleOrDescription] = useState(false);
    const toast = useToastr();
    const { data: client } = useConnectorClient();
    const { address } = useAccount();
    const wallets = useSelector((state) => state.user.wallets);
    const creator = useSelector((state) => state.user);
    const tempColors = useSelector((state) => state.asset.tempColors);
    const userIsBlocked = useSelector((state) => state.user?.vault?.isBlocked);
    const hasContract = useSelector((state) => !!state.asset?.contractExplorer?.tx);
    const isMinted = useSelector((state) => state.asset?.mintExplorer?.transactionHash);
    const asset = useSelector((state) => state.asset);
    const { assetMetadata } = asset;
    const formData = assetMetadata?.context.formData;

    const sectionsFormat = Object.entries(sectionsJSON).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key as keyof typeof sectionsJSON]: {
                ...value,
                formData: removeEmptyProperties(
                    assetMetadata && assetMetadata[key as keyof typeof sectionsJSON]
                        ? assetMetadata[key as keyof typeof sectionsJSON].formData
                        : initValues({ formData: { key, value: value.formData }, creator })
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
        save: language['studio.consignArtwork.backModal.confirm.button'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.homeTitle,
        },
        {
            to: '/consign',
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
        if (isMinted) {
            router.push(`/consign`);
            return;
        }

        // Object.values(sectionsFormat).forEach((v, i) => {
        //     if (JSON.stringify(v.formData) !== JSON.stringify(Object.values(sections)[i].formData)) {
        //         console.log('v.formData', v.formData, Object.values(sections)[i].formData);
        //     }
        // });
        if (JSON.stringify(sectionsFormat) === JSON.stringify(sections)) {
            router.push(`/consign`);
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
            return {
                ...object,
                [key]: value.filter(Boolean),
            };
        }
        return object;
    };
    const filterObjects = (object: any, key: string) => {
        const value = object[key];
        if (Array.isArray(value)) {
            return {
                ...object,
                [key]: value.filter((item) => Object.keys(item).length !== 0),
            };
        }
        return object;
    };

    const handleSaveData = async (event?: React.FormEvent, skip?: boolean) => {
        if (event) event.preventDefault();
        if (isMinted) {
            router.push('/consign/licenses');
            return;
        }

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

        const formDataContext = sections.context.formData as any;

        if (Array.isArray(formDataContext.colors)) {
            (sections.context.formData as any).colors = formDataContext.colors.filter(Boolean).map((color: any) => {
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
        formDataCreators.forEach((creat) => filterArray(creat, 'roles'));

        sections.creators.formData = formDataCreators.filter((creat) => {
            const objKeys = Object.keys(creat);
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

        try {
            setLoading(true);
            if (hasContract) {
                if (
                    (sectionsFormat.context.formData as any).title != formDataContext.title ||
                    (sectionsFormat.context.formData as any).description != formDataContext.description
                ) {
                    const signedMessage = await dispatch(
                        signerUpdateAssetHeaderThunk({
                            assetKey: asset._id,
                            client: client!,
                            title: formDataContext.title,
                            description: formDataContext.description,
                        })
                    );

                    if (!signedMessage) {
                        toast.display({ type: 'error', message: 'Error signing message' });
                        return;
                    }

                    if (!wallets.some((wallet) => wallet.address === address)) {
                        toast.display({ type: 'error', message: 'Wallet not found in your account' });
                        return;
                    }

                    await dispatch(
                        updateAssetHeaderThunk({
                            assetKey: asset._id,
                            header: {
                                title: formDataContext.title,
                                description: formDataContext.description,
                            },
                        })
                    );
                }
            }

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

            router.push(showBackModal ? '/consign' : `/consign/licenses`);

            setShowBackModal(false);
        } catch (error) {
            console.error(error);
            toast.display({ type: 'error', message: 'Error updating status' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (assetMetadata && !hasContract) handleSaveData(undefined, true);
    }, []);

    useEffect(() => {
        handleUpdateStatus();
    }, [sectionsStatus]);

    const handleOnChange = ({ data, sectionName }: SectionOnChangeParams) => {
        if (sectionName === 'context') {
            if (
                data.formData.title !== (sectionsFormat.context.formData as any).title ||
                data.formData.description !== (sectionsFormat.context.formData as any).description
            ) {
                setChangedTitleOrDescription(true);
            } else {
                setChangedTitleOrDescription(false);
            }
        }

        setSections((prevSections) => ({
            ...prevSections,
            [sectionName as keyof typeof prevSections]: {
                ...prevSections[sectionName as keyof typeof prevSections],
                formData: data?.formData,
            },
        }));
    };

    const xL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    const renderMessage = () => {
        if (loading) return 'Loading...';

        if (userIsBlocked) return 'You are blocked';

        if (!address && changedTitleOrDescription && hasContract) return 'Connect your wallet';

        if (showBackModal) return texts.save;

        return texts.nextButton;
    };

    return (
        <form onSubmit={handleSaveData}>
            <PageContainerFooter
                submitText={renderMessage()}
                stepStatus={hasContract ? 'completed' : status}
                stepNumber={2}
                title={texts.consignArtworkTitle}
                backOnclick={handleOpenBackModal}
                submitDisabled={(changedTitleOrDescription && !address && hasContract) || loading}
            >
                <Breadcrumb
                    title={texts.consignArtworkTitle}
                    items={BCrumb}
                    assetTitle={(formData as any)?.title ?? 'Untitled'}
                />
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

                <ModalBackConfirm
                    show={showBackModal}
                    handleClose={handleCloseBackModal}
                    yesClick={handleSaveData}
                    disabledSave={(changedTitleOrDescription && !address && hasContract) || loading}
                    saveText={renderMessage()}
                />
            </PageContainerFooter>
        </form>
    );
}
