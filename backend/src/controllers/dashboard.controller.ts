import type { NextFunction, Request, Response } from "express";

import type { DashboardService } from "../services/dashboard.service.js";

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  getStats = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this.dashboardService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };
}
