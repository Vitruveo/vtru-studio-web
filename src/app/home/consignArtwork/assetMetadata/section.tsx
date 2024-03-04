import React, { useEffect, useState } from 'react';
import { ErrorSchema, RJSFSchema } from '@rjsf/utils';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography, useTheme } from '@mui/material';
import CustomForm, { CustomFormProps } from '../components/customForm/';
import { SectionName } from './page';
import { IChangeEvent } from '@rjsf/core';
import { useI18n } from '@/app/hooks/useI18n';
import { statusName } from '@/features/consignArtwork/slice';
import { TranslateFunction } from '@/i18n/types';

export type SectionOnChangeParams = { data: IChangeEvent<any, RJSFSchema, any>; sectionName: SectionName };

interface SectionProps extends Omit<CustomFormProps, 'updateErrors' | 'onChange' | 'langBasePath'> {
    sectionName: SectionName;
    updateErrors: any;
    onChange: (params: SectionOnChangeParams) => void;
}

const Section = ({ sectionName, formData, errors, schema, uiSchema, onChange, updateErrors }: SectionProps) => {
    const [status, setStatus] = useState<keyof typeof statusName>('notStarted');

    const [expanded, setExpanded] = useState<boolean>(false);

    const { language } = useI18n();
    const theme = useTheme();

    const handleChange = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleValidateSection = (formDat: any, fieldsRequired: string[]) => {
        const checkStarted = Object.values(formDat).every(
            (v) => v === null || (typeof v === 'string' && v.trim().length === 0)
        );

        if (checkStarted) {
            return 'notStarted';
        }

        const checkRequired = Object.entries(formDat).filter(([key, v]) => fieldsRequired?.includes(key));

        const allFieldsFilled = checkRequired.some(
            ([key, v]) =>
                v === null || (typeof v === 'string' && v.trim().length === 0) || (Array.isArray(v) && !v.length)
        );

        if (allFieldsFilled || (fieldsRequired && checkRequired.length !== fieldsRequired?.length)) {
            return 'inProgress';
        }

        return 'completed';
    };

    const handleChangeStatus = (params: { errors?: ErrorSchema }) => {
        if (params?.errors && Object.values(params?.errors).length) {
            setStatus('error');
            return;
        }

        if (Array.isArray(formData)) {
            const allStatus: string[] = [];

            formData.forEach((v: any) => {
                allStatus.push(handleValidateSection(v, (schema?.items as { required: string[] })?.required));
            });

            if (allStatus.includes('error')) {
                setStatus('error');
                return;
            }

            if (allStatus.includes('inProgress')) {
                setStatus('inProgress');
                return;
            }

            if (allStatus.includes('notStarted')) {
                setStatus('notStarted');
                return;
            }

            setStatus('completed');

            return;
        }

        const validStatus = handleValidateSection(formData, schema?.required as string[]);
        setStatus(validStatus);
    };

    const handleUpdateErrors = (newErrors: ErrorSchema) => {
        updateErrors({ errors: newErrors, sectionName });
        handleChangeStatus({ errors: newErrors });
    };

    const handleChangeForm = (data: IChangeEvent<any, RJSFSchema, any>) => {
        onChange({ data, sectionName });
    };

    const statusColor = {
        completed: '#93C47D',
        inProgress: '#F6B26B',
        error: '#EB5757',
        notStarted: theme.palette.text.disabled,
    };

    useEffect(() => {
        handleChangeStatus({ errors });
    }, [errors]);

    return (
        <Accordion style={{ background: '#fafafa' }} expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                sx={{
                    height: '50px',
                    '&.Mui-expanded': {
                        minHeight: '50px',
                    },
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                }}
                expandIcon={
                    <IconButton size="small">
                        <ArrowForwardIosSharpIcon style={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                }
                aria-controls="panel1d-content"
                id="panel1d-header"
            >
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Typography marginLeft="10px" fontSize="1.2rem" fontWeight="bold">
                        {`${language[`studio.consignArtwork.assetMetadata.section.${sectionName}`]}`}
                    </Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="25px"
                        width="120px"
                        color="white"
                        bgcolor={statusColor[status]}
                    >
                        {language[statusName[status]] as string}
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: '0px 16px 16px',
                    maxWidth: '90%',
                }}
            >
                <CustomForm
                    langBasePath="studio.consignArtwork.assetMetadata.field"
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={handleChangeForm}
                    schema={schema}
                    errors={errors}
                    transformErrors={(errorsT) => {
                        errorsT.forEach((error) => {
                            if (error.name === 'required') {
                                error.message = (
                                    language[`studio.consignArtwork.assetMetadata.field.errors`] as TranslateFunction
                                )({ message: error.name });
                            }
                        });
                        return errorsT;
                    }}
                    updateErrors={handleUpdateErrors}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default Section;
