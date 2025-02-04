import { Box, Button, Switch, Typography } from '@mui/material';
import { TypeAction } from './slice';
import { IconRestore } from '@tabler/icons-react';

const ShowHideElements = () => {
    const handleChange = (key: any, action: TypeAction) => { };

    const handleReset = () => { };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Switch onChange={() => handleChange('filter', TypeAction.SET_FILTER)} />
                Show/Hide Filters
            </Box>
            <Box>
                <Switch onChange={() => handleChange('order', TypeAction.SET_ORDER)} />
                Show/Hide Order
            </Box>
            <Box>
                <Switch onChange={() => handleChange('header', TypeAction.SET_HEADER)} />
                Show/Hide Header
            </Box>
            <Box>
                <Switch onChange={() => handleChange('recentlySold', TypeAction.SET_RECENTLYSOLD)} />
                Show/Hide Recently Sold
            </Box>
            <Box>
                <Switch onChange={() => handleChange('spotlight', TypeAction.SET_SPOTLIGHT)} />
                Show/Hide Artwork Spotlight
            </Box>
            <Box>
                <Switch onChange={() => handleChange('artistSpotlight', TypeAction.SET_ARTISTSPOTLIGHT)} />
                Show/Hide Artist Spotlight
            </Box>
            <Box>
                <Switch onChange={() => handleChange('pageNavigation', TypeAction.SET_PAGENAVIGATION)} />
                Show/Hide Page Navigation
            </Box>
            <Box>
                <Switch onChange={() => handleChange('cardDetail', TypeAction.SET_CARDDETAIL)} />
                Show/Hide Card Detail
            </Box>
            <Box>
                <Switch
                    onChange={() => {
                        handleChange('assets', TypeAction.SET_ASSETS);
                        handleChange('pageNavigation', TypeAction.SET_PAGENAVIGATION);
                    }}
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
