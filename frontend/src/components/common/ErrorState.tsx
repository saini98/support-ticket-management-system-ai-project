import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

interface ErrorStateProps {
  message: string;
  title?: string;
  retryLabel?: string;
  onRetry?: () => void | Promise<void>;
  retrying?: boolean;
}

function ErrorState({
  message,
  title = "Something went wrong",
  retryLabel = "Retry",
  onRetry,
  retrying = false,
}: ErrorStateProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardContent
        sx={{
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 3 },
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "error.light",
              color: "error.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 40 }} />
          </Box>
        </Box>

        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ maxWidth: 420, mx: "auto", mb: onRetry ? 3 : 0 }}
        >
          {message}
        </Typography>

        {onRetry && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => void onRetry()}
            disabled={retrying}
            startIcon={
              retrying ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <RefreshIcon />
              )
            }
          >
            {retryLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default ErrorState;
