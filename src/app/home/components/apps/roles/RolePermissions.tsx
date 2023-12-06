import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TableHead,
    Switch,
} from '@mui/material';
import BlankCard from '@/app/home/components/shared/BlankCard';
import { PermissionType } from '@/mock/permissions';

interface Props {
    permissions: PermissionType[];
    activePermissions: string[];
    handleChangePermission(permissionKey: string): void;
}

export default function RolePermissionsTable({
    permissions,
    activePermissions,
    handleChangePermission,
}: Props) {
    return (
        <BlankCard>
            <TableContainer>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    display="flex"
                                    justifyContent="center"
                                    variant="h6"
                                >
                                    Category
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    display="flex"
                                    justifyContent="center"
                                    variant="h6"
                                >
                                    Permission
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    display="flex"
                                    justifyContent="center"
                                    variant="h6"
                                >
                                    Status
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map((permission) => {
                            const [category, name] = permission.key.split(':');

                            return (
                                <TableRow key={permission._id}>
                                    <TableCell>
                                        <Typography
                                            display="flex"
                                            justifyContent="center"
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={400}
                                        >
                                            {category}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            display="flex"
                                            justifyContent="center"
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={400}
                                        >
                                            {name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            display="flex"
                                            justifyContent="center"
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={400}
                                        >
                                            <Switch
                                                checked={activePermissions.includes(
                                                    permission.key
                                                )}
                                                onChange={() =>
                                                    handleChangePermission(
                                                        permission.key
                                                    )
                                                }
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </BlankCard>
    );
}
