import { useFormikContext } from 'formik';
import { Box, Switch } from '@mui/material';
import { AppearanceContent } from '@/features/stores/types';

const ShowHideElements = () => {
    const { setFieldValue, values } = useFormikContext<AppearanceContent>();

    const handleChange = (key: keyof AppearanceContent['hideElements']) => {
        setFieldValue(`hideElements.${key}`, !values.hideElements[key]);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Switch onChange={() => handleChange('filters')} checked={values.hideElements.filters} />
                Show/Hide Filters
            </Box>
            <Box>
                <Switch onChange={() => handleChange('order')} checked={values.hideElements.order} />
                Show/Hide Order
            </Box>
            <Box>
                <Switch onChange={() => handleChange('header')} checked={values.hideElements.header} />
                Show/Hide Header
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('recentlySold')}
                    checked={values.hideElements.recentlySold}
                    disabled={
                        values.hideElements.artistSpotlight &&
                        values.hideElements.assets &&
                        values.hideElements.artworkSpotlight
                    }
                />
                Show/Hide Recently Sold
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('artworkSpotlight')}
                    checked={values.hideElements.artworkSpotlight}
                    disabled={
                        values.hideElements.recentlySold &&
                        values.hideElements.assets &&
                        values.hideElements.artistSpotlight
                    }
                />
                Show/Hide Artwork Spotlight
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('artistSpotlight')}
                    checked={values.hideElements.artistSpotlight}
                    disabled={
                        values.hideElements.recentlySold &&
                        values.hideElements.assets &&
                        values.hideElements.artworkSpotlight
                    }
                />
                Show/Hide Artist Spotlight
            </Box>
            <Box>
                <Switch onChange={() => handleChange('pageNavigation')} checked={values.hideElements.pageNavigation} />
                Show/Hide Page Navigation
            </Box>
            <Box>
                <Switch onChange={() => handleChange('cardDetails')} checked={values.hideElements.cardDetails} />
                Show/Hide Card Detail
            </Box>
            <Box>
                <Switch
                    onChange={() => {
                        handleChange('assets');
                    }}
                    checked={values.hideElements.assets}
                    disabled={
                        values.hideElements.recentlySold &&
                        values.hideElements.artworkSpotlight &&
                        values.hideElements.artistSpotlight
                    }
                />
                Show/Hide Digital Assets
            </Box>
        </Box>
    );
};

export default ShowHideElements;
