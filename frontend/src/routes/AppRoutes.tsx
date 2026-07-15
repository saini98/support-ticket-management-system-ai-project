import { Route, Routes } from "react-router-dom";

import GuestRoute from "../components/auth/GuestRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import CreateTicketPage from "../pages/CreateTicketPage";
import DashboardPage from "../pages/DashboardPage";
import EditTicketPage from "../pages/EditTicketPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import TicketDetailPage from "../pages/TicketDetailPage";
import TicketListPage from "../pages/TicketListPage";
import { ROUTES } from "./paths";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="tickets" element={<TicketListPage />} />
          <Route path="tickets/new" element={<CreateTicketPage />} />
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          <Route path="tickets/:id/edit" element={<EditTicketPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
