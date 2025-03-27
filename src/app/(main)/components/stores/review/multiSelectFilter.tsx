import { Delete } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import {
    cultureOptions,
    moodOptions,
    orientationOptions,
    objectTypeOptions,
    aiGenerationOptions,
    arEnabledOptions,
    nudityOptions,
    categoryOptions,
    mediumOptions,
    styleOptions,
} from '../filters/options';
import { countryData } from '@/utils/countryData';
import { handleFormatWallet } from '../filters/portfolio';

interface MultiSelectFilterProps {
    content: { title: string; key: string; value: string[] | { value: string; label: string }[] };
}

const options: Record<string, { [key: string]: { label: string; value: string }[] }> = {
    general: {},
    context: {
        culture: cultureOptions,
        mood: moodOptions,
        orientation: orientationOptions,
    },
    taxonomy: {
        objectType: objectTypeOptions,
        tags: [],
        collections: [],
        aiGeneration: aiGenerationOptions,
        arEnabled: arEnabledOptions,
        nudity: nudityOptions,
        category: categoryOptions,
        medium: mediumOptions,
        style: styleOptions,
        subject: [],
    },
    artists: {
        name: [],
        nationality: countryData.map((country) => ({ value: country.code, label: country.label })),
        residence: countryData.map((country) => ({ value: country.code, label: country.label })),
    },
    portfolio: {
        wallets: [],
    },
    exclude: {
        arts: [],
        artists: [],
    },
    include: {
        arts: [],
        artists: [],
    },
};

export const MultiSelectFilter = ({ content }: MultiSelectFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (title: string, key: string, value: string) => {
        setFieldValue(
            `${title}.${key}`,
            content.value.filter((item) => {
                if (typeof item === 'string') {
                    return item !== value;
                }
                return item.value !== value;
            })
        );
    };

    if (!content.value.length) return null;

    const getItemTitle = (item: string | { value: string; label: string }): string => {
        if (options[content.title][content.key].length) {
            return options[content.title][content.key].find((option) => option.value === item)?.label || '';
        }
        if (content.title === 'exclude' || content.title === 'include') {
            return (item as any).label;
        }
        return handleFormatWallet(item as string) || '';
    };

    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {content.value.map((item, index) => (
                <Paper key={index} sx={{ padding: 1, display: 'flex' }}>
                    <Typography variant="body1">{getItemTitle(item)}</Typography>
                    <Delete
                        fontSize="small"
                        color="error"
                        onClick={() =>
                            handleDeleteITem(content.title, content.key, typeof item === 'string' ? item : item.value)
                        }
                        cursor={'pointer'}
                    />
                </Paper>
            ))}
        </Box>
    );
};
