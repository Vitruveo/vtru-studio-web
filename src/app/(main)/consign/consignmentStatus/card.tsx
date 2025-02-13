import { Box, Typography } from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import CustomCheckbox from '@/app/(main)/components/forms/theme-elements/CustomCheckbox';

interface ConsignmentStatusCardProps {
    edit: boolean;
    view: boolean;
    search: boolean;
    license: boolean;
    backgroundColor?: string;
}

export function ConsignmentStatusCard({ edit, license, search, view, backgroundColor }: ConsignmentStatusCardProps) {
    const { language } = useI18n();

    const texts = {
        yes: language['studio.consignArtwork.consignmentStatus.yes'],
        no: language['studio.consignArtwork.consignmentStatus.no'],
        edit: language['studio.consignArtwork.consignmentStatus.edit'],
        view: language['studio.consignArtwork.consignmentStatus.view'],
        search: language['studio.consignArtwork.consignmentStatus.search'],
        license: language['studio.consignArtwork.consignmentStatus.license'],
    } as { [key: string]: string };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height={200}
            border="2px solid"
            borderRadius="10px"
            borderColor="#D5D5D5"
        >
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                padding={1}
                borderRadius="8px 8px 0px 0px"
                bgcolor={backgroundColor}
                height={100}
            >
                {search && (
                    <Box gap={2} marginTop={1} display="flex">
                        <CustomCheckbox checked sx={{ padding: 0 }} disabled />
                        <Typography>{texts.search}</Typography>
                    </Box>
                )}
                {license && (
                    <Box gap={2} marginTop={1} display="flex">
                        <CustomCheckbox checked sx={{ padding: 0 }} disabled />
                        <Typography>{texts.license}</Typography>
                    </Box>
                )}
            </Box>
            <Box
                borderRadius="0px 0px 8px 8px"
                width="100%"
                justifyContent="center"
                alignItems="center"
                bgcolor={backgroundColor}
                height={100}
            >
                <Box display="flex" gap={1} paddingLeft={2}>
                    <Typography>{texts.edit}:</Typography>
                    <Typography fontSize="0.8rem" fontWeight="bold" style={{ textTransform: 'uppercase' }}>
                        {edit ? texts.yes : texts.no}
                    </Typography>
                </Box>
                <Box marginTop={1} display="flex" gap={1} paddingLeft={2}>
                    <Typography>{texts.view}:</Typography>
                    <Typography fontSize="0.8rem" fontWeight="bold" style={{ textTransform: 'uppercase' }}>
                        {view ? texts.yes : texts.no}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
