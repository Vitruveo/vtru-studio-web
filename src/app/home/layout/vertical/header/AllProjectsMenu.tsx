import { Box, Typography } from '@mui/material';
import { BASE_URL_API } from '@/constants/api';

const isDev = BASE_URL_API.includes('dev');

const projects = [
    { title: 'STACKS', url: '' },
    { title: 'SEARCH', url: isDev ? 'https://search.vtru.dev/' : 'https://search.vitruveo.xyz/' },
    { title: 'STORES', url: '' },
    { title: 'STREAMS', url: '' },
    {
        title: 'STUDIO',
        url: '',
    },
    { title: 'ABOUT', url: '' },
];

const AllProjectsMenu = () => {
    return (
        <Box marginRight={7} padding={0} display="flex" alignItems="baseline">
            {projects.map((v, index) => (
                <Box key={v.title} display="flex" alignItems="baseline">
                    <Typography
                        onClick={() => v.url && window.open(v.url, '_blank')}
                        sx={{
                            lineHeight: '1',
                            padding: 0,
                            cursor: v.url ? 'pointer' : 'default',
                            letterSpacing: '3px',
                            color: v.title === 'STUDIO' ? '#D7DF23' : v.url ? 'black' : '#5A5A5A',
                            '&:hover': {
                                color: v.url && '#333',
                            },
                            fontWeight: v.url ? '500' : 'normal',
                        }}
                    >
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
