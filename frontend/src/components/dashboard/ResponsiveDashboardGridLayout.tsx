import { Grid } from "@mui/material";

import ActivityTimeline from "./ActivityTimeline";
import AssignedEngineersGrid from "./AssignedEngineersGrid";
import DashboardChartsGrid from "./DashboardChartsGrid";
import DashboardStatsGrid from "./DashboardStatsGrid";
import QuickActions from "./QuickActions";
import RecentTickets from "./RecentTickets";
import ResponsiveDashboardSection from "./ResponsiveDashboardSection";
import ResponsiveStatsGridContainer from "./ResponsiveStatsGridContainer";
import {
  DashboardChartsSkeleton,
  EngineersCardsSkeleton,
  RecentTicketsTableSkeleton,
  StatisticsCardsSkeleton,
  TimelineSkeleton,
} from "./skeletons";
import { useDashboardData } from "../../hooks/useDashboardData";

function ResponsiveDashboardGridLayout() {
  const { data, loading, error, refetch } = useDashboardData();

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3.5 }}
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <QuickActions onRefresh={refetch} refreshing={loading} />
      </Grid>

      <Grid item xs={12}>
        <ResponsiveDashboardSection title="Statistics Cards">
          <ResponsiveStatsGridContainer>
            {loading ? (
              <StatisticsCardsSkeleton />
            ) : (
              <DashboardStatsGrid
                stats={data.stats}
                loading={false}
                error={error}
              />
            )}
          </ResponsiveStatsGridContainer>
        </ResponsiveDashboardSection>
      </Grid>

      <Grid item xs={12}>
        <ResponsiveDashboardSection title="Charts">
          {loading ? (
            <DashboardChartsSkeleton />
          ) : (
            <DashboardChartsGrid
              statusChartData={data.statusChartData}
              priorityChartData={data.priorityChartData}
              weeklyTrendData={data.weeklyTrendData}
            />
          )}
        </ResponsiveDashboardSection>
      </Grid>

      <Grid item xs={12} lg={8}>
        {loading ? (
          <RecentTicketsTableSkeleton />
        ) : (
          <RecentTickets tickets={data.recentTickets} />
        )}
      </Grid>

      <Grid item xs={12} lg={4}>
        {loading ? (
          <EngineersCardsSkeleton />
        ) : (
          <AssignedEngineersGrid engineers={data.engineers} />
        )}
      </Grid>

      <Grid item xs={12}>
        {loading ? (
          <TimelineSkeleton />
        ) : (
          <ActivityTimeline activities={data.activities} />
        )}
      </Grid>
    </Grid>
  );
}

export default ResponsiveDashboardGridLayout;
