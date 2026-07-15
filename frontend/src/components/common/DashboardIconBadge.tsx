import { Box, alpha, useTheme } from "@mui/material";
import type { ReactElement } from "react";

import { dashboardIconBadgeSx } from "../../styles/dashboardTokens";

type PaletteColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

const PALETTE_COLORS: PaletteColor[] = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

const isPaletteColor = (color: string): color is PaletteColor =>
  PALETTE_COLORS.includes(color as PaletteColor);

interface DashboardIconBadgeProps {
  icon: ReactElement;
  color: PaletteColor | string;
}

function DashboardIconBadge({ icon, color }: DashboardIconBadgeProps) {
  const theme = useTheme();

  const mainColor = isPaletteColor(color)
    ? theme.palette[color].main
    : color;

  const iconBackground = alpha(mainColor, 0.1);

  return (
    <Box sx={dashboardIconBadgeSx(mainColor, iconBackground)}>{icon}</Box>
  );
}

export default DashboardIconBadge;
