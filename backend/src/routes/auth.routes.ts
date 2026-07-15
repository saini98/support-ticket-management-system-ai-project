import { Router } from "express";

import { AuthController } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "../services/auth.service.js";
import { loginSchema } from "../validators/auth.validator.js";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = Router();

router.post("/login", validateBody(loginSchema), authController.login);

export default router;
