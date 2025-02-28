import React from 'react';
import BlankCard from '@/app/(main)/components/shared/BlankCard';
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
import { useI18n } from '@/app/hooks/useI18n';
import { ConsignArtworkAssetStatus } from '@/features/consign/types';

interface ConsignTableItem {
    title: string;
    status: ConsignArtworkAssetStatus;
    view: string;
    license: string;
    search: string;
    disabled: boolean;
}

interface CompletedConsignTableStatusProps {
    selectedStatus: ConsignArtworkAssetStatus;
    onStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompletedConsignTableStatus = ({ selectedStatus, onStatusChange }: CompletedConsignTableStatusProps) => {
    const { language } = useI18n();

    const texts = {
        consignStatus: language['studio.consignArtwork.consignmentStatus.title'],
        status: 'Status',
        preview: language['studio.consignArtwork.consignmentStatus.preview.title'],
        active: language['studio.consignArtwork.consignmentStatus.active.title'],
        hidden: 'Hidden',
        view: language['studio.consignArtwork.consignmentStatus.view'],
        license: language['studio.consignArtwork.consignmentStatus.license'],
        search: language['studio.consignArtwork.consignmentStatus.search'],
        yes: language['studio.consignArtwork.consignmentStatus.yes'],
        no: language['studio.consignArtwork.consignmentStatus.no'],
        everyone: 'Everyone',
        me: 'Me',
        draft: language['studio.consignArtwork.consignmentStatus.draft.title'],
    } as { [key: string]: string };

    const isBlocked = selectedStatus == 'blocked';

    const rows: ConsignTableItem[] = [
        {
            status: 'draft',
            title: texts.draft,
            view: texts.me,
            license: texts.no,
            search: texts.no,
            disabled: true,
        },
        {
            status: 'preview',
            title: texts.preview,
            view: texts.everyone,
            license: texts.no,
            search: texts.no,
            disabled: true,
        },
        isBlocked
            ? {
                  status: 'blocked',
                  title: 'Active (Locked)',
                  view: texts.me,
                  license: texts.no,
                  search: texts.no,
                  disabled: false,
              }
            : {
                  status: 'active',
                  title: texts.active,
                  view: texts.everyone,
                  license: texts.no,
                  search: texts.yes,
                  disabled: false,
              },
        {
            status: 'hidden',
            title: texts.hidden,
            view: texts.everyone,
            license: texts.yes,
            search: texts.no,
            disabled: false,
        },
    ];

    return (
        <Stack spacing={2}>
            <Typography variant="h6">{texts.consignStatus}</Typography>
            <BlankCard>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">{texts.status}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{texts.view}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{texts.license}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">{texts.search}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.status} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell scope="row">
                                        <Box display="flex" alignItems="center">
                                            <Radio
                                                disabled={isBlocked || row.disabled}
                                                name="selectedStatus"
                                                value={row.status}
                                                checked={row.status == selectedStatus}
                                                onChange={onStatusChange}
                                                style={{
                                                    color: row.disabled ? '#D9D9D9' : undefined,
                                                }}
                                            />
                                            <Typography
                                                variant="subtitle1"
                                                color={row.disabled ? 'gray' : 'textPrimary'}
                                                fontWeight={600}
                                            >
                                                {row.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="subtitle1"
                                            color={row.disabled ? 'gray' : 'textPrimary'}
                                            fontWeight={600}
                                        >
                                            {row.view}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="subtitle1"
                                            color={row.disabled ? 'gray' : 'textPrimary'}
                                            fontWeight={600}
                                        >
                                            {row.license}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="subtitle1"
                                            color={row.disabled ? 'gray' : 'textPrimary'}
                                            fontWeight={600}
                                        >
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
