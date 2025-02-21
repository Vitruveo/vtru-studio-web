import { useFormikContext } from 'formik';
import './previewDetailed.css';
import { Box, Button, Grid, Pagination, Select, Typography } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import AssetMock from './assetMock';
import FilterMock from './filterMock';
import { AppearanceContent, StoreStatus } from '@/features/stores/types';
import { useState } from 'react';
import { BASE_URL_SEARCH } from '@/constants/search';
import { NODE_ENV } from '@/constants/api';

interface Props {
    title: string;
    description: string;
    domain: string;
    banner: string | null;
    logo: string | null;
    logoHorizontal: string | null;
    storeStatus: StoreStatus;
}

export const PreviewDetailed = (rest: Props) => {
    const [imgLogoError, setImgLogoError] = useState(false);
    const [imgLogoHorizontalError, setImgLogoHorizontalError] = useState(false);
    const { values } = useFormikContext<AppearanceContent>();

    const redirect = {
        production: rest.domain,
        qa: rest.domain.replace('xibit.live', `${BASE_URL_SEARCH.replace('https://', '')}`),
    } as { [key: string]: string };

    return (
        <div className="browser-mockup-detailed">
            <div className="browser-title-bar">
                <div className="circles">
                    <span className="circle red"></span>
                    <span className="circle yellow"></span>
                    <span className="circle green"></span>
                </div>
            </div>
            <div className="browser-url-bar">
                {rest.logo && !imgLogoError ? (
                    <img
                        style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                        src={rest.logo}
                        alt="logo"
                        onError={() => setImgLogoError(true)}
                    />
                ) : (
                    <Box width={'20px'} height={'20px'} bgcolor="#eeeeee" />
                )}
                <span
                    className={['active', 'pending'].includes(rest?.storeStatus || 'draft') ? 'url-live' : 'url-text'}
                    onClick={() =>
                        ['active', 'pending'].includes(rest?.storeStatus || 'draft')
                            ? window.open(redirect[NODE_ENV], '_blank')
                            : {}
                    }
                >
                    {redirect[NODE_ENV]}
                </span>
            </div>
            <div className="browser-content">
                {!values.hideElements.header && (
                    <Grid container mb={1}>
                        <Grid item xs={12} sm={3}>
                            {rest.logoHorizontal && !imgLogoHorizontalError ? (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                    }}
                                    src={rest.logoHorizontal}
                                    alt="logo-horizontal"
                                    onError={() => setImgLogoHorizontalError(true)}
                                />
                            ) : (
                                <Box width="100%" height="40px" bgcolor="#eeeeee" />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={9}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            px={2}
                        >
                            <Typography variant="h4" gutterBottom>
                                {rest.title}
                            </Typography>
                            <IconMenu2 />
                        </Grid>
                    </Grid>
                )}
                <Grid container style={{ height: 'calc(100% - 55px)' }}>
                    {!values.hideElements.filters && (
                        <Grid item xs={12} sm={3}>
                            <FilterMock color={values.highlightColor} />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={!values.hideElements.filters ? 9 : 12} px={2}>
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
                            {!values.hideElements.artworkSpotlight && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2" fontWeight={'bold'} color={values.highlightColor}>
                                        Artworks Spotlight
                                    </Typography>
                                </Box>
                            )}
                            {!values.hideElements.artistSpotlight && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2">Artists Spotlight</Typography>
                                </Box>
                            )}
                            {!values.hideElements.recentlySold && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="body2">Recently Sold</Typography>
                                </Box>
                            )}
                        </Box>

                        {![
                            values.hideElements.artworkSpotlight,
                            values.hideElements.artistSpotlight,
                            values.hideElements.recentlySold,
                        ].every((item) => item) && (
                                <Box display="flex" justifyContent="space-between" gap={1} overflow={'hidden'}>
                                    {Array.from({ length: !values.hideElements.filters ? 5 : 8 }).map((_, index) => (
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
                                    {!values.hideElements.order && index !== 2 && (
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                    {!values.hideElements.pageNavigation && index === 2 && (
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="body1">{value}</Typography>
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                }}
                                            />
                                            <Select
                                                sx={{
                                                    width: '75px',
                                                    height: '30px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: `${values.highlightColor} !important`,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {!values.hideElements.assets && (
                            <Box
                                display="grid"
                                gridTemplateColumns={`repeat(${!values.hideElements.filters ? 4 : 6}, 1fr)`}
                                gap={2}
                            >
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <>
                                        {index === 0 && (
                                            <AssetMock
                                                key={index}
                                                showBadge
                                                badgeValue="2"
                                                showDetails={!values.hideElements.cardDetails}
                                                color={values.highlightColor}
                                            />
                                        )}
                                        {index === 1 && (
                                            <AssetMock
                                                key={index}
                                                showBadge
                                                badgeValue="10"
                                                showDetails={!values.hideElements.cardDetails}
                                                color={values.highlightColor}
                                            />
                                        )}
                                        {index === 2 && (
                                            <AssetMock
                                                key={index}
                                                showBadge
                                                badgeValue="99+"
                                                showDetails={!values.hideElements.cardDetails}
                                                color={values.highlightColor}
                                            />
                                        )}
                                        {index > 2 && (
                                            <AssetMock
                                                key={index}
                                                showDetails={!values.hideElements.cardDetails}
                                                color={values.highlightColor}
                                            />
                                        )}
                                    </>
                                ))}
                            </Box>
                        )}

                        {!values.hideElements.pageNavigation && (
                            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Pagination
                                    count={6}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            '&.Mui-selected': {
                                                backgroundColor: values.highlightColor,
                                                color: 'white',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: values.highlightColor,
                                        '&:hover': { backgroundColor: values.highlightColor },
                                    }}
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
