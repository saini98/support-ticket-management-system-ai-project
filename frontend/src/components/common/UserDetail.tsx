import { Box, Typography } from "@mui/material";

import type { UserSummary } from "../../types/ticket.types";
import { formatUserLabel } from "../../utils/user.utils";

interface UserDetailProps {
  user?: UserSummary | null;
  emptyLabel?: string;
}

function UserDetail({ user, emptyLabel = "Unassigned" }: UserDetailProps) {
  if (!user) {
    return <Typography>{emptyLabel}</Typography>;
  }

  return (
    <Box>
      <Typography>{formatUserLabel(user)}</Typography>
      <Typography variant="body2" color="text.secondary">
        User ID: {user.id}
      </Typography>
    </Box>
  );
}

export default UserDetail;
