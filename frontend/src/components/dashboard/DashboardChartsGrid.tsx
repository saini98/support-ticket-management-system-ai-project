import { Grid } from "@mui/material";

import type { PriorityChartDatum } from "./priorityChartData";
import PriorityChart from "./PriorityChart";
import type { TicketStatusChartDatum } from "./ticketStatusChartData";
import TicketStatusChart from "./TicketStatusChart";
import type { WeeklyTrendChartDatum } from "./weeklyTrendChartData";
import WeeklyTrendChart from "./WeeklyTrendChart";

interface DashboardChartsGridProps {
  statusChartData: TicketStatusChartDatum[];
  priorityChartData: PriorityChartDatum[];
  weeklyTrendData: WeeklyTrendChartDatum[];
}

function DashboardChartsGrid({
  statusChartData,
  priorityChartData,
  weeklyTrendData,
}: DashboardChartsGridProps) {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12} sm={6} lg={4}>
        <TicketStatusChart data={statusChartData} />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <PriorityChart data={priorityChartData} />
      </Grid>

      <Grid item xs={12} sm={12} lg={4}>
        <WeeklyTrendChart data={weeklyTrendData} />
      </Grid>
    </Grid>
  );
}

export default DashboardChartsGrid;
