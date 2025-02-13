import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import './preview.css';

interface Props {
    title: string;
    description: string;
    domain: string;
    banner: string | null;
    logo: string | null;
    logoHorizontal: string | null;
    style?: {
        width?: string;
    };
}

export const Preview = (rest: Props) => {
    const [imgLogoError, setImgLogoError] = useState(false);
    const [imgLogoHorizontalError, setImgLogoHorizontalError] = useState(false);

    return (
        <div className="browser-mockup" style={{ width: rest.style?.width || '100%' }}>
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
                            objectFit: 'contain',
                            flexShrink: 0,
                        }}
                        src={rest.logo}
                        alt="logo"
                        onError={() => setImgLogoError(true)}
                    />
                ) : (
                    <Box width={'20px'} height={'20px'} bgcolor="#eeeeee" />
                )}
                <span className="url-text">{rest.domain}</span>
            </div>
            <div className="browser-content">
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
                    <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="flex-end" px={2}>
                        <IconMenu2 />
                    </Grid>
                </Grid>
                <Grid container>
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

                        <Box display="flex" gap={1} mt={5} mb={2}>
                            {['Artworks Spotlight', 'Artists Spotlight', 'Recently Sold'].map((tab, index) => (
                                <Box key={tab} display="flex" gap={1.5} alignItems="center">
                                    <Typography variant="h6" fontWeight={index > 0 ? 1 : 'bold'}>
                                        {tab}
                                    </Typography>
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
