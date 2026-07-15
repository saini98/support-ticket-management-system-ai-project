import type { TicketStatus } from "../../types/ticket.types";
import { TICKET_STATUS_LABELS } from "../../utils/ticket.utils";

export interface TicketStatusChartDatum {
  status: TicketStatus;
  label: string;
  value: number;
}

export const DUMMY_TICKET_STATUS_CHART_DATA: TicketStatusChartDatum[] = [
  { status: "OPEN", label: TICKET_STATUS_LABELS.OPEN, value: 42 },
  {
    status: "IN_PROGRESS",
    label: TICKET_STATUS_LABELS.IN_PROGRESS,
    value: 31,
  },
  { status: "RESOLVED", label: TICKET_STATUS_LABELS.RESOLVED, value: 38 },
  { status: "CLOSED", label: TICKET_STATUS_LABELS.CLOSED, value: 17 },
  { status: "CANCELLED", label: TICKET_STATUS_LABELS.CANCELLED, value: 8 },
];
