// import { Helmet } from 'react-helmet';
import { useSelector } from '@/store/hooks';
import { Box, Container, Theme, useMediaQuery } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
    maxHeight?: string;
    margin?: boolean;
    description?: string;
    children: JSX.Element | JSX.Element[];
    title?: string;
};

const PageContainer = ({ margin, title, description, children, maxHeight }: Props) => {
    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));
    const customizer = useSelector((state) => state.customizer);

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Helmet>
                {margin ? (
                    <Box position="relative" display="flex" flexDirection="column">
                        <Box flexGrow={1}>
                            <Container
                                sx={{
                                    maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                                }}
                            >
                                {children}
                            </Container>
                        </Box>
                    </Box>
                ) : (
                    children
                )}
            </div>
        </HelmetProvider>
    );
};

export default PageContainer;
