import { Box, Grid, Typography } from '@mui/material';
import './styles.css';

interface Props {
    title: string;
    description: string;
    domain: string;

    banner: string | null;
    logo: string | null;
    logoHorizontal: string | null;
}

export const Preview = (rest: Props) => {
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
                        }}
                        src={rest.logo}
                        alt="logo"
                    />
                )}
                <span className="url-text">{rest.domain}</span>
            </div>
            <div className="browser-content">
                <Grid container mb={1}>
                    <Grid xs={3}>
                        {rest.logoHorizontal ? (
                            <img
                                style={{
                                    width: '150px',
                                    height: '40px',
                                    objectFit: 'cover',
                                }}
                                src={rest.logoHorizontal}
                                alt="logo"
                            />
                        ) : (
                            <Box width="150px" height="40px" bgcolor="#eeeeee" />
                        )}
                    </Grid>
                    <Grid xs={9} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            color="GrayText"
                            fontWeight={1}
                            fontSize={14}
                            letterSpacing={1.5}
                        >
                            SEARCH | STACKS | STUDIO | BUY VUSD
                        </Typography>
                        <img
                            src="/images/icons/xibit-icon-redondo-darkmode.png"
                            width={35}
                            height={35}
                            alt=""
                            style={{ cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid xs={3}>
                        <Box width="150px" height="100%" bgcolor="#eeeeee" />
                    </Grid>
                    <Grid xs={9}>
                        <Typography variant="h4" gutterBottom>
                            {rest.title}
                        </Typography>
                        {rest.banner ? (
                            <img
                                style={{
                                    width: '100%',
                                    height: '200px',
                                }}
                                src={rest.banner}
                                alt="banner"
                            />
                        ) : (
                            <Box height="200px" bgcolor="#eeeeee" />
                        )}
                        <Typography variant="body1" gutterBottom>
                            {rest.description}
                        </Typography>

                        <Box display="flex" gap={1} mt={5} mb={2}>
                            {['Artworks Spotlight', 'Artists Spotlight', 'Recently Sold'].map((tab, index) => (
                                <Box key={tab} display={'flex'} gap={1.5} alignItems={'center'}>
                                    <Typography variant="h6" fontWeight={index > 0 ? 1 : 'bold'}>
                                        {tab}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="space-between" gap={1}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Box key={index} width="150px" height="100px" bgcolor="#eeeeee" />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
