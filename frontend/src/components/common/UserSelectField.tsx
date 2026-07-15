import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import type { UserSummary } from "../../types/ticket.types";
import { formatUserLabel } from "../../utils/user.utils";

interface UserSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  users: UserSummary[];
  disabled?: boolean;
  errorMessage?: string;
  requiredMessage?: string;
}

function UserSelectField<T extends FieldValues>({
  name,
  label,
  control,
  users,
  disabled = false,
  errorMessage,
  requiredMessage,
}: UserSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requiredMessage ?? `${label} is required` }}
      render={({ field }) => (
        <FormControl fullWidth error={Boolean(errorMessage)} disabled={disabled}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}
            renderValue={(selected) => {
              const user = users.find((item) => item.id === selected);
              return user ? formatUserLabel(user) : String(selected);
            }}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <ListItemText
                  primary={formatUserLabel(user)}
                  secondary={`User ID: ${user.id}`}
                />
              </MenuItem>
            ))}
          </Select>
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default UserSelectField;
