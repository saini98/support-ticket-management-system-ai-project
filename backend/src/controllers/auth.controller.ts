import type { NextFunction, Request, Response } from "express";

import type { AuthService } from "../services/auth.service.js";
import type { LoginDto } from "../types/auth.types.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.authService.login(req.body as LoginDto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
