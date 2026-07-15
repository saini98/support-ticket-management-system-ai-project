import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";

type DashboardSearchProps = Omit<
  TextFieldProps,
  "placeholder" | "InputProps" | "slotProps"
>;

function DashboardSearch({
  fullWidth = true,
  size = "small",
  ...textFieldProps
}: DashboardSearchProps) {
  return (
    <TextField
      {...textFieldProps}
      placeholder="Search tickets..."
      fullWidth={fullWidth}
      size={size}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default DashboardSearch;
