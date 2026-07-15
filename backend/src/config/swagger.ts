import path from "node:path";
import { fileURLToPath } from "node:url";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { env } from "./env.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Support Ticket Management System API",
    version: "1.0.0",
    description:
      "REST API for managing support tickets, comments, and dashboard statistics.",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: `http://localhost:${env.port}`,
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "Service health and metadata endpoints",
    },
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
    {
      name: "Dashboard",
      description: "Aggregated dashboard statistics",
    },
    {
      name: "Ticket",
      description: "Ticket lifecycle management",
    },
    {
      name: "Comment",
      description: "Ticket comment operations",
    },
    {
      name: "User",
      description:
        "User model referenced by tickets and comments. User records are exposed as nested objects in API responses; there are no standalone user CRUD endpoints.",
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    path.join(currentDir, "../docs/schemas.ts"),
    path.join(currentDir, "../docs/schemas.js"),
    path.join(currentDir, "../docs/paths/*.ts"),
    path.join(currentDir, "../docs/paths/*.js"),
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
  explorer: true,
  customSiteTitle: "Support Ticket API Docs",
};

export { swaggerUi };
