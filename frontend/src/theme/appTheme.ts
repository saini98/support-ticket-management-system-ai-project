import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6366F1",
      light: "#A5B4FC",
      dark: "#4F46E5",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#10B981",
      light: "#6EE7B7",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#FCA5A5",
      dark: "#DC2626",
    },
    info: {
      main: "#0EA5E9",
      light: "#7DD3FC",
      dark: "#0284C7",
    },
    background: {
      default: "#F1F5F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.35,
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.5,
    },
    caption: {
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02em",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        startIcon: {
          marginRight: 8,
          marginLeft: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default appTheme;
