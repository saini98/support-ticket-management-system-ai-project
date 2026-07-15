import { Typography, type TypographyProps } from "@mui/material";

import { dashboardCardTitleSx } from "../../styles/dashboardTokens";

interface DashboardCardTitleProps extends TypographyProps {
  children: React.ReactNode;
}

function DashboardCardTitle({
  children,
  component = "h3",
  variant = "h6",
  gutterBottom = false,
  sx,
  ...props
}: DashboardCardTitleProps) {
  return (
    <Typography
      variant={variant}
      component={component}
      gutterBottom={gutterBottom}
      sx={{
        ...dashboardCardTitleSx,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default DashboardCardTitle;
