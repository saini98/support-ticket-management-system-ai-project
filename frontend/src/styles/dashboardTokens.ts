import type { SxProps, Theme } from "@mui/material";

export const DASHBOARD_BORDER_RADIUS = "12px";

export const DASHBOARD_TRANSITION =
  "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s ease";

export const DASHBOARD_CARD_SHADOW =
  "0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)";

export const DASHBOARD_CARD_SHADOW_HOVER =
  "0 4px 16px rgba(15, 23, 42, 0.08), 0 12px 32px rgba(15, 23, 42, 0.06)";

export const DASHBOARD_CARD_PADDING = { xs: 2.5, sm: 3 } as const;

export const dashboardCardSx = {
  height: "100%",
  borderRadius: DASHBOARD_BORDER_RADIUS,
  border: 1,
  borderColor: "divider",
  bgcolor: "background.paper",
  boxShadow: DASHBOARD_CARD_SHADOW,
  transition: DASHBOARD_TRANSITION,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: DASHBOARD_CARD_SHADOW_HOVER,
    borderColor: "primary.light",
  },
} as const;

export const dashboardCardStaticSx = {
  height: "100%",
  borderRadius: DASHBOARD_BORDER_RADIUS,
  border: 1,
  borderColor: "divider",
  bgcolor: "background.paper",
  boxShadow: DASHBOARD_CARD_SHADOW,
} as const;

export const dashboardCardTitleSx = {
  fontSize: { xs: "1rem", sm: "1.0625rem", md: "1.125rem" },
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "text.primary",
  lineHeight: 1.3,
  mb: 2.5,
} as const;

export const dashboardSectionTitleSx = {
  fontSize: { xs: "0.75rem", sm: "0.8125rem" },
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "text.secondary",
  mb: 2,
} as const;

export const dashboardIconBadgeSx = (
  mainColor: string,
  iconBackground: string,
): SxProps<Theme> => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: "10px",
  bgcolor: iconBackground,
  color: mainColor,
  flexShrink: 0,
  "& .MuiSvgIcon-root": {
    fontSize: 24,
    display: "block",
  },
});

export const dashboardButtonIconSx: SxProps<Theme> = {
  "& .MuiButton-startIcon": {
    marginRight: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  },
};
