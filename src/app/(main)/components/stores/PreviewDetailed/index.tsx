import { Box, Grid, Select, Typography } from '@mui/material';
import './styles.css';
import { IconMenu2 } from '@tabler/icons-react';

interface Props {
    title: string;
    description: string;
    domain: string;
    banner: string | null;
    logo: string | null;
    logoHorizontal: string | null;
}

export const PreviewDetailed = (rest: Props) => {
    return (
        <div className="browser-mockup">
            <div className="browser-title-bar">
                <div className="circles">
                    <span className="circle red"></span>
                    <span className="circle yellow"></span>
                    <span className="circle green"></span>
                </div>
            </div>
            <div className="browser-url-bar">
                {rest.logo && (
                    <img
                        style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'contain',
                            flexShrink: 0,
                        }}
                        src={rest.logo}
                        alt="logo"
                    />
                )}
                <span className="url-text">{rest.domain}</span>
            </div>
            <div className="browser-content">
                <Grid container mb={1}>
                    <Grid item xs={12} sm={3}>
                        {rest.logoHorizontal ? (
                            <img
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    objectFit: 'contain',
                                    flexShrink: 0,
                                }}
                                src={rest.logoHorizontal}
                                alt="logo-horizontal"
                            />
                        ) : (
                            <Box width="100%" height="40px" bgcolor="#eeeeee" />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="flex-end" px={2}>
                        <IconMenu2 />
                    </Grid>
                </Grid>
                <Grid container style={{ height: 'calc(100% - 55px)' }}>
                    <Grid item xs={12} sm={3}>
                        <Box width="100%" height="100%" bgcolor="#eeeeee" />
                    </Grid>
                    <Grid item xs={12} sm={9} px={2}>
                        <Typography variant="h4" gutterBottom>
                            {rest.title}
                        </Typography>
                        {rest.banner && (
                            <img
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                }}
                                src={rest.banner}
                                alt="banner"
                            />
                        )}
                        <Typography variant="body1" gutterBottom>
                            {rest.description}
                        </Typography>

                        <Box display="flex" gap={3} mt={5} mb={2}>
                            {['Artworks Spotlight', 'Artists Spotlight', 'Recently Sold'].map((tab, index) => (
                                <Box key={tab} display="flex" alignItems="center">
                                    <Typography variant="body2" fontWeight={index > 0 ? 1 : 'bold'}>
                                        {tab}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="space-between" gap={1} overflow={'hidden'}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Box key={index} width="calc(25% - 8px)" height="100px" bgcolor="#eeeeee" />
                            ))}
                        </Box>

                        <Box display="flex" gap={3} mt={5} mb={2}>
                            {['Sort:', 'Artists:', 'Pagination:'].map((value, index) => (
                                <Box key={value} display="flex" alignItems="center">
                                    <Typography variant="body1">{value}</Typography>
                                    <Select sx={{ width: '75px', height: '30px' }} />
                                    {index === 2 && <Select sx={{ width: '75px', height: '30px' }} />}
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Box key={index} width="calc(25% - 8px)" height="100px" bgcolor="#eeeeee" />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
