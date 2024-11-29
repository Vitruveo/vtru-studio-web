import { hasTruthyObject } from '@/utils/truthyObject';
import { Box, Grid, Typography } from '@mui/material';
import { ShortcutFilter } from './shortcutFilter';
import { LicensesFilter } from './licensesFilter';
import { ColorFilter } from './colorFilter';
import { MultiSelectFilter } from './multiSelectFilter';

interface SelectedFilterProps {
    title: string;
    content: any;
}

export const SelectedFilter = ({ title, content }: SelectedFilterProps) => {
    return (
        <Grid item xs={6}>
            <Typography variant="overline" fontWeight="bold">
                {hasTruthyObject(content) || title === 'context' ? title : ''}
            </Typography>
            <Box ml={4}>
                {Object.entries(content)
                    .filter(([key, value]) => (Array.isArray(value) ? value.length : !!value))
                    .map((element) => {
                        const [key, value] = element;
                        const isShortcut = key === 'shortcuts';
                        const isLicense = key === 'licenses';
                        const isColorPrecision = key === 'precision';
                        const isColors = key === 'colors';
                        return (
                            <Box
                                key={key}
                                display={'flex'}
                                flexDirection={isColorPrecision || isColors ? 'row' : 'column'}
                                marginBlock={1}
                            >
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {hasTruthyObject(value) || isColorPrecision ? key : ''}
                                </Typography>
                                {isShortcut && <ShortcutFilter content={value as { [key: string]: boolean }} />}
                                {isLicense && <LicensesFilter content={value as { [key: string]: string }} />}
                                {isColorPrecision && (
                                    <Typography variant="body1" ml={1}>
                                        {Number(value) * 100}%
                                    </Typography>
                                )}
                                {isColors && <ColorFilter content={value as string[]} />}
                                {!isShortcut && !isLicense && !isColorPrecision && !isColors && (
                                    <MultiSelectFilter content={{ title, key, value: value as [string, string][] }} />
                                )}
                            </Box>
                        );
                    })}
            </Box>
        </Grid>
    );
};
