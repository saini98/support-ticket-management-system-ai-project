import { Grid } from "@mui/material";

import ActivityTimeline from "./ActivityTimeline";
import AssignedEngineersGrid from "./AssignedEngineersGrid";
import DashboardChartsGrid from "./DashboardChartsGrid";
import DashboardSection from "./DashboardSection";
import DashboardStatsGrid from "./DashboardStatsGrid";
import QuickActions from "./QuickActions";
import RecentTickets from "./RecentTickets";
import {
  DashboardChartsSkeleton,
  EngineersCardsSkeleton,
  RecentTicketsTableSkeleton,
  StatisticsCardsSkeleton,
  TimelineSkeleton,
} from "./skeletons";
import { useDashboardData } from "../../hooks/useDashboardData";

function DashboardGridLayout() {
  const { data, loading, error, refetch } = useDashboardData();

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12}>
        <QuickActions onRefresh={refetch} refreshing={loading} />
      </Grid>

      <Grid item xs={12}>
        <DashboardSection title="Statistics Cards">
          {loading ? (
            <StatisticsCardsSkeleton />
          ) : (
            <DashboardStatsGrid
              stats={data.stats}
              loading={false}
              error={error}
            />
          )}
        </DashboardSection>
      </Grid>

      <Grid item xs={12}>
        <DashboardSection title="Charts">
          {loading ? (
            <DashboardChartsSkeleton />
          ) : (
            <DashboardChartsGrid
              statusChartData={data.statusChartData}
              priorityChartData={data.priorityChartData}
              weeklyTrendData={data.weeklyTrendData}
            />
          )}
        </DashboardSection>
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

export default DashboardGridLayout;
