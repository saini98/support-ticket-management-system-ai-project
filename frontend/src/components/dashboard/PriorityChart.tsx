import {
  Box,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import DashboardCard from "../common/DashboardCard";
import DashboardCardTitle from "../common/DashboardCardTitle";
import type { TicketPriority } from "../../types/ticket.types";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";
import type { PriorityChartDatum } from "./priorityChartData";

type ChartDatum = PriorityChartDatum & { color: string };

const formatTooltipValue = (
  value: number | string | readonly (number | string)[] | undefined,
  name: string | number | undefined,
  item: { payload?: ChartDatum },
): [React.ReactNode, React.ReactNode] => {
  const formattedValue = Array.isArray(value) ? value.join(", ") : (value ?? 0);
  const label = item.payload?.label ?? name ?? "";

  return [formattedValue, label];
};

interface PriorityChartProps {
  title?: string;
  data: PriorityChartDatum[];
}

type PriorityPaletteKey = "error" | "warning" | "info" | "grey";

const PRIORITY_COLORS: Record<TicketPriority, PriorityPaletteKey> = {
  URGENT: "error",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "grey",
};

function PriorityChart({
  title = "Ticket Priority Distribution",
  data,
}: PriorityChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getPriorityColor = (priority: TicketPriority): string => {
    const colorKey = PRIORITY_COLORS[priority];

    if (colorKey === "grey") {
      return theme.palette.grey[500];
    }

    return theme.palette[colorKey].main;
  };

  const chartData = data.map((item) => ({
    ...item,
    color: getPriorityColor(item.priority),
  }));

  return (
    <DashboardCard interactive={false}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING, height: "100%" }}>
        <DashboardCardTitle>{title}</DashboardCardTitle>

        <Box
          sx={{
            width: "100%",
            height: { xs: 280, sm: 320 },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy={isMobile ? "45%" : "50%"}
                innerRadius={isMobile ? 50 : 70}
                outerRadius={isMobile ? 80 : 100}
                paddingAngle={2}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.priority} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltipValue} />
              <Legend
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                layout={isMobile ? "horizontal" : "vertical"}
                wrapperStyle={{
                  fontSize: isMobile ? 12 : 14,
                  paddingTop: isMobile ? 8 : 0,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </DashboardCard>
  );
}

export default PriorityChart;
