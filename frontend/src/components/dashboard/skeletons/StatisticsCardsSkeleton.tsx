import { Grid } from "@mui/material";

import StatCardSkeleton from "./StatCardSkeleton";

interface StatisticsCardsSkeletonProps {
  count?: number;
}

function StatisticsCardsSkeleton({ count = 5 }: StatisticsCardsSkeletonProps) {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {Array.from({ length: count }, (_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} xl={2}>
          <StatCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default StatisticsCardsSkeleton;
