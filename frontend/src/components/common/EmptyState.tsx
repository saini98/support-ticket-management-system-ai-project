import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  illustration?: ReactNode;
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  illustration,
}: EmptyStateProps) {
  const showAction = Boolean(actionLabel && (onAction || actionHref));

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
          {illustration ?? (
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "divider",
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <InboxOutlinedIcon sx={{ fontSize: 48 }} />
            </Box>
          )}
        </Box>

        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ maxWidth: 420, mx: "auto", mb: showAction ? 3 : 0 }}
        >
          {description}
        </Typography>

        {showAction &&
          (actionHref ? (
            <Button
              component={RouterLink}
              to={actionHref}
              variant="contained"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          ) : (
            <Button variant="contained" onClick={onAction}>
              {actionLabel}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}

export default EmptyState;
