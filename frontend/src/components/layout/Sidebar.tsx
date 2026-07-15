import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { DRAWER_WIDTH } from "../../constants/layout";
import { ROUTES } from "../../routes/paths";
import {
  SIDEBAR_MENU_ITEMS,
  type SidebarMenuItem,
} from "./sidebarMenuItems";

interface SidebarProps {
  items?: SidebarMenuItem[];
  title?: string;
  subtitle?: string;
  onNavigate?: () => void;
}

const isItemActive = (pathname: string, item: SidebarMenuItem): boolean => {
  if (!item.path || item.disabled) {
    return false;
  }

  if (item.path === ROUTES.DASHBOARD) {
    return pathname === ROUTES.DASHBOARD;
  }

  return pathname === item.path || pathname.startsWith(`${item.path}/`);
};

function Sidebar({
  items = SIDEBAR_MENU_ITEMS,
  title = "Support Tickets",
  subtitle = "Management System",
  onNavigate,
}: SidebarProps) {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="h6" component="div" noWrap>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1, py: 1 }}>
        {items.map((item) => {
          const selected = isItemActive(location.pathname, item);

          if (item.disabled || !item.path) {
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton disabled sx={{ borderRadius: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          }

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={selected}
                onClick={onNavigate}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Sidebar;
