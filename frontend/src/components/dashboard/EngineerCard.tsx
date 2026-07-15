import {
  Avatar,
  Box,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DashboardCard from "../common/DashboardCard";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";

export interface EngineerCardProps {
  name: string;
  role: string;
  assignedTickets: number;
  resolvedTickets: number;
}

function EngineerCard({
  name,
  role,
  assignedTickets,
  resolvedTickets,
}: EngineerCardProps) {
  return (
    <DashboardCard>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {name.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {role}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2.5, borderColor: "divider" }} />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {assignedTickets}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Assigned Tickets
            </Typography>
          </Box>

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="success.main"
              sx={{ lineHeight: 1.2 }}
            >
              {resolvedTickets}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Resolved Tickets
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
}

export default EngineerCard;
