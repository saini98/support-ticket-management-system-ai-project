import { Box, Card, CardContent, Skeleton } from "@mui/material";

import { DASHBOARD_CARD_PADDING } from "../../../styles/dashboardTokens";
import { dashboardSkeletonCardSx } from "./skeletonStyles";

function StatCardSkeleton() {
  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="55%" height={20} />
            <Skeleton variant="text" width="35%" height={44} sx={{ my: 0.5 }} />
            <Skeleton variant="text" width="70%" height={16} />
          </Box>
          <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: "10px" }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCardSkeleton;
