import AssessmentIcon from "@mui/icons-material/Assessment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";

import { ROUTES } from "../../routes/paths";

export interface SidebarMenuItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactElement;
  disabled?: boolean;
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    id: "tickets",
    label: "Tickets",
    path: ROUTES.TICKETS,
    icon: <ConfirmationNumberIcon />,
  },
  {
    id: "create-ticket",
    label: "Create Ticket",
    path: ROUTES.CREATE_TICKET,
    icon: <PostAddIcon />,
  },
  {
    id: "users",
    label: "Users",
    path: ROUTES.USERS,
    icon: <PeopleIcon />,
    disabled: true,
  },
  {
    id: "reports",
    label: "Reports",
    path: ROUTES.REPORTS,
    icon: <AssessmentIcon />,
    disabled: true,
  },
  {
    id: "settings",
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: <SettingsIcon />,
    disabled: true,
  },
];
