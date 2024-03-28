import React from 'react';
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
    status: ConsignTableStatus;
    view: string;
    license: string;
    search: string;
}

export type ConsignTableStatus = 'Draft' | 'Preview' | 'Active' | 'Hidden';

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

interface CompletedConsignTableStatusProps {
    selectedStatus: ConsignTableStatus;
    onStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompletedConsignTableStatus = ({ selectedStatus, onStatusChange }: CompletedConsignTableStatusProps) => {
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
                                            <Radio name='selectedStatus' value={row.status} checked={row.status == selectedStatus} onChange={onStatusChange} />
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
