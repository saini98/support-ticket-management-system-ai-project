import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
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
import { useLocation, useNavigate } from "react-router-dom";

import { getLoginErrorMessage, useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes/paths";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginLocationState {
  from?: {
    pathname?: string;
  };
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);

    try {
      await login({
        email: values.email.trim(),
        password: values.password,
      });

      const redirectPath =
        (location.state as LoginLocationState | null)?.from?.pathname ??
        ROUTES.DASHBOARD;

      navigate(redirectPath, { replace: true });
    } catch (error) {
      setSubmitError(getLoginErrorMessage(error));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" component="h1" fontWeight={700}>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Access the Support Ticket Management System
            </Typography>
          </Box>

          {submitError && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {submitError}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack spacing={2.5}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                label="Email"
                type="email"
                autoComplete="email"
                autoFocus
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : undefined
                }
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;
