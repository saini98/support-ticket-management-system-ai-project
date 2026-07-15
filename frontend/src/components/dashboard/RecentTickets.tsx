import {
  Box,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import PriorityChip from "../common/PriorityChip";
import StatusChip from "../common/StatusChip";
import DashboardCard from "../common/DashboardCard";
import DashboardCardTitle from "../common/DashboardCardTitle";
import { ROUTES } from "../../routes/paths";
import { formatTicketDate, formatTicketNumber } from "../../utils/ticket.utils";
import { DASHBOARD_CARD_PADDING } from "../../styles/dashboardTokens";
import type { RecentTicketRow } from "./recentTicketsData";

interface RecentTicketsProps {
  title?: string;
  tickets?: RecentTicketRow[];
  maxRows?: number;
}

const tableHeadCellSx = {
  fontWeight: 600,
  fontSize: "0.75rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "text.secondary",
  borderBottom: 1,
  borderColor: "divider",
  py: 1.5,
} as const;

function RecentTickets({
  title = "Recent Tickets",
  tickets = [],
  maxRows = 5,
}: RecentTicketsProps) {
  const visibleTickets = tickets.slice(0, maxRows);

  return (
    <DashboardCard interactive={false}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING, height: "100%" }}>
        <DashboardCardTitle>{title}</DashboardCardTitle>

        {visibleTickets.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              No tickets found. Create a ticket to see recent activity here.
            </Typography>
            <Button
              component={RouterLink}
              to={ROUTES.CREATE_TICKET}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Create Ticket
            </Button>
          </Box>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeadCellSx}>Ticket #</TableCell>
                <TableCell sx={tableHeadCellSx}>Title</TableCell>
                <TableCell sx={tableHeadCellSx}>Priority</TableCell>
                <TableCell sx={tableHeadCellSx}>Status</TableCell>
                <TableCell sx={tableHeadCellSx}>Assigned To</TableCell>
                <TableCell sx={tableHeadCellSx}>Created Date</TableCell>
                <TableCell align="right" sx={tableHeadCellSx}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleTickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  hover
                  sx={{
                    transition: "background-color 0.2s ease",
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      #{formatTicketNumber(ticket.id)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {ticket.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <PriorityChip priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusChip status={ticket.status} />
                  </TableCell>
                  <TableCell>{ticket.assignedTo}</TableCell>
                  <TableCell>{formatTicketDate(ticket.createdAt)}</TableCell>
                  <TableCell align="right">
                    <Button
                      component={RouterLink}
                      to={ROUTES.TICKET_DETAIL(ticket.id)}
                      size="small"
                      variant="outlined"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </CardContent>
    </DashboardCard>
  );
}

export default RecentTickets;
