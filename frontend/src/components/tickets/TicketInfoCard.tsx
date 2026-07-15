import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import PriorityChip from "../common/PriorityChip";
import StatusChip from "../common/StatusChip";
import UserDetail from "../common/UserDetail";
import { ROUTES } from "../../routes/paths";
import type { Ticket } from "../../types/ticket.types";
import { formatTicketDate, formatTicketNumber } from "../../utils/ticket.utils";

interface TicketInfoCardProps {
  ticket: Ticket;
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography component="div">{value}</Typography>
    </Box>
  );
}

function TicketInfoCard({ ticket }: TicketInfoCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Ticket #{formatTicketNumber(ticket.id)}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {ticket.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <StatusChip status={ticket.status} />
            <PriorityChip priority={ticket.priority} />
          </Stack>
        </Box>

        <Button
          component={RouterLink}
          to={ROUTES.EDIT_TICKET(ticket.id)}
          variant="contained"
          startIcon={<EditIcon />}
        >
          Update
        </Button>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {ticket.description}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem label="Status" value={<StatusChip status={ticket.status} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem
            label="Assigned User"
            value={<UserDetail user={ticket.assignee} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem
            label="Creator"
            value={<UserDetail user={ticket.creator} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem label="Created" value={formatTicketDate(ticket.createdAt)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem label="Last Updated" value={formatTicketDate(ticket.updatedAt)} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TicketInfoCard;
