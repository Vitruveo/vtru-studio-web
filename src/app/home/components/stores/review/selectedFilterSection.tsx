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
                {hasTruthyObject(content) ? title : ''}
            </Typography>
            <Box mb={2} ml={4}>
                {Object.entries(content).map((element) => {
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
                            gap={1}
                        >
                            <Typography variant="subtitle2" fontWeight="bold">
                                {hasTruthyObject(value) || isColorPrecision ? key : ''}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                {isShortcut && <ShortcutFilter content={value as { [key: string]: boolean }} />}
                                {isLicense && <LicensesFilter content={value as { [key: string]: string }} />}
                                {isColorPrecision && <Typography variant="body1">{Number(value) * 100}%</Typography>}
                                {isColors && <ColorFilter content={value as string[]} />}
                                {!isShortcut && !isLicense && !isColorPrecision && !isColors && (
                                    <MultiSelectFilter content={{ title, key, value: value as [string, string][] }} />
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Grid>
    );
};
