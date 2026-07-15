import { Box } from "@mui/material";
import type { ReactNode } from "react";

import { dashboardPageShellSx } from "../../styles/dashboardResponsive";

interface DashboardResponsiveShellProps {
  children: ReactNode;
}

function DashboardResponsiveShell({ children }: DashboardResponsiveShellProps) {
  return <Box sx={dashboardPageShellSx}>{children}</Box>;
}

export default DashboardResponsiveShell;
