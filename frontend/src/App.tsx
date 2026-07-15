import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import appTheme from "./theme/appTheme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <CssBaseline />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
