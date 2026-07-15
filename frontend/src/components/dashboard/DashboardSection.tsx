import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

import {
  DASHBOARD_BORDER_RADIUS,
  DASHBOARD_CARD_SHADOW,
  dashboardSectionTitleSx,
} from "../../styles/dashboardTokens";

interface DashboardSectionProps {
  title: string;
  minHeight?: number | { xs?: number; sm?: number; md?: number };
  children?: ReactNode;
}

function DashboardSection({
  title,
  minHeight = 160,
  children,
}: DashboardSectionProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, sm: 3 },
        height: "100%",
        minHeight: children ? undefined : minHeight,
        display: "flex",
        flexDirection: "column",
        borderRadius: DASHBOARD_BORDER_RADIUS,
        borderColor: "divider",
        boxShadow: DASHBOARD_CARD_SHADOW,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        component="h2"
        sx={dashboardSectionTitleSx}
      >
        {title}
      </Typography>
      {children ?? (
        <Box sx={{ flexGrow: 1 }} aria-label={`${title} content`} />
      )}
    </Paper>
  );
}

export default DashboardSection;
