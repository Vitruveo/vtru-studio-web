import { useSelector } from "@/store/hooks";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import BlankCard from "../../shared/BlankCard";
import {
  IconPencil,
  IconStar,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import Scrollbar from "../../custom-scroll/Scrollbar";
import emailIcon from "public/images/breadcrumb/emailSv.png";
import Image from "next/image";
import { RoleType } from "@/data/roles";

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

  const tableData = [
    {
      id: 1,
      title: "Name",
      alias: "firstname",
      gdata: roleDetail ? roleDetail.name : "",
      type: "text",
    },

    {
      id: 3,
      title: "Description",
      alias: "company",
      gdata: roleDetail ? roleDetail.description : "",
      type: "text",
    },
    {
      id: 4,
      title: "Permissions",
      alias: "department",
      gdata: roleDetail ? roleDetail.permissions.join(" - ") : "",
      type: "text",
    },
  ];

  return (
    <>
      {/* ------------------------------------------- */}

      {/* ------------------------------------------- */}
      {roleDetail && !roleDetail.deleted ? (
        <>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
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
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
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
                      <Typography variant="body2" color="text.secondary">
                        {roleDetail.permissions.join(" - ")}
                      </Typography>
                    </Box>
                  </Box>
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
                    <Box pt={1}>
                      {tableData.map((data) => (
                        <Box key={data.id} px={3} py={1.5}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            mb={0.5}
                          >
                            {data.title}
                          </Typography>
                          <TextField
                            id="firstname"
                            size="small"
                            fullWidth
                            type="text"
                            value={data.gdata}
                            onChange={(e) => {}}
                          />
                        </Box>
                      ))}
                      <Box p={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {}}
                        >
                          Save Role
                        </Button>
                      </Box>
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
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
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
