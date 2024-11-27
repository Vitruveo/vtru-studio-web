import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import ContextItem from '../filters/contextItem';
import TaxonomyItem from '../filters/taxonomyItem';
import ArtistItem from '../filters/ArtistItem';
import GeneralItem from '../filters/generalItem';

const TabSliders = () => {
    const [tabvalue, setTabValue] = useState('general');

    return (
        <TabContext value={tabvalue}>
            <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
                <TabList onChange={(_e, value) => setTabValue(value)} variant="scrollable" scrollButtons="auto">
                    <Tab label="Licenses" value={'general'} />
                    <Tab label="Context" value={'context'} />
                    <Tab label="Taxonomy" value={'taxonomy'} />
                    <Tab label="Artists" value={'artists'} />
                </TabList>
            </Box>
            <TabPanel value={'general'}>
                <GeneralItem />
            </TabPanel>
            <TabPanel value={'context'}>
                <ContextItem />
            </TabPanel>
            <TabPanel value={'taxonomy'}>
                <TaxonomyItem />
            </TabPanel>
            <TabPanel value={'artists'}>
                <ArtistItem />
            </TabPanel>
        </TabContext>
    );
};

export default TabSliders;
