import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch } from '@/store/hooks';
import { TabContext, TabList } from '@mui/lab';
import { Box, Card, Grid, Tab, Typography } from '@mui/material';
import { SelectedFilter } from './selectedFilterSection';
import { getArtworkQuantityThunk } from '@/features/storesArtwork/thunks';

export const Review = () => {
    const dispatch = useDispatch();
    const { values } = useFormikContext<{ [key: string]: any }>();
    const [debouncedValues, setDebouncedValues] = useState(values);
    const [totalFoundArtworks, setTotalFoundArtworks] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValues(values);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [values]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(
                    getArtworkQuantityThunk({
                        price: {
                            max: values.general?.licenses.maxPrice,
                            min: values.general?.licenses.minPrice,
                        },
                        hasBts: values.general?.shortcuts.hasBTS === true ? 'yes' : '',
                        filters: {
                            general: values.general,
                            context: values.context,
                            taxonomy: values.taxonomy,
                            artists: values.artists,
                        },
                        colorPrecision: values.context?.precision,
                    })
                );
                setTotalFoundArtworks(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [debouncedValues]);

    return (
        <Box>
            <TabContext value={'general2'}>
                <TabList variant="scrollable" scrollButtons="auto">
                    <Tab label={'Selected Artworks'} value={'general'} color="inherit" />
                    <Tab
                        label={
                            <Typography sx={{ color: totalFoundArtworks === 0 ? 'red' : '#FF0066' }}>
                                {totalFoundArtworks}
                            </Typography>
                        }
                        value={'general'}
                        color="inherit"
                    />
                </TabList>
            </TabContext>
            <Card sx={{ padding: 2 }}>
                <Grid container spacing={4}>
                    {Object.entries(values)
                        .filter(([key, _value]) => key !== 'redirectPath')
                        .map((element) => {
                            const [key, value] = element;
                            return <SelectedFilter key={key} title={key} content={value} />;
                        })}
                </Grid>
            </Card>
        </Box>
    );
};
