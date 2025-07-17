import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { BASE_URL_SEARCH } from '@/constants/search';
import { BASE_URL_STUDIO } from '@/constants/studio';
import { NODE_ENV } from '@/constants/api';
import { BASE_URL_VITRUVEO } from '@/constants/vitruveo';

const projects = [
    { title: 'SEARCH', url: BASE_URL_SEARCH },
    { title: 'FOLIO', url: NODE_ENV === 'production' ? 'https://xibit.live' : `${BASE_URL_SEARCH}/stores` },
    { title: 'STUDIO', url: `${BASE_URL_STUDIO}/login` },
    // { title: 'STACKS', url: `${SEARCH_BASE_URL}/stacks` },
    // { title: 'STREAMS', url: '' },
    { title: 'ABOUT XIBIT', url: 'https://about.xibit.app', onlyMobile: true },
    { title: 'ABOUT VITRUVEO', url: BASE_URL_VITRUVEO, onlyMobile: true },
];

const AllProjectsMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

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
