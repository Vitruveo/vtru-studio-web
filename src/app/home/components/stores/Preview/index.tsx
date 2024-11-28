import { Box } from '@mui/material';
import './styles.css';
import AllProjectsMenu from '@/app/home/layout/vertical/header/AllProjectsMenu';

interface Props {
    domain: string;
    banner: string | null;
    logo: string | null;
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
                <span className="url-text">{rest.domain || 'https://example.com'}</span>
            </div>
            <div className="browser-content">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {rest.logo && (
                        <img
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '2px solid white',
                            }}
                            src={rest.logo || 'https://via.placeholder.com/200x200'}
                            alt="logo"
                        />
                    )}
                    <AllProjectsMenu />
                </Box>
                <Box display="flex" gap={2} mt={2}>
                    {rest.banner && (
                        <img
                            style={{
                                width: '100%',
                                height: '220px',
                                objectFit: 'cover',
                                borderRadius: '8px 8px 0 0',
                            }}
                            src={rest.banner || 'https://via.placeholder.com/1024x200'}
                            alt="banner"
                        />
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        mt: 2,
                        justifyContent: 'center',
                    }}
                >
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 100,
                                height: 150,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                            }}
                        />
                    ))}
                </Box>
            </div>
        </div>
    );
};
