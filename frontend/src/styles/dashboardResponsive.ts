import type { SxProps, Theme } from "@mui/material";

import {
  DASHBOARD_BORDER_RADIUS,
  DASHBOARD_CARD_SHADOW,
} from "./dashboardTokens";

export const DASHBOARD_SIDEBAR_BREAKPOINT: "md" | "lg" = "md";

export const dashboardMainContentSx: SxProps<Theme> = {
  flexGrow: 1,
  width: "100%",
  maxWidth: 1680,
  mx: "auto",
  px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
  py: { xs: 2, sm: 2.5, md: 3 },
};

export const dashboardPageShellSx: SxProps<Theme> = {
  "& .MuiCard-root": {
    borderRadius: DASHBOARD_BORDER_RADIUS,
  },
  "& .MuiPaper-root": {
    borderRadius: DASHBOARD_BORDER_RADIUS,
    boxShadow: DASHBOARD_CARD_SHADOW,
  },
  "& .MuiTypography-h4": {
    letterSpacing: "-0.02em",
  },
  "& .MuiTypography-h5": {
    letterSpacing: "-0.01em",
  },
  "& .MuiTypography-h6": {
    fontSize: { xs: "1rem", sm: "1.0625rem", md: "1.125rem" },
    fontWeight: 600,
    lineHeight: 1.35,
  },
  "& .MuiTypography-body2": {
    fontSize: { xs: "0.8125rem", md: "0.875rem" },
    lineHeight: 1.55,
  },
  "& .MuiTypography-caption": {
    lineHeight: 1.45,
  },
};

export const responsiveStatsGridSx: SxProps<Theme> = (theme) => ({
  "& .MuiGrid-item": {
    width: "100% !important",
    maxWidth: "100% !important",
    flexBasis: "100% !important",
    flexGrow: "0 !important",
    [theme.breakpoints.up("sm")]: {
      width: "50% !important",
      maxWidth: "50% !important",
      flexBasis: "50% !important",
    },
    [theme.breakpoints.up("lg")]: {
      width: "20% !important",
      maxWidth: "20% !important",
      flexBasis: "20% !important",
    },
  },
});

export const responsiveDashboardSectionSx: SxProps<Theme> = {
  "& .MuiPaper-root": {
    p: { xs: 2.5, sm: 3 },
    borderRadius: DASHBOARD_BORDER_RADIUS,
  },
  "& .MuiTypography-overline": {
    fontSize: { xs: "0.6875rem", sm: "0.75rem" },
    fontWeight: 700,
    letterSpacing: "0.06em",
  },
};

export const responsiveDashboardGridSx: SxProps<Theme> = {
  width: "100%",
};
