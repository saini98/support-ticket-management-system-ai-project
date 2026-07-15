import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import CreateTicketForm from "../components/tickets/CreateTicketForm";
import { ROUTES } from "../routes/paths";

function CreateTicketPage() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const handleSuccess = (ticketId: string) => {
    setCreatedTicketId(ticketId);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Ticket
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Submit a new support ticket with title, description, priority, and
        assignment details.
      </Typography>

      <CreateTicketForm onSuccess={handleSuccess} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          action={
            createdTicketId ? (
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate(ROUTES.TICKET_DETAIL(createdTicketId))}
              >
                View
              </Button>
            ) : undefined
          }
        >
          Ticket created successfully
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 2 }}>
        <Button component={RouterLink} to={ROUTES.TICKETS}>
          Back to Ticket List
        </Button>
      </Box>
    </Box>
  );
}

export default CreateTicketPage;
