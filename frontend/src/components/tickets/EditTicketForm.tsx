import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import UserSelectField from "../common/UserSelectField";
import { useTicketUsers } from "../../hooks/useTicketUsers";
import { ticketApi } from "../../services/ticket.service";
import { ApiError } from "../../types/api.types";
import type { Ticket, TicketPriority } from "../../types/ticket.types";
import { TICKET_PRIORITY_OPTIONS } from "../../utils/ticket.utils";
import { mergeUsers } from "../../utils/user.utils";

export interface EditTicketFormValues {
  title: string;
  description: string;
  priority: TicketPriority;
  assigneeId: string;
}

interface EditTicketFormProps {
  ticket: Ticket;
  onSuccess: (ticketId: string) => void;
  onCancel: () => void;
}

function toFormValues(ticket: Ticket): EditTicketFormValues {
  return {
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    assigneeId: ticket.assigneeId ?? "",
  };
}

function EditTicketForm({ ticket, onSuccess, onCancel }: EditTicketFormProps) {
  const { users: loadedUsers, loading: usersLoading } = useTicketUsers();
  const users = useMemo(
    () =>
      mergeUsers(
        loadedUsers,
        [ticket.creator],
        ticket.assignee ? [ticket.assignee] : [],
      ),
    [loadedUsers, ticket],
  );

  const initialValues = useMemo(() => toFormValues(ticket), [ticket]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditTicketFormValues>({
    defaultValues: initialValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: EditTicketFormValues) => {
    setSubmitError(null);

    try {
      const updatedTicket = await ticketApi.update(ticket.id, {
        title: values.title.trim(),
        description: values.description.trim(),
        priority: values.priority,
        assigneeId: values.assigneeId,
      });

      onSuccess(updatedTicket.id);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to update ticket. Please try again.";

      setSubmitError(message);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <Alert severity="info">
            Update ticket details below. Assigned user options show full name,
            email, role, and readable ID (e.g. <strong>user-carol-support</strong>
            ).
          </Alert>

          <TextField
            label="Title"
            fullWidth
            disabled={isSubmitting}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            {...register("title", {
              required: "Title is required",
              validate: (value) =>
                value.trim().length > 0 || "Title is required",
            })}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            disabled={isSubmitting}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            {...register("description", {
              required: "Description is required",
              validate: (value) =>
                value.trim().length > 0 || "Description is required",
            })}
          />

          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.priority)}>
                <InputLabel id="edit-priority-label">Priority</InputLabel>
                <Select
                  {...field}
                  labelId="edit-priority-label"
                  label="Priority"
                  disabled={isSubmitting}
                >
                  {TICKET_PRIORITY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.priority && (
                  <FormHelperText>{errors.priority.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <UserSelectField
            name="assigneeId"
            label="Assigned User"
            control={control}
            users={users}
            disabled={usersLoading || isSubmitting}
            errorMessage={errors.assigneeId?.message}
            requiredMessage="Assigned user is required"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outlined"
              disabled={isSubmitting}
              onClick={() => reset(initialValues)}
            >
              Reset
            </Button>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default EditTicketForm;
