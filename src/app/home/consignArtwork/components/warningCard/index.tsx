import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';

interface WarningCardProps {
    children: React.ReactNode;
    setShowInfo: (show: boolean) => void;
}

const WarningCard = ({ children, setShowInfo }: WarningCardProps) => {
    const handleSetShowInfo = () => {
        setShowInfo(false);
    };

    return (
        <Box padding={2} bgcolor="#FFF2CC" position="relative">
            <IconButton size="small" style={{ position: 'absolute', top: 1, right: 1 }} onClick={handleSetShowInfo}>
                <CloseIcon fontSize="small" />
            </IconButton>
            {children}
        </Box>
    );
};

export default WarningCard;
