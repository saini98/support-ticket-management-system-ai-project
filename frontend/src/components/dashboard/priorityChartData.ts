import type { TicketPriority } from "../../types/ticket.types";

export interface PriorityChartDatum {
  priority: TicketPriority;
  label: string;
  value: number;
}

export const PRIORITY_CHART_LABELS: Record<TicketPriority, string> = {
  URGENT: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export const DUMMY_PRIORITY_CHART_DATA: PriorityChartDatum[] = [
  { priority: "URGENT", label: PRIORITY_CHART_LABELS.URGENT, value: 12 },
  { priority: "HIGH", label: PRIORITY_CHART_LABELS.HIGH, value: 28 },
  { priority: "MEDIUM", label: PRIORITY_CHART_LABELS.MEDIUM, value: 45 },
  { priority: "LOW", label: PRIORITY_CHART_LABELS.LOW, value: 43 },
];
