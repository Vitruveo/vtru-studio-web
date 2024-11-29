import { TabContext, TabList } from '@mui/lab';
import { Box, Card, Grid, Tab } from '@mui/material';
import { useFormikContext } from 'formik';
import { SelectedFilter } from './selectedFilterSection';

export const Review = () => {
    const { values } = useFormikContext<{ [key: string]: any }>();
    return (
        <Box>
            <TabContext value={'general2'}>
                <TabList variant="scrollable" scrollButtons="auto">
                    <Tab label="Selected Artworks" value={'general'} color="inherit" />
                </TabList>
            </TabContext>

            <Card sx={{ padding: 2 }}>
                <Grid container spacing={4}>
                    {Object.entries(values).map((element) => {
                        const [key, value] = element;
                        return <SelectedFilter key={key} title={key} content={value} />;
                    })}
                </Grid>
            </Card>
        </Box>
    );
};
