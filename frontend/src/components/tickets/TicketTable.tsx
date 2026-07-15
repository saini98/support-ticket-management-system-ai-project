import {
  Button,
  Paper,
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
import { ROUTES } from "../../routes/paths";
import type { Ticket } from "../../types/ticket.types";
import { formatTicketDate } from "../../utils/ticket.utils";

interface TicketTableProps {
  tickets: Ticket[];
}

function TicketTable({ tickets }: TicketTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} hover>
              <TableCell>
                <Typography fontWeight={600}>{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {ticket.description}
                </Typography>
              </TableCell>
              <TableCell>
                <StatusChip status={ticket.status} />
              </TableCell>
              <TableCell>
                <PriorityChip priority={ticket.priority} />
              </TableCell>
              <TableCell>
                {ticket.assignee?.name ?? "Unassigned"}
              </TableCell>
              <TableCell>{formatTicketDate(ticket.createdAt)}</TableCell>
              <TableCell align="right">
                <Button
                  component={RouterLink}
                  to={ROUTES.TICKET_DETAIL(ticket.id)}
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface TicketEmptyStateProps {
  hasFilters: boolean;
}

export function TicketEmptyState({ hasFilters }: TicketEmptyStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {hasFilters ? "No tickets match your filters" : "No tickets yet"}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {hasFilters
          ? "Try adjusting your search or status filter."
          : "Create a ticket to get started."}
      </Typography>
      {!hasFilters && (
        <Button component={RouterLink} to={ROUTES.CREATE_TICKET} variant="contained">
          Create Ticket
        </Button>
      )}
    </Paper>
  );
}

export default TicketTable;
