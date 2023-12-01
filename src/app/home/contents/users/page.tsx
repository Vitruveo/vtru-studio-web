"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageContainer from "@/app/home/components/container/PageContainer";
import Breadcrumb from "@/app/home/layout/shared/breadcrumb/Breadcrumb";
import UserDetails from "@/app/home/components/apps/users/UserDetails";
import UserList from "@/app/home/components/apps/users/UsertList";
import UserSearch from "@/app/home/components/apps/users/UserSearch";
import UserFilter from "@/app/home/components/apps/users/UserFilter";
import AppCard from "@/app/home/components/shared/AppCard";

const drawerWidth = 240;
const secdrawerWidth = 320;

export default function Users() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <PageContainer title="User" description="this is Users">
      <Breadcrumb title="Users Application" subtitle="List Your Users" />
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
          <UserFilter />
        </Drawer>

        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: "100%", md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <UserSearch onClick={() => setLeftSidebarOpen(true)} />
          <UserList showrightSidebar={() => setRightSidebarOpen(true)} />
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
          <UserDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
}
