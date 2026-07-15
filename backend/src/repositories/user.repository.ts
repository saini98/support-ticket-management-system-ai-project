import type { User } from "../infrastructure/prisma/generated/client.js";
import { prisma } from "../infrastructure/database/prisma.js";
import type { IUserRepository } from "./user.repository.interface.js";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
