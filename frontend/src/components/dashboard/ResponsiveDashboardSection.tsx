import { Box } from "@mui/material";
import type { ReactNode } from "react";

import { responsiveDashboardSectionSx } from "../../styles/dashboardResponsive";
import DashboardSection from "./DashboardSection";

interface ResponsiveDashboardSectionProps {
  title: string;
  children?: ReactNode;
}

function ResponsiveDashboardSection({
  title,
  children,
}: ResponsiveDashboardSectionProps) {
  return (
    <Box sx={responsiveDashboardSectionSx}>
      <DashboardSection title={title}>{children}</DashboardSection>
    </Box>
  );
}

export default ResponsiveDashboardSection;
