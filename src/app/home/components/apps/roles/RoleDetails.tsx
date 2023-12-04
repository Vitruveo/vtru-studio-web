import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  IconPencil,
  IconStar,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import emailIcon from "public/images/breadcrumb/emailSv.png";
import BlankCard from "../../shared/BlankCard";
import Scrollbar from "../../custom-scroll/Scrollbar";
import RolePermissionsTable from "./RolePermissions";
import { RoleType } from "@/mock/roles";

export default function RoleDetails() {
  const roleDetail: RoleType = {
    id: 1,
    name: "Admin",
    description: "Admin permissions",
    permissions: ["all"],
    starred: false,
    deleted: false,
  };
  const editRole = false;

  const theme = useTheme();
  const warningColor = theme.palette.warning.main;

  return (
    <>
      {roleDetail && !roleDetail.deleted ? (
        <>
          <Box p={3} py={2} display={"flex"} alignItems="center">
            <Typography variant="h5">Role Details</Typography>
            <Stack gap={0} direction="row" ml={"auto"}>
              <Tooltip title={roleDetail.starred ? "Unstar" : "Star"}>
                <IconButton>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: roleDetail.starred ? warningColor : "",
                      stroke: roleDetail.starred ? warningColor : "",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={editRole ? "Save" : "Edit"}>
                <IconButton>
                  {!editRole ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />

          <Box sx={{ overflow: "auto" }}>
            {!editRole ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt=""
                      src=""
                      sx={{ width: "72px", height: "72px" }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" mb={0.5}>
                        {roleDetail.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        {roleDetail.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box p={3}>
                  <RolePermissionsTable />
                </Box>
                <Divider />
                <Box p={3} gap={1} display="flex">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => {}}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => {}}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <BlankCard sx={{ p: 0 }}>
                  <Scrollbar
                    sx={{ height: { lg: "calc(100vh - 360px)", md: "100vh" } }}
                  >
                    <Box>
                      <RolePermissionsTable />
                    </Box>
                  </Scrollbar>
                </BlankCard>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          p={3}
          height="50vh"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Box>
            <Typography variant="h4">Please Select a Role</Typography>
            <br />
            <Image src={emailIcon} alt={"emailIcon"} width="250" />
          </Box>
        </Box>
      )}
    </>
  );
}
