import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComments } from "../../hooks/useComments";

interface CommentsProps {
  ticketId: string;
}

function Comments({ ticketId }: CommentsProps) {
  const { comments, loading, refreshing, error, refetch } = useComments(ticketId);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleCommentCreated = async () => {
    await refetch();
    setShowSuccessAlert(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="h6">
          Comments ({comments.length})
        </Typography>
        {refreshing && <CircularProgress size={20} />}
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
        >
          Comment posted successfully
        </Alert>
      )}

      {!error && <CommentList comments={comments} />}

      <CommentForm ticketId={ticketId} onSuccess={handleCommentCreated} />
    </Stack>
  );
}

export default Comments;
