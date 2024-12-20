import { Box } from '@mui/material';
import Licenses from './licenseItem';
import { ShortcutItem } from './shortcutItem';

const GeneralItem = () => {
    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <ShortcutItem />
            <Licenses />
        </Box>
    );
};

export default GeneralItem;
