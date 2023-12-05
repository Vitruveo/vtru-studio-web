"use client";

import { useCallback, useEffect, useState } from "react";
import toastr from "toastr";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageContainer from "@/app/home/components/container/PageContainer";
import Breadcrumb from "@/app/home/layout/shared/breadcrumb/Breadcrumb";
import RoleDetails from "@/app/home/components/apps/roles/RoleDetails";
import RoleList from "@/app/home/components/apps/roles/RoleList";
import RoleSearch from "@/app/home/components/apps/roles/RoleSearch";
import RoleFilter from "@/app/home/components/apps/roles/RoleFilter";
import AppCard from "@/app/home/components/shared/AppCard";
import { RoleType } from "@/mock/roles";
import { PermissionType } from "@/mock/permissions";
import { useDispatch } from "@/store/hooks";
import { roleDeleteThunk } from "@/features/role/thunks";
import RoleAdd from "../../components/apps/roles/RoleAdd";

const drawerWidth = 240;
const secdrawerWidth = 320;

export default function Roles() {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  const [roles, setRoles] = useState<RoleType[]>([]);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [roleId, setRoleId] = useState("");
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    const sseRoles = new EventSource("http://127.0.0.1:5001/roles");
    const ssePermissions = new EventSource("http://127.0.0.1:5001/permissions");

    sseRoles.addEventListener("role_list", (event) => {
      setRoles((prevState) => [...prevState, JSON.parse(event.data)]);
    });
    sseRoles.addEventListener("close", (event) => {
      sseRoles.close();
    });

    ssePermissions.addEventListener("permission_list", (event) => {
      setPermissions((prevState) => [...prevState, JSON.parse(event.data)]);
    });
    ssePermissions.addEventListener("close", (event) => {
      ssePermissions.close();
    });

    return () => {
      sseRoles.close();
      ssePermissions.close();
    };
  }, []);

  const onDeleteClick = ({ id }: { id: string }) => {
    if (window.confirm("Are sure want to delete?")) {
      dispatch(roleDeleteThunk({ _id: id }));
      setRoles((prevState) => prevState.filter((item) => item._id !== id));
      setRoleId("");
      toastr.success("Record deleted success");
    }
  };

  const handleAddNewRole = useCallback(
    ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description: string;
    }) => {
      setRoles((prevState) => [
        ...prevState,
        { _id: id, name, description, permissions: [] },
      ]);
    },
    []
  );

  const handleChangeNameAndDescriptionById = useCallback(
    ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description: string;
    }) => {
      setRoles((prevState) =>
        prevState.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              name,
              description,
            };
          }

          return item;
        })
      );
    },
    []
  );

  return (
    <PageContainer title="Role" description="this is Role">
      <Breadcrumb title="Roles Application" subtitle="List Your Roles" />
      <AppCard>
        <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              position: "relative",
              zIndex: 2,
            },
            flexShrink: 0,
          }}
          variant={lgUp ? "permanent" : "temporary"}
        >
          <RoleAdd handleAddNewRole={handleAddNewRole} />
          <RoleFilter />
        </Drawer>

        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: "100%", md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <RoleSearch onClick={() => setLeftSidebarOpen(true)} />
          <RoleList
            data={roles}
            onDeleteClick={onDeleteClick}
            onRoleClick={({ id }) => setRoleId(id)}
          />
        </Box>

        <Drawer
          anchor="right"
          open={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
          variant={mdUp ? "permanent" : "temporary"}
          sx={{
            width: mdUp ? secdrawerWidth : "100%",
            zIndex: lgUp ? 0 : 1,
            flex: mdUp ? "auto" : "",
            [`& .MuiDrawer-paper`]: { width: "100%", position: "relative" },
          }}
        >
          {mdUp ? (
            ""
          ) : (
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: "block", md: "none", lg: "none" } }}
              >
                Back{" "}
              </Button>
            </Box>
          )}
          <RoleDetails
            roleId={roleId}
            permissions={permissions}
            onDeleteClick={onDeleteClick}
            handleChangeNameAndDescriptionById={
              handleChangeNameAndDescriptionById
            }
          />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
}
