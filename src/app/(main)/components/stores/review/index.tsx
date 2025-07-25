import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArtworkQuantityThunk } from '@/features/storesArtwork/thunks';
import { TabContext, TabList } from '@mui/lab';
import { Box, Card, Grid, Tab, Typography } from '@mui/material';
import { SelectedFilter } from './selectedFilterSection';
import { storesActionsCreators } from '@/features/stores/slice';

export const Review = () => {
    const dispatch = useDispatch();
    const { values } = useFormikContext<{ [key: string]: any }>();
    const [debouncedValues, setDebouncedValues] = useState(values);
    const { results, id } = useSelector((state) => state.stores.selectedStore);

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
                        hasBts: values.general?.shortcuts.hasBTS,
                        filters: {
                            general: values.general,
                            licenseChecked: values.licenseChecked,
                            context: values.context,
                            taxonomy: values.taxonomy,
                            artists: values.artists,
                            portfolio: values.portfolio,
                            exclude: values.exclude,
                            include: values.include,
                            searchOption: values.searchOption,
                        },
                        colorPrecision: values.context?.precision,
                        storesId: id,
                    })
                );
                dispatch(storesActionsCreators.setSelectStoreResults(response));
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
                        label={<Typography sx={{ fontSize: '1.1rem' }}>{results} results</Typography>}
                        value={'general'}
                        color="inherit"
                    />
                </TabList>
            </TabContext>
            <Card sx={{ padding: 2 }}>
                <Grid container spacing={4}>
                    {Object.entries(values)
                        .filter(([key, _value]) => !['redirectPath', 'include', 'searchOption'].includes(key))
                        .map((element) => {
                            const [key, value] = element;
                            return <SelectedFilter key={key} title={key} content={value} />;
                        })}
                </Grid>
            </Card>
        </Box>
    );
};
