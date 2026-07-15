import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SyncIcon from "@mui/icons-material/Sync";
import {
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import type { ReactElement } from "react";

import DashboardCard from "../common/DashboardCard";
import DashboardCardTitle from "../common/DashboardCardTitle";
import { formatTicketDate } from "../../utils/ticket.utils";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";
import type { ActivityTimelineItem, ActivityType } from "./activityTimelineData";

type ActivityColor = "primary" | "info" | "secondary" | "warning";

interface ActivityConfig {
  label: string;
  icon: ReactElement;
  color: ActivityColor;
}

const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
  TICKET_CREATED: {
    label: "Ticket Created",
    icon: <PostAddIcon fontSize="small" />,
    color: "primary",
  },
  TICKET_ASSIGNED: {
    label: "Ticket Assigned",
    icon: <PersonAddIcon fontSize="small" />,
    color: "info",
  },
  COMMENT_ADDED: {
    label: "Comment Added",
    icon: <CommentIcon fontSize="small" />,
    color: "secondary",
  },
  STATUS_UPDATED: {
    label: "Status Updated",
    icon: <SyncIcon fontSize="small" />,
    color: "warning",
  },
};

const timelineDotSx = {
  m: 0,
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
} as const;

interface ActivityTimelineProps {
  title?: string;
  activities?: ActivityTimelineItem[];
}

function ActivityTimeline({
  title = "Activity Timeline",
  activities = [],
}: ActivityTimelineProps) {
  return (
    <DashboardCard interactive={false}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING, height: "100%" }}>
        <DashboardCardTitle>{title}</DashboardCardTitle>

        {activities.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              No recent activity yet. Ticket and comment updates will appear here.
            </Typography>
          </Box>
        ) : (
          <Timeline
          position="right"
          sx={{
            m: 0,
            p: 0,
            "& .MuiTimelineItem-root:before": {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {activities.map((activity, index) => {
            const config = ACTIVITY_CONFIG[activity.type];

            return (
              <TimelineItem key={activity.id}>
                <TimelineSeparator>
                  <TimelineDot color={config.color} sx={timelineDotSx}>
                    {config.icon}
                  </TimelineDot>
                  {index < activities.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: "divider" }} />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ py: 1.5, px: 2 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ mb: 0.5, lineHeight: 1.4 }}
                  >
                    {config.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 0.75, lineHeight: 1.55 }}
                  >
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTicketDate(activity.time)}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
        )}
      </CardContent>
    </DashboardCard>
  );
}

export default ActivityTimeline;
