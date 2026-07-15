import { Grid } from "@mui/material";

import ChartSkeleton from "./ChartSkeleton";

function DashboardChartsSkeleton() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12} sm={6} lg={4}>
        <ChartSkeleton variant="pie" />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <ChartSkeleton variant="pie" />
      </Grid>

      <Grid item xs={12} sm={12} lg={4}>
        <ChartSkeleton variant="line" />
      </Grid>
    </Grid>
  );
}

export default DashboardChartsSkeleton;
