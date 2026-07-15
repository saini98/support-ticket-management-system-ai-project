export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  TICKETS: "/tickets",
  CREATE_TICKET: "/tickets/new",
  USERS: "/users",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  TICKET_DETAIL: (id: string) => `/tickets/${id}`,
  EDIT_TICKET: (id: string) => `/tickets/${id}/edit`,
} as const;
