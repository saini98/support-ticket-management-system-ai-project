import { Card, CardContent, Grid, Skeleton } from "@mui/material";

import EngineerCardSkeleton from "./EngineerCardSkeleton";
import { dashboardSkeletonCardSx } from "./skeletonStyles";

interface EngineersCardsSkeletonProps {
  count?: number;
}

function EngineersCardsSkeleton({ count = 4 }: EngineersCardsSkeletonProps) {
  return (
    <Card elevation={0} sx={dashboardSkeletonCardSx}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />

        <Grid container spacing={2} alignItems="stretch">
          {Array.from({ length: count }, (_, index) => (
            <Grid key={index} item xs={12} sm={6} lg={12}>
              <EngineerCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EngineersCardsSkeleton;
