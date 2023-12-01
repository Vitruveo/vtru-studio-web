"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import RoleDetails from "@/app/(DashboardLayout)/components/apps/roles/RoleDetails";
import RoleList from "@/app/(DashboardLayout)/components/apps/roles/RoleList";
import RoleSearch from "@/app/(DashboardLayout)/components/apps/roles/RoleSearch";
import RoleFilter from "@/app/(DashboardLayout)/components/apps/roles/RoleFilter";
import AppCard from "@/app/(DashboardLayout)/components/shared/AppCard";

const drawerWidth = 240;
const secdrawerWidth = 320;

export default function Roles() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <PageContainer title="Role" description="this is Role">
      <Breadcrumb title="Roles Application" subtitle="List Your Roles" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left Part */}
        {/* ------------------------------------------- */}

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
          <RoleFilter />
        </Drawer>
        {/* ------------------------------------------- */}
        {/* Middle part */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: "100%", md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <RoleSearch onClick={() => setLeftSidebarOpen(true)} />
          <RoleList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
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
          {/* back btn Part */}
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
          <RoleDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
}
