const port = Number(process.env.PORT);

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    throw new Error("JWT_SECRET is required. Add it to your .env file.");
  }

  return secret;
};

export const env = {
  port: Number.isFinite(port) && port > 0 ? port : 3000,
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: getJwtSecret(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN?.trim() || "24h",
} as const;
