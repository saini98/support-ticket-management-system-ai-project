import { Box } from "@mui/material";
import type { ReactNode } from "react";

import { responsiveStatsGridSx } from "../../styles/dashboardResponsive";

interface ResponsiveStatsGridContainerProps {
  children: ReactNode;
}

function ResponsiveStatsGridContainer({
  children,
}: ResponsiveStatsGridContainerProps) {
  return <Box sx={responsiveStatsGridSx}>{children}</Box>;
}

export default ResponsiveStatsGridContainer;
