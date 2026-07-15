import cors from "cors";
import express from "express";

import { swaggerSpec, swaggerUi, swaggerUiOptions } from "./config/swagger.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Support Ticket Management System API",
    health: "/health",
    auth: "/auth/login",
    tickets: "/tickets",
    dashboard: "/api/dashboard/stats",
    docs: "/api-docs",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.get("/api-docs.json", (_req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use("/auth", authRoutes);

app.use("/tickets", authenticate, ticketRoutes);
app.use("/api/dashboard", authenticate, dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

