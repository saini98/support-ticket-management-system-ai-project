import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { ROUTES } from "../routes/paths";

function NotFoundPage() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button component={RouterLink} to={ROUTES.DASHBOARD} variant="contained">
        Go to Dashboard
      </Button>
    </>
  );
}

export default NotFoundPage;
