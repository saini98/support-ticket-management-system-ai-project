import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { DRAWER_WIDTH } from "../../constants/layout";

interface HeaderProps {
  title?: string;
  welcomeMessage?: string;
  userName?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  onLogout?: () => void;
  drawerWidth?: number;
}

function Header({
  title = "Dashboard",
  welcomeMessage = "Welcome back! Here's what's happening today.",
  userName = "User",
  notificationCount = 3,
  onMenuClick,
  onLogout,
  drawerWidth = DRAWER_WIDTH,
}: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 64 } }}>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: { xs: 0, sm: 1 }, display: { md: "none" } }}
            aria-label="open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" component="h1" noWrap>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {welcomeMessage}
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1 }}
          sx={{ flexShrink: 0 }}
        >
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: { xs: 0.5, sm: 1 } }}
          >
            <Avatar
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                bgcolor: "primary.main",
                fontSize: "0.95rem",
              }}
            >
              {userName.charAt(0)}
            </Avatar>
            <Typography
              variant="body2"
              fontWeight={500}
              noWrap
              sx={{ display: { xs: "none", sm: "block" }, maxWidth: 140 }}
            >
              {userName}
            </Typography>

            {onLogout && (
              <Tooltip title="Sign out">
                <IconButton
                  color="inherit"
                  aria-label="sign out"
                  onClick={onLogout}
                  size="small"
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
