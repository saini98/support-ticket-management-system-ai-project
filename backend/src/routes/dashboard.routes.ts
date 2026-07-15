import { Router } from "express";

import { Permission } from "../auth/permissions.js";
import { DashboardController } from "../controllers/dashboard.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { DashboardRepository } from "../repositories/dashboard.repository.js";
import { DashboardService } from "../services/dashboard.service.js";

const dashboardRepository = new DashboardRepository();
const dashboardService = new DashboardService(dashboardRepository);
const dashboardController = new DashboardController(dashboardService);

const router = Router();

router.get(
  "/stats",
  authorize(Permission.DASHBOARD_READ),
  dashboardController.getStats,
);

export default router;
