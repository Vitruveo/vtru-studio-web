import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
  Switch,
} from "@mui/material";
import BlankCard from "@/app/home/components/shared/BlankCard";
import { Stack } from "@mui/system";
import { RoleType, roleList } from "@/mock/roles";

const basics: RoleType[] = roleList;

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
                <Typography variant="h6">Role</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Category</Typography>
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
                    {basic.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {basic.description}
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
