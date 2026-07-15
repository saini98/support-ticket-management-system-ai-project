import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.port);

server.on("listening", () => {
  console.log(`Server running on http://localhost:${env.port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${env.port} is already in use. Stop the other process or change PORT in .env`,
    );
    process.exit(1);
  }

  console.error("Failed to start server:", error);
  process.exit(1);
});
