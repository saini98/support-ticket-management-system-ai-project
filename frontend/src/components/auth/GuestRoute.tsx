import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/paths";

function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
