import { useEffect, useMemo, useState, memo, useRef } from 'react';
import { Box, IconButton, Stack, Typography, styled } from '@mui/material';
import { FieldTemplateProps } from '@rjsf/utils';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useI18n } from '@/app/hooks/useI18n';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from '@/store/hooks';
import { extractAssetColorsThunk } from '@/features/asset/thunks';

const RedTypography = styled(Typography)({
    color: 'red',
});

interface CustomFieldTemplateProps extends FieldTemplateProps {
    langBasePath: string;
}

const filteredCheck = ['root_colors', 'root_tags', 'root_subject', 'root_collections', 'root_roles'];

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
    const [elementIgnoreBlur, setElementIgnoreBlur] = useState(false);
    const [blurStatus, setBlurStatus] = useState(false);
    const { language } = useI18n();
    const dispatch = useDispatch();
    const assetId = useSelector((state) => state.asset._id);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const blurOn = () => setBlurStatus(true);
        const blurOff = () => setBlurStatus(false);

        const element = document.getElementById(id);

        if (element && element.tagName === 'DIV') {
            setElementIgnoreBlur(true);
        }

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
            !filteredCheck.includes(id) &&
            !help?.props.hasErrors &&
            id !== 'root' &&
            (typeof formData === 'string' || Array.isArray(formData)) &&
            formData.length
        );
    }, [blurStatus, help?.props.hasErrors]);

    const checkMulti = label.includes('-') ? `${label.split('-')[0]}.item` : label;
    const withNumber = label.includes('-') ? label.split('-')[1] : '';
    const formattedLabel = String(language[`${langBasePath}.${checkMulti}`]);

    const onRefreshColors = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            dispatch(extractAssetColorsThunk({ id: assetId }));
        }, 1000);
    };

    return (
        <Box className={classNames}>
            <Box mb={1} display='flex' justifyContent='space-between'>
                <Box>
                    <Typography fontSize="0.9rem" fontWeight="bold" className="MuiFormLabel-root MuiInputLabel-root">
                        {`${formattedLabel} ${withNumber}`}
                        {required && '*'}
                    </Typography>
                    {description && !withNumber && (
                        <Typography color="GrayText" fontSize="0.8rem" className="description">
                            {language[`${langBasePath}.${label}.description`] as string}
                        </Typography>
                    )}
                </Box>
                {
                    id == 'root_colors' && (
                        <IconButton onClick={onRefreshColors}>
                            <RefreshIcon />
                        </IconButton>
                    )
                }
            </Box>
            <Box position="relative" display="flex" alignItems="center">
                {children}
                {(elementIgnoreBlur && !help?.props.hasErrors && formData?.length) || isCompleted ? (
                    <CheckCircle
                        style={{
                            color: '#93C47D',
                            marginLeft: '10px',
                            marginInline: 1,
                            position: 'absolute',
                            right: -30,
                        }}
                    />
                ) : null}
            </Box>
            <RedTypography>{errorsC}</RedTypography>
            <RedTypography>{help}</RedTypography>
        </Box>
    );
}

export default memo(CustomFieldTemplate);
