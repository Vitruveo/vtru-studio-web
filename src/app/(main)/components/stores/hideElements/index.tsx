import { useFormikContext } from 'formik';
import { Box, Button, Switch, Typography } from '@mui/material';
import { IconRestore } from '@tabler/icons-react';
import { State } from '@/app/(main)/stores/publish/appearanceAndContent/page';

const ShowHideElements = () => {
    const { setFieldValue, resetForm, values } = useFormikContext<State>();

    const handleChange = (key: keyof State) => {
        setFieldValue(key, !values[key]);
    };

    const handleReset = () => {
        resetForm();
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Switch onChange={() => handleChange('filter')} checked={values.filter} />
                Show/Hide Filters
            </Box>
            <Box>
                <Switch onChange={() => handleChange('order')} checked={values.order} />
                Show/Hide Order
            </Box>
            <Box>
                <Switch onChange={() => handleChange('header')} checked={values.header} />
                Show/Hide Header
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('recentlySold')}
                    checked={values.recentlySold}
                    disabled={values.artistSpotlight && values.assets && values.spotlight}
                />
                Show/Hide Recently Sold
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('spotlight')}
                    checked={values.spotlight}
                    disabled={values.recentlySold && values.assets && values.artistSpotlight}
                />
                Show/Hide Artwork Spotlight
            </Box>
            <Box>
                <Switch
                    onChange={() => handleChange('artistSpotlight')}
                    checked={values.artistSpotlight}
                    disabled={values.recentlySold && values.assets && values.spotlight}
                />
                Show/Hide Artist Spotlight
            </Box>
            <Box>
                <Switch onChange={() => handleChange('pageNavigation')} checked={values.pageNavigation} />
                Show/Hide Page Navigation
            </Box>
            <Box>
                <Switch onChange={() => handleChange('cardDetail')} checked={values.cardDetail} />
                Show/Hide Card Detail
            </Box>
            <Box>
                <Switch
                    onChange={() => {
                        handleChange('assets');
                    }}
                    checked={values.assets}
                    disabled={values.recentlySold && values.spotlight && values.artistSpotlight}
                />
                Show/Hide Digital Assets
            </Box>
            <Button startIcon={<IconRestore size={18} />} fullWidth variant="contained" onClick={handleReset}>
                <Typography variant="caption">Reset</Typography>
            </Button>
        </Box>
    );
};

export default ShowHideElements;
