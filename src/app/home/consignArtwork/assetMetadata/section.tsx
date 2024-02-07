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
    updateErrors: (params: { errors: ErrorSchema<any>; sectionName: SectionName }) => void;
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

    const handleChangeStatus = (params: { errors?: ErrorSchema }) => {
        if (params?.errors && Object.values(params?.errors).length) {
            setStatus('error');
            return;
        }

        const checkStarted = Object.values(formData).every(
            (v) => v === null || (typeof v === 'string' && v.trim().length === 0)
        );

        if (checkStarted) {
            setStatus('notStarted');
            return;
        }

        const checkRequired = Object.entries(formData).filter(([key, v]) => schema?.required?.includes(key));

        const allFieldsFilled = checkRequired.some(
            ([key, v]) => v === null || (typeof v === 'string' && v.trim().length === 0)
        );

        if (allFieldsFilled || (schema?.required && checkRequired.length !== schema?.required?.length)) {
            setStatus('inProgress');
            return;
        }

        setStatus('completed');
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
        <Accordion style={{ background: '#EFEFEF' }} expanded={expanded} onChange={handleChange}>
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
                        {sectionName.charAt(0).toUpperCase() + sectionName.slice(1).toLowerCase()}
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
