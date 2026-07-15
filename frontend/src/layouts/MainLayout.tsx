import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes/paths";

function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Support Tickets
          </Typography>
          {user && (
            <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
              {user.name}
            </Typography>
          )}
          <Button color="inherit" component={RouterLink} to={ROUTES.DASHBOARD}>
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to={ROUTES.TICKETS}>
            Tickets
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to={ROUTES.CREATE_TICKET}
          >
            Create Ticket
          </Button>
          <Button color="inherit" onClick={logout}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;
