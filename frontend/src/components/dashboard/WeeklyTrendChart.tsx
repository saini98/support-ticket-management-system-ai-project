import {
  Box,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardCard from "../common/DashboardCard";
import DashboardCardTitle from "../common/DashboardCardTitle";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";
import type { WeeklyTrendChartDatum } from "./weeklyTrendChartData";

const formatTooltipValue = (
  value: number | string | readonly (number | string)[] | undefined,
): [React.ReactNode, React.ReactNode] => {
  const formattedValue = Array.isArray(value) ? value.join(", ") : (value ?? 0);

  return [formattedValue, "Tickets Created"];
};

interface WeeklyTrendChartProps {
  title?: string;
  data: WeeklyTrendChartDatum[];
}

function WeeklyTrendChart({
  title = "Weekly Ticket Trend",
  data,
}: WeeklyTrendChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DashboardCard interactive={false}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING, height: "100%" }}>
        <DashboardCardTitle>{title}</DashboardCardTitle>

        <Box
          sx={{
            width: "100%",
            height: { xs: 260, sm: 300 },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 8,
                right: isMobile ? 8 : 16,
                left: isMobile ? -16 : 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: isMobile ? 11 : 12 }}
                stroke={theme.palette.text.secondary}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: isMobile ? 11 : 12 }}
                stroke={theme.palette.text.secondary}
                width={isMobile ? 32 : 40}
              />
              <Tooltip formatter={formatTooltipValue} />
              <Line
                type="monotone"
                dataKey="tickets"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </DashboardCard>
  );
}

export default WeeklyTrendChart;
