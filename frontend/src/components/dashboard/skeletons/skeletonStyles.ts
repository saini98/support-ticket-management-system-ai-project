import {
  DASHBOARD_BORDER_RADIUS,
  DASHBOARD_CARD_SHADOW,
} from "../../../styles/dashboardTokens";

export const dashboardSkeletonCardSx = {
  height: "100%",
  borderRadius: DASHBOARD_BORDER_RADIUS,
  border: 1,
  borderColor: "divider",
  boxShadow: DASHBOARD_CARD_SHADOW,
} as const;
