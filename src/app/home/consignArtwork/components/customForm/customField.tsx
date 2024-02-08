import { useEffect, useMemo, useState, memo } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { FieldTemplateProps } from '@rjsf/utils';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useI18n } from '@/app/hooks/useI18n';

const RedTypography = styled(Typography)({
    color: 'red',
});

interface CustomFieldTemplateProps extends FieldTemplateProps {
    langBasePath: string;
}

function CustomFieldTemplate({
    id,
    classNames,
    langBasePath,
    label,
    help,
    required,
    formData,
    description,
    errors: errorsC,
    children,
    ...res
}: CustomFieldTemplateProps) {
    const [blurStatus, setBlurStatus] = useState(false);

    const { language } = useI18n();

    useEffect(() => {
        const blurOn = () => setBlurStatus(true);
        const blurOff = () => setBlurStatus(false);

        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('focus', blurOff);
            element.addEventListener('blur', blurOn);
        }
        return () => {
            if (element) {
                element.removeEventListener('focus', blurOff);
                element.removeEventListener('blur', blurOn);
            }
        };
    }, []);

    const isCompleted = useMemo(() => {
        Date.now();

        return (
            !id.includes('root_tags') &&
            !help?.props.hasErrors &&
            id !== 'root' &&
            typeof formData === 'string' &&
            formData.length
        );
    }, [blurStatus, help?.props.hasErrors]);

    const checkTag = label.includes('tag-') ? label.split('-') : label;
    const title = typeof checkTag === 'string' ? checkTag : checkTag[0];
    const withNumber = typeof checkTag === 'string' ? '' : checkTag[1];

    return (
        <Box className={classNames}>
            <Box>
                <Typography fontSize="0.9rem" fontWeight="bold" className="MuiFormLabel-root MuiInputLabel-root">
                    {title.length ? `${language[`${langBasePath}.${title}`] as string} ${withNumber}` : ''}
                    {required && '*'}
                </Typography>
                {description && !withNumber && (
                    <Typography color="GrayText" fontSize="0.8rem" className="description">
                        {language[`${langBasePath}.${title}.placeholder`] as string}
                    </Typography>
                )}
            </Box>
            <Box display="flex" alignItems="center">
                {children}
                {isCompleted ? <CheckCircle style={{ color: '#93C47D', marginLeft: '10px', marginInline: 1 }} /> : null}
            </Box>
            <RedTypography>{errorsC}</RedTypography>
            <RedTypography>{help}</RedTypography>
        </Box>
    );
}

export default memo(CustomFieldTemplate);
