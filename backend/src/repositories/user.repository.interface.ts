import type { User } from "../infrastructure/prisma/generated/client.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
}
