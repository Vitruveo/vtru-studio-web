import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import ContextItem from '../filters/contextItem';
import TaxonomyItem from '../filters/taxonomyItem';
import ArtistItem from '../filters/artistItem';
import GeneralItem from '../filters/generalItem';
import Portfolio from '../filters/portfolio';
import Exclude from '../filters/exclude';
import Licenses from '../filters/licensesItem';

const TabSliders = () => {
    const [tabvalue, setTabValue] = useState('general');

    return (
        <TabContext value={tabvalue}>
            <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
                <TabList onChange={(_e, value) => setTabValue(value)} variant="scrollable" scrollButtons="auto">
                    <Tab label="General" value={'general'} />
                    <Tab label="Licenses" value={'licenses'} />
                    <Tab label="Context" value={'context'} />
                    <Tab label="Taxonomy" value={'taxonomy'} />
                    <Tab label="Artists" value={'artists'} />
                    <Tab label="Portfolio" value={'portfolio'} />
                    <Tab label="Exclude" value={'exclude'} />
                </TabList>
            </Box>
            <TabPanel value={'general'}>
                <GeneralItem />
            </TabPanel>
            <TabPanel value={'licenses'}>
                <Licenses />
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
            <TabPanel value={'portfolio'}>
                <Portfolio />
            </TabPanel>
            <TabPanel value={'exclude'}>
                <Exclude />
            </TabPanel>
        </TabContext>
    );
};

export default TabSliders;
