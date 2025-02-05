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
                            <IconMenu2 onClick={() => console.log(values)} />
                        </Grid>
                    </Grid>
                )}
                <Grid container style={{ height: 'calc(100% - 55px)' }}>
                    {!values.filter && (
                        <Grid item xs={12} sm={3}>
                            <FilterMock />
                        </Grid>
                    )}
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
                                <>
                                    {!values.spotlight && index === 0 && (
                                        <Box key={tab} display="flex" alignItems="center">
                                            <Typography variant="body2">{tab}</Typography>
                                        </Box>
                                    )}
                                    {!values.artistSpotlight && index === 1 && (
                                        <Box key={tab} display="flex" alignItems="center">
                                            <Typography variant="body2">{tab}</Typography>
                                        </Box>
                                    )}
                                    {!values.recentlySold && index === 2 && (
                                        <Box key={tab} display="flex" alignItems="center">
                                            <Typography variant="body2">{tab}</Typography>
                                        </Box>
                                    )}
                                </>
                            ))}
                        </Box>

                        {![values.spotlight, values.artistSpotlight, values.recentlySold].every((item) => item) && (
                            <Box display="flex" justifyContent="space-between" gap={1} overflow={'hidden'}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Box key={index} width="calc(25% - 8px)" height="100px" bgcolor="#eeeeee" />
                                ))}
                            </Box>
                        )}

                        <Box display="flex" gap={3} mt={5} mb={2}>
                            {['Sort:', 'Artists:', 'Pagination:'].map((value, index) => (
                                <Box key={value} display="flex" alignItems="center">
                                    {!values.order && index !== 2 && (
                                        <>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select sx={{ width: '75px', height: '30px' }} />
                                        </>
                                    )}
                                    {!values.pageNavigation && index === 2 && (
                                        <>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select sx={{ width: '75px', height: '30px' }} />
                                            <Select sx={{ width: '75px', height: '30px' }} />
                                        </>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {!values.assets && (
                            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <AssetMock key={index} showBadge showDetails={!values.cardDetail} />
                                ))}
                            </Box>
                        )}

                        {!values.pageNavigation && (
                            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Pagination count={6} />
                                <Button variant="contained">Scroll to top</Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
