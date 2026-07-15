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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import UserSelectField from "../common/UserSelectField";
import { useTicketUsers } from "../../hooks/useTicketUsers";
import { ticketApi } from "../../services/ticket.service";
import { ApiError } from "../../types/api.types";
import type { CreateTicketPayload, TicketPriority } from "../../types/ticket.types";
import { TICKET_PRIORITY_OPTIONS } from "../../utils/ticket.utils";

export interface CreateTicketFormValues {
  title: string;
  description: string;
  priority: TicketPriority;
  creatorId: string;
  assigneeId: string;
}

interface CreateTicketFormProps {
  onSuccess: (ticketId: string) => void;
}

const defaultValues: CreateTicketFormValues = {
  title: "",
  description: "",
  priority: "MEDIUM",
  creatorId: "",
  assigneeId: "",
};

function CreateTicketForm({ onSuccess }: CreateTicketFormProps) {
  const { users, loading: usersLoading } = useTicketUsers();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormValues>({
    defaultValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: CreateTicketFormValues) => {
    setSubmitError(null);

    const payload: CreateTicketPayload = {
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      creatorId: values.creatorId,
      assigneeId: values.assigneeId,
    };

    try {
      const ticket = await ticketApi.create(payload);
      reset(defaultValues);
      onSuccess(ticket.id);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to create ticket. Please try again.";

      setSubmitError(message);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <Alert severity="info">
            Select users by full name, email, and role. Each option also shows a
            readable user ID such as <strong>user-carol-support</strong>.
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
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  {...field}
                  labelId="priority-label"
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
            name="creatorId"
            label="Creator"
            control={control}
            users={users}
            disabled={usersLoading || isSubmitting}
            errorMessage={errors.creatorId?.message}
            requiredMessage="Creator is required"
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
              onClick={() => reset(defaultValues)}
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
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default CreateTicketForm;
