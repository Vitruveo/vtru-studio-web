import { useFormikContext } from 'formik';
import './styles.css';
import { Box, Button, Grid, Pagination, Select, Typography } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { State } from '@/app/(main)/stores/publish/appearanceAndContent/page';
import AssetMock from './assetMock';
import FilterMock from './filterMock';

interface Props {
    title: string;
    description: string;
    domain: string;
    banner: string | null;
    logo: string | null;
    logoHorizontal: string | null;
}

export const PreviewDetailed = (rest: Props) => {
    const { values } = useFormikContext<State>();

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
                {!values.header && (
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
                )}
                <Grid container style={{ height: 'calc(100% - 55px)' }}>
                    {!values.filter && (
                        <Grid item xs={12} sm={3}>
                            <FilterMock color={values.color} />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={!values.filter ? 9 : 12} px={2}>
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

                        <Box display="flex" gap={3} mt={3} mb={2}>
                            {!values.spotlight && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2" fontWeight={'bold'} color={values.color}>
                                        Artworks Spotlight
                                    </Typography>
                                </Box>
                            )}
                            {!values.artistSpotlight && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2">Artists Spotlight</Typography>
                                </Box>
                            )}
                            {!values.recentlySold && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2">Recently Sold</Typography>
                                </Box>
                            )}
                        </Box>

                        {![values.spotlight, values.artistSpotlight, values.recentlySold].every((item) => item) && (
                            <Box display="flex" justifyContent="space-between" gap={1} overflow={'hidden'}>
                                {Array.from({ length: !values.filter ? 5 : 8 }).map((_, index) => (
                                    <Box key={index} width="calc(25% - 8px)" height="100px" bgcolor="#eeeeee" />
                                ))}
                            </Box>
                        )}

                        <Box display="flex" gap={3} mt={5} mb={3}>
                            {['Sort:', 'Artists:', 'Pagination:'].map((value, index) => (
                                <Box
                                    key={value}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    {!values.order && index !== 2 && (
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                    {!values.pageNavigation && index === 2 && (
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                }}
                                            />
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.color} !important`,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {!values.assets && (
                            <Box display="grid" gridTemplateColumns={`repeat(${!values.filter ? 4 : 6}, 1fr)`} gap={2}>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <AssetMock
                                        key={index}
                                        showBadge
                                        showDetails={!values.cardDetail}
                                        color={values.color}
                                    />
                                ))}
                            </Box>
                        )}

                        {!values.pageNavigation && (
                            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Pagination
                                    count={6}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            '&.Mui-selected': {
                                                backgroundColor: values.color,
                                                color: 'white',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: values.color, '&:hover': { backgroundColor: values.color } }}
                                >
                                    Scroll to top
                                </Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
