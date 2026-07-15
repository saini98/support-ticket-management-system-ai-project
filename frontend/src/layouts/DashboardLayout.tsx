import { Box, Drawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardAppBar from "../components/layout/DashboardAppBar";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { DRAWER_WIDTH } from "../constants/layout";
import {
  DASHBOARD_SIDEBAR_BREAKPOINT,
  dashboardMainContentSx,
} from "../styles/dashboardResponsive";

function DashboardLayout() {
  const theme = useTheme();
  const location = useLocation();
  const isDesktopSidebar = useMediaQuery(
    theme.breakpoints.up(DASHBOARD_SIDEBAR_BREAKPOINT),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDesktopSidebar) {
      setMobileOpen(false);
    }
  }, [isDesktopSidebar]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardAppBar onMenuClick={handleDrawerToggle} />

      <Box
        component="nav"
        aria-label="dashboard navigation"
        sx={{
          width: { [DASHBOARD_SIDEBAR_BREAKPOINT]: DRAWER_WIDTH },
          flexShrink: { [DASHBOARD_SIDEBAR_BREAKPOINT]: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", [DASHBOARD_SIDEBAR_BREAKPOINT]: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
          <DashboardSidebar onNavigate={handleDrawerClose} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", [DASHBOARD_SIDEBAR_BREAKPOINT]: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
          <DashboardSidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            [DASHBOARD_SIDEBAR_BREAKPOINT]: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          minHeight: "100vh",
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
        <Box sx={dashboardMainContentSx}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
