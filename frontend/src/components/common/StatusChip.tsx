import { Chip, type ChipProps } from "@mui/material";

import type { TicketStatus } from "../../types/ticket.types";
import { TICKET_STATUS_LABELS } from "../../utils/ticket.utils";

const STATUS_COLORS: Record<
  TicketStatus,
  ChipProps["color"]
> = {
  OPEN: "info",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "default",
  CANCELLED: "error",
};

interface StatusChipProps {
  status: TicketStatus;
  size?: ChipProps["size"];
}

function StatusChip({ status, size = "small" }: StatusChipProps) {
  return (
    <Chip
      label={TICKET_STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size={size}
      variant="outlined"
    />
  );
}

export default StatusChip;
