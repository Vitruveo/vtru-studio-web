import { Box, Checkbox, Grid, Typography } from '@mui/material';

const items = [
    'Hide Nudity',
    'Hide AI',
    'Photography',
    'Animation',
    'Physical Art',
    'Digital Art',
    'Include Sold',
    'has BTS',
];

const ShortcutItem = () => {
    return (
        <Box>
            <Typography variant="h6">Shortcuts</Typography>
            <Grid container item xs={6}>
                {items.map((item, index) => (
                    <Grid item xs={6} key={index}>
                        <Checkbox /> {item}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ShortcutItem;
