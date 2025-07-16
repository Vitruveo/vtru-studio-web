import { Box } from '@mui/material';
import LicensePrice from './licenseItem';
import { ShortcutItem } from './shortcutItem';

const GeneralItem = () => {
    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <ShortcutItem />
            <LicensePrice />
        </Box>
    );
};

export default GeneralItem;
