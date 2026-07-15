import {
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";

import DashboardCard from "../common/DashboardCard";
import DashboardIconBadge from "../common/DashboardIconBadge";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";

type PaletteColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactElement;
  color: PaletteColor | string;
  subtitle: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <DashboardCard>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{
                display: "block",
                lineHeight: 1.4,
                letterSpacing: "0.04em",
                mb: 0.75,
              }}
              noWrap
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              component="p"
              sx={{
                fontWeight: 700,
                lineHeight: 1.15,
                mb: 0.75,
                color: "text.primary",
              }}
            >
              {value}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", lineHeight: 1.4 }}
            >
              {subtitle}
            </Typography>
          </Box>

          <DashboardIconBadge icon={icon} color={color} />
        </Box>
      </CardContent>
    </DashboardCard>
  );
}

export default StatCard;
