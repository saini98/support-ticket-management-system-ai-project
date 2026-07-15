import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LockIcon from "@mui/icons-material/Lock";
import { Alert, Box, Grid } from "@mui/material";
import type { ReactElement } from "react";

import type { TicketStats } from "../../utils/ticketStats.utils";
import { StatisticsCardsSkeleton } from "./skeletons";
import StatCard from "./StatCard";

type StatColor = "primary" | "info" | "warning" | "success" | "secondary";

interface StatConfig {
  id: string;
  title: string;
  icon: ReactElement;
  color: StatColor;
  subtitle: string;
  getValue: (stats: TicketStats) => number;
}

interface DashboardStatsGridProps {
  stats: TicketStats;
  loading: boolean;
  error: string | null;
}

const STAT_CONFIG: StatConfig[] = [
  {
    id: "total",
    title: "Total Tickets",
    icon: <ConfirmationNumberIcon />,
    color: "primary",
    subtitle: "All tickets in the system",
    getValue: (stats) => stats.total,
  },
  {
    id: "open",
    title: "Open Tickets",
    icon: <FiberNewIcon />,
    color: "info",
    subtitle: "Awaiting assignment or review",
    getValue: (stats) => stats.open,
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: <AutorenewIcon />,
    color: "warning",
    subtitle: "Currently being worked on",
    getValue: (stats) => stats.inProgress,
  },
  {
    id: "resolved",
    title: "Resolved",
    icon: <CheckCircleIcon />,
    color: "success",
    subtitle: "Successfully resolved tickets",
    getValue: (stats) => stats.resolved,
  },
  {
    id: "closed",
    title: "Closed",
    icon: <LockIcon />,
    color: "secondary",
    subtitle: "Closed and archived tickets",
    getValue: (stats) => stats.closed,
  },
];

function DashboardStatsGrid({
  stats,
  loading,
  error,
}: DashboardStatsGridProps) {

  if (loading) {
    return <StatisticsCardsSkeleton />;
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} alignItems="stretch">
        {STAT_CONFIG.map((stat) => (
          <Grid key={stat.id} item xs={12} sm={6} md={4} xl={2}>
            <StatCard
              title={stat.title}
              value={stat.getValue(stats)}
              icon={stat.icon}
              color={stat.color}
              subtitle={stat.subtitle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DashboardStatsGrid;
