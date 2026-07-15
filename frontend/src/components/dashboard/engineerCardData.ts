export interface EngineerCardData {
  id: string;
  name: string;
  role: string;
  assignedTickets: number;
  resolvedTickets: number;
}

export const DUMMY_ENGINEERS: EngineerCardData[] = [
  {
    id: "user-bob-developer",
    name: "Bob Developer",
    role: "Developer",
    assignedTickets: 14,
    resolvedTickets: 9,
  },
  {
    id: "user-carol-support",
    name: "Carol Support",
    role: "Support",
    assignedTickets: 18,
    resolvedTickets: 12,
  },
  {
    id: "user-eve-qa",
    name: "Eve QA",
    role: "QA",
    assignedTickets: 11,
    resolvedTickets: 8,
  },
  {
    id: "user-david-manager",
    name: "David Manager",
    role: "Manager",
    assignedTickets: 7,
    resolvedTickets: 5,
  },
];
