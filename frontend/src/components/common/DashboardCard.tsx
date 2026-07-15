import { Card, type CardProps } from "@mui/material";

import {
  dashboardCardSx,
  dashboardCardStaticSx,
} from "../../styles/dashboardTokens";

interface DashboardCardProps extends CardProps {
  interactive?: boolean;
}

function DashboardCard({
  interactive = true,
  elevation = 0,
  sx,
  ...props
}: DashboardCardProps) {
  const baseSx = interactive ? dashboardCardSx : dashboardCardStaticSx;

  return (
    <Card
      elevation={elevation}
      sx={{
        ...baseSx,
        ...sx,
      }}
      {...props}
    />
  );
}

export default DashboardCard;
