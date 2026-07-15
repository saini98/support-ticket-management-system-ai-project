import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";
import DashboardCardTitle from "../common/DashboardCardTitle";
import { ROUTES } from "../../routes/paths";
import {
  DASHBOARD_CARD_PADDING,
  dashboardButtonIconSx,
} from "../../styles/dashboardTokens";

interface QuickActionsProps {
  onRefresh?: () => void | Promise<void>;
  refreshing?: boolean;
}

function QuickActions({ onRefresh, refreshing = false }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(ROUTES.TICKETS, { state: { focusSearch: true } });
  };

  const handleRefresh = () => {
    void onRefresh?.();
  };

  return (
    <DashboardCard interactive={false}>
      <CardContent sx={{ p: DASHBOARD_CARD_PADDING }}>
        <DashboardCardTitle>Quick Actions</DashboardCardTitle>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={RouterLink}
              to={ROUTES.CREATE_TICKET}
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              sx={dashboardButtonIconSx}
            >
              Create Ticket
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              component={RouterLink}
              to={ROUTES.TICKETS}
              variant="outlined"
              fullWidth
              startIcon={<ListIcon />}
              sx={dashboardButtonIconSx}
            >
              View Tickets
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={dashboardButtonIconSx}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                refreshing ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <RefreshIcon />
                )
              }
              onClick={handleRefresh}
              disabled={refreshing || !onRefresh}
              sx={dashboardButtonIconSx}
            >
              Refresh Dashboard
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  );
}

export default QuickActions;
