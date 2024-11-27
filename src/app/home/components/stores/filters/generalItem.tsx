import { Box, Typography } from '@mui/material';
import Licenses from './licenseItem';
import ShortcutItem from './shortcutItem';

const GeneralItem = () => {
    return (
        <Box>
            <ShortcutItem />
            <Licenses />
        </Box>
    );
};

export default GeneralItem;
