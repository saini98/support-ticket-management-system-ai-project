import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import UserSelectField from "../common/UserSelectField";
import { useTicketUsers } from "../../hooks/useTicketUsers";
import { commentApi } from "../../services/comment.service";
import { ApiError } from "../../types/api.types";
import type { CreateCommentPayload } from "../../types/comment.types";

interface CommentFormValues {
  message: string;
  authorId: string;
}

interface CommentFormProps {
  ticketId: string;
  onSuccess?: () => void | Promise<void>;
}

const defaultValues: CommentFormValues = {
  message: "",
  authorId: "",
};

function CommentForm({ ticketId, onSuccess }: CommentFormProps) {
  const { users, loading: usersLoading } = useTicketUsers();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    defaultValues,
  });

  const onSubmit = async (values: CommentFormValues) => {
    setSubmitError(null);

    const payload: CreateCommentPayload = {
      message: values.message.trim(),
      authorId: values.authorId,
    };

    try {
      await commentApi.create(ticketId, payload);
      reset(defaultValues);
      await onSuccess?.();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to add comment. Please try again.";

      setSubmitError(message);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Comment
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <TextField
            label="Message"
            fullWidth
            multiline
            minRows={3}
            disabled={isSubmitting}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
            {...register("message", {
              required: "Message is required",
              validate: (value) =>
                value.trim().length > 0 || "Message is required",
            })}
          />

          <UserSelectField
            name="authorId"
            label="Author"
            control={control}
            users={users}
            disabled={usersLoading || isSubmitting}
            errorMessage={errors.authorId?.message}
            requiredMessage="Author is required"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || usersLoading}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default CommentForm;
