import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { BASE_URL_API } from '@/constants/api';
import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';

const isDev = BASE_URL_API.includes('dev');

const projects = [
    { title: 'STACKS', url: '' },
    { title: 'SEARCH', url: isDev ? 'https://search.vtru.dev/' : 'https://search.vitruveo.xyz/' },
    { title: 'STORES', url: '' },
    { title: 'STREAMS', url: '' },
    { title: 'STUDIO', url: '' },
    { title: 'BUY VUSD', url: '' },
    { title: 'ABOUT XIBIT', url: 'https://about.xibit.app' },
    { title: 'ABOUT VITRUVEO', url: 'https://vitruveo.xyz' },
];

const AllProjectsMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const getStyle = (v: { url: string; title: string }) => ({
        lineHeight: '1',
        padding: 0,
        cursor: v.url ? 'pointer' : 'default',
        letterSpacing: '3px',
        color: v.title === 'STUDIO' ? '#D7DF23' : v.url ? 'black' : '#5A5A5A',
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

    return (
        <Box marginRight={7} padding={0} display="flex" alignItems="baseline">
            {projects.map((v, index) => (
                <Box key={v.title} display="flex" alignItems="baseline">
                    <Typography onClick={() => v.url && window.open(v.url, '_blank')} sx={getStyle(v)}>
                        {v.title}
                    </Typography>
                    {index !== projects.length - 1 && (
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
