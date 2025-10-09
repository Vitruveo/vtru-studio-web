import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

const AllProjectsMenu = () => {
    const [redirects, setRedirects] = useState({
        vitruveo: '',
        search: '',
        studio: '',
        stores: '',
        about: '',
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    useEffect(() => {
        const fetchRedirects = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setRedirects({
                vitruveo: rowData.data.common.vitruveo.base_url,
                search: rowData.data[NODE_ENV].xibit.search_url,
                studio: rowData.data[NODE_ENV].xibit.studio_url,
                stores: rowData.data[NODE_ENV].xibit.stores_url,
                about: rowData.data.common.xibit.about_url,
            });
        };
        fetchRedirects();
    }, []);

    const projects = [
        { title: 'SEARCH', url: redirects.search },
        { title: 'FOLIO', url: redirects.stores },
        { title: 'STUDIO', url: `${redirects.studio}/login` },
        // { title: 'STACKS', url: `${SEARCH_BASE_URL}/stacks` },
        // { title: 'STREAMS', url: '' },
        { title: 'ABOUT XIBIT', url: redirects.about, onlyMobile: true },
        { title: 'ABOUT VITRUVEO', url: redirects.vitruveo, onlyMobile: true },
    ];

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const getActualProject = () => {
        const actualUrl = window.location.href;
        if (actualUrl.includes('stacks')) return projects[1];
        if (actualUrl.includes('search')) return projects[0];
        if (actualUrl.includes('studio')) return projects[4];
        return projects[0];
    };

    const getStyle = (v: { url: string; title: string }) => ({
        lineHeight: '1',
        padding: 0,
        cursor: v.url ? 'pointer' : 'default',
        letterSpacing: '3px',
        color: v.title === getActualProject().title ? '#D7DF23' : v.url ? 'black' : '#5A5A5A',
        '&:hover': {
            color: v.url && '#333',
        },
        fontWeight: v.url ? '500' : 'normal',
    });

    if (!lgUp) {
        return (
            <Box marginLeft={1.5} padding={0} display="flex">
                <IconButton size="small" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <IconMenu2 />
                </IconButton>
                <Drawer
                    sx={{ '& .MuiDrawer-paper': { padding: 2 } }}
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <List>
                        {projects.map((v) => (
                            <ListItem
                                key={v.title}
                                onClick={() => v.url && window.open(v.url, '_blank')}
                                sx={getStyle(v)}
                            >
                                <ListItemText primary={v.title} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        );
    }

    const deskMenus = projects.filter((v) => !v.onlyMobile);

    return (
        <Box marginRight={7} padding={0} display="flex" alignItems="baseline">
            {deskMenus
                .filter((v) => !v.onlyMobile)
                .map((v, index) => (
                    <Box key={v.title} display="flex" alignItems="baseline">
                        <Typography onClick={() => v.url && window.open(v.url, '_blank')} sx={getStyle(v)}>
                            {v.title}
                        </Typography>
                        {index !== deskMenus.length - 1 && (
                            <Typography color="black" sx={{ margin: '0 8px', padding: 0, lineHeight: '1' }}>
                                |
                            </Typography>
                        )}
                    </Box>
                ))}
        </Box>
    );
};

export default AllProjectsMenu;
