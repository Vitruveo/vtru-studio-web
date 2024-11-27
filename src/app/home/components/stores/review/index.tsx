import { Delete } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Card, Grid, Tab, Typography } from '@mui/material';

export const Review = () => {
    return (
        <Box>
            {/* <Typography variant="h6"></Typography> */}
            <TabContext value={'general2'}>
                <TabList variant="scrollable" scrollButtons="auto">
                    <Tab label="Selected Artworks" value={'general'} color="inherit" />
                </TabList>
            </TabContext>

            <Card
                sx={{
                    padding: 2,
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="overline" fontWeight="bold">
                            Context
                        </Typography>
                        <Box mb={2} ml={4}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Culture
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body1">African</Typography>
                                    <Delete fontSize="small" color="error" />
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body1">Isalamic</Typography>
                                    <Delete fontSize="small" color="error" />
                                </Box>
                            </Box>
                        </Box>

                        <Box mb={2} ml={4}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Mood
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="body1">Awe</Typography>
                                <Delete fontSize="small" color="error" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="overline" fontWeight="bold">
                            Taxonomy
                        </Typography>
                        <Box mb={2} ml={4}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Object type
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="body1">Digital Art</Typography>
                                <Delete fontSize="small" color="error" />
                            </Box>
                        </Box>

                        <Box mb={2} ml={4}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                AI generation
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="body1">Yes</Typography>
                                <Delete fontSize="small" color="error" />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};
