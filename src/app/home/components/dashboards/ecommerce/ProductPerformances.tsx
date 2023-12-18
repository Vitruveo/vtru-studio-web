import {
    Avatar,
    Box,
    Chip,
    MenuItem,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import React from 'react';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import DashboardCard from '../../shared/DashboardCard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ProductPerformances = () => {
    // for select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setMonth(event.target.value as string);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const grey = theme.palette.grey[300];
    const primarylight = theme.palette.primary.light;
    const greylight = theme.palette.grey[100];

    //   // chart 1
    const optionsrow1chart: any = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 35,
            width: 100,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [primarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            enabled: false,
        },
    };
    const seriesrow1chart = [
        {
            name: 'Customers',
            color: primary,
            data: [30, 25, 35, 20, 30],
        },
    ];

    // chart 2
    const optionsrow2chart: any = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 35,
            width: 100,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [greylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            enabled: false,
        },
    };
    const seriesrow2chart = [
        {
            name: 'Customers',
            color: grey,
            data: [30, 25, 35, 20, 30],
        },
    ];

    // chart 3
    const optionsrow3chart: any = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 35,
            width: 100,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [primarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            enabled: false,
        },
    };
    const seriesrow3chart = [
        {
            name: 'Customers',
            color: primary,
            data: [30, 25, 35, 20, 30],
        },
    ];

    // chart 4
    const optionsrow4chart: any = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 35,
            width: 100,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [greylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            enabled: false,
        },
    };
    const seriesrow4chart = [
        {
            color: grey,
            data: [30, 25, 35, 20, 30],
        },
    ];

    return (
        <DashboardCard
            title="Product Performance"
            action={
                <CustomSelect labelId="month-dd" id="month-dd" size="small" value={month} onChange={handleChange}>
                    <MenuItem value={1}>March 2023</MenuItem>
                    <MenuItem value={2}>April 2023</MenuItem>
                    <MenuItem value={3}>May 2023</MenuItem>
                </CustomSelect>
            }
        >
            <TableContainer>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Product
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Progress
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Chart
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        src={'/images/products/s6.jpg'}
                                        variant="rounded"
                                        alt="productOne"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Gaming Console
                                        </Typography>
                                        <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                                            Electronics
                                        </Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    78.5%
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        bgcolor: (th) => th.palette.success.light,
                                        color: (th) => th.palette.success.main,
                                        borderRadius: '6px',
                                        width: 80,
                                    }}
                                    size="small"
                                    label="Low"
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">$3.9k</Typography>
                            </TableCell>
                            <TableCell>
                                <Chart
                                    options={optionsrow1chart}
                                    series={seriesrow1chart}
                                    type="area"
                                    height="35px"
                                    width="100px"
                                />
                            </TableCell>
                        </TableRow>
                        {/* 2 */}
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        src={'/images/products/s9.jpg'}
                                        variant="rounded"
                                        alt="productTwo"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Leather Purse
                                        </Typography>
                                        <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                                            Fashion
                                        </Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    58.6%
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        bgcolor: (th) => th.palette.warning.light,
                                        color: (th) => th.palette.warning.main,
                                        borderRadius: '6px',
                                        width: 80,
                                    }}
                                    size="small"
                                    label="Medium"
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">$3.5k</Typography>
                            </TableCell>
                            <TableCell>
                                <Chart
                                    options={optionsrow2chart}
                                    series={seriesrow2chart}
                                    type="area"
                                    height="35px"
                                    width="100px"
                                />
                            </TableCell>
                        </TableRow>
                        {/* 3 */}
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        src={'/images/products/s7.jpg'}
                                        variant="rounded"
                                        alt="productThree"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Red Velvate Dress
                                        </Typography>
                                        <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                                            Womens Fashion
                                        </Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    25%
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        bgcolor: (th) => th.palette.primary.light,
                                        color: (th) => th.palette.primary.main,
                                        borderRadius: '6px',
                                        width: 80,
                                    }}
                                    size="small"
                                    label="Very High"
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">$3.5k</Typography>
                            </TableCell>
                            <TableCell>
                                <Chart
                                    options={optionsrow3chart}
                                    series={seriesrow3chart}
                                    type="area"
                                    height="35px"
                                    width="100px"
                                />
                            </TableCell>
                        </TableRow>
                        {/* 4 */}
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        src={'/images/products/s4.jpg'}
                                        variant="rounded"
                                        alt="productFour"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Headphone Boat
                                        </Typography>
                                        <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                                            Electronics
                                        </Typography>
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    96.3%
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        bgcolor: (th) => th.palette.error.light,
                                        color: (th) => th.palette.error.main,
                                        borderRadius: '6px',
                                        width: 80,
                                    }}
                                    size="small"
                                    label="High"
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">$3.5k</Typography>
                            </TableCell>
                            <TableCell>
                                <Chart
                                    options={optionsrow4chart}
                                    series={seriesrow4chart}
                                    type="area"
                                    height="35px"
                                    width="100px"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    );
};

export default ProductPerformances;
