import BlankCard from '@/app/home/components/shared/BlankCard';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    Radio,
    Box,
    Stack,
} from '@mui/material';

interface ConsignTableData {
    status: string;
    view: string;
    license: string;
    search: string;
}

const rows: ConsignTableData[] = [
    {
        status: 'Draft',
        view: 'Me',
        license: 'No',
        search: 'No',
    },
    {
        status: 'Preview',
        view: 'Everyone',
        license: 'No',
        search: 'No',
    },
    {
        status: 'Active',
        view: 'Everyone',
        license: 'Yes',
        search: 'Yes',
    },
    {
        status: 'Hidden',
        view: 'Everyone',
        license: 'Yes',
        search: 'No',
    },
];

export const CompletedConsignTableStatus = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Consignment Status</Typography>
            <BlankCard>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">Status</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">View</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">License</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Search</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.status} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell scope="row">
                                        <Box display="flex" alignItems="center">
                                            <Radio />
                                            <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                                                {row.status}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                                            {row.view}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                                            {row.license}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                                            {row.search}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </BlankCard>
        </Stack>
    );
};
