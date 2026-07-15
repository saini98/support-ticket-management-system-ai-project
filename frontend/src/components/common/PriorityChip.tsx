import { Chip, type ChipProps } from "@mui/material";

import type { TicketPriority } from "../../types/ticket.types";
import { TICKET_PRIORITY_LABELS } from "../../utils/ticket.utils";

const PRIORITY_COLORS: Record<
  TicketPriority,
  ChipProps["color"]
> = {
  LOW: "default",
  MEDIUM: "info",
  HIGH: "warning",
  URGENT: "error",
};

interface PriorityChipProps {
  priority: TicketPriority;
  size?: ChipProps["size"];
}

function PriorityChip({ priority, size = "small" }: PriorityChipProps) {
  return (
    <Chip
      label={TICKET_PRIORITY_LABELS[priority]}
      color={PRIORITY_COLORS[priority]}
      size={size}
    />
  );
}

export default PriorityChip;
