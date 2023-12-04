import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  Switch,
} from "@mui/material";
import BlankCard from "@/app/home/components/shared/BlankCard";

import { permissionsList, PermissionType } from "@/mock/permissions";

const basics: PermissionType[] = permissionsList;

export default function RolePermissionsTable() {
  return (
    <BlankCard>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Permission</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basics.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {basic.category}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {basic.permission}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    <Switch />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
}
