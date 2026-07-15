import { Box, Card, CardContent, Skeleton } from "@mui/material";

import { dashboardSkeletonCardSx } from "./skeletonStyles";

interface ChartSkeletonProps {
  variant?: "pie" | "line";
}

function ChartSkeleton({ variant = "pie" }: ChartSkeletonProps) {
  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: { xs: 260, sm: 300 },
          }}
        >
          {variant === "pie" ? (
            <Skeleton variant="circular" width={160} height={160} />
          ) : (
            <Skeleton
              variant="rounded"
              width="100%"
              height="100%"
              sx={{ maxHeight: 260 }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChartSkeleton;
