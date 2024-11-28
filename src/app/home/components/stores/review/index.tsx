import { Delete } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Card, Grid, Paper, Tab, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

export const Review = () => {
    const { values } = useFormikContext<{ [key: string]: any }>();
    console.log(values);
    return (
        <Box>
            <TabContext value={'general2'}>
                <TabList variant="scrollable" scrollButtons="auto">
                    <Tab label="Selected Artworks" value={'general'} color="inherit" />
                </TabList>
            </TabContext>

            <Card
                sx={{
                    padding: 2,
                }}
            >
                <Grid container spacing={4}>
                    {Object.entries(values).map((element) => {
                        const [key, value] = element;
                        return <SelectedFilter key={key} title={key} content={value} />;
                    })}
                </Grid>
            </Card>
        </Box>
    );
};

interface SelectedFilterProps {
    title: string;
    content: any;
}

const SelectedFilter = ({ title, content }: SelectedFilterProps) => {
    return (
        <Grid item xs={6}>
            <Typography variant="overline" fontWeight="bold">
                {title}
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
                                {key}
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

interface ShortcutFilterProps {
    content: { [key: string]: boolean };
}

const ShortcutFilter = ({ content }: ShortcutFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (key: string) => {
        setFieldValue(`general.shortcuts.${key}`, false);
    };

    return (
        <Grid container spacing={2}>
            {Object.entries(content).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                    <Grid container alignItems="center">
                        {!!value && (
                            <>
                                <Typography variant="body1">{key}</Typography>
                                <Delete
                                    fontSize="small"
                                    color="error"
                                    onClick={() => handleDeleteITem(key)}
                                    cursor={'pointer'}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

interface LicensesFilterProps {
    content: { [key: string]: string };
}

const LicensesFilter = ({ content }: LicensesFilterProps) => {
    return (
        <Grid container spacing={2}>
            {Object.entries(content).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                    <Grid container alignItems="center">
                        <Typography variant="body1">
                            {key} {value}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

interface ColorFilterProps {
    content: string[];
}

const ColorFilter = ({ content }: ColorFilterProps) => {
    return (
        <Box display={'flex'} gap={1}>
            {content.map((item) => (
                <Paper
                    key={item}
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: item,
                    }}
                />
            ))}
        </Box>
    );
};

interface MultiSelectFilterProps {
    content: { title: string; key: string; value: [string, string][] };
}

const MultiSelectFilter = ({ content }: MultiSelectFilterProps) => {
    const { setFieldValue } = useFormikContext();
    const handleDeleteITem = (title: string, key: string, value: [string, string]) => {
        setFieldValue(
            `${title}.${key}`,
            content.value.filter((item) => item !== value)
        );
    };

    return (
        <Box display={'flex'} gap={1}>
            {content.value.map((item) => (
                <Paper key={item[0]} sx={{ padding: 1, display: 'flex' }}>
                    <Typography variant="body1">{item[1]}</Typography>
                    <Delete
                        fontSize="small"
                        color="error"
                        onClick={() => handleDeleteITem(content.title, content.key, item)}
                        cursor={'pointer'}
                    />
                </Paper>
            ))}
        </Box>
    );
};
